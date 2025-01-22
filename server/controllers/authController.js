/**
 * @fileoverview Authenitcation Controllers
 *
 * @description This module defines the logic behind the following authentication related operations. 
 * - Logging in an existing user
 * - Signing up a new user
 *
 * @dependencies ../models/userModel, jsonwebtoken, validator, bcryptjs
 */

const User = require("../models/UserModel")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const sendGridTransport = require("nodemailer-sendgrid-transport")
const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: process.env.EMAIL_KEY 
    }
}))


/**
 * @function signupUser
 * @description Handles user signup by adding a new user model to the database.
 * 
 * @param {Object} req - The request object containing the user credentials
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns {void} Sends a JSON response containing the created user's id, email, and name upon successful signup, or an error message upon failure.
 */
const signupUser = async (req, res) => {
    let { name, email, password, pic } = req.body;

    email = email.toLowerCase()
    name = name.toLowerCase()

    // Validate input fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields must be filled" });
    }



    // Validate email and password and name
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Email is not valid" });
    }

    if (name.length < 3 || name.length > 25) {
        return res.status(400).json({error: "Username must be between 3 and 25 characters"})
    }

    // Ensure name only contains valid characters (letters, numbers, underscores)
    if (!/^[a-z0-9_]+$/.test(name)) {
        return res.status(400).json({ error: "Name can only letters, numbers, and underscores" });
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: "Password not strong enough" });
    }

    try {
        // Check if the email already in use
        const savedUser = await User.findOne({ email });
        if (savedUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // check if name exists
        const nameExists = await User.findOne({ name })
        if (nameExists) {
            return res.status(400).json({error: "Username already in use"})
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            email,
            password: hashedPassword,
            name,
            pic
        });

        // Save the user to the database
        const newUser = await user.save();
        await transporter.sendMail({
            to: user.email,
            from: "robbarreka@gmail.com",
            subject: "Succesful Account Creation",
            headers: {
                "From": "Instaclone Support <no-reply@instaclone.com>"
            },
            html: "<h1>Welcome to Instaclone<h1>"
        })
        // Send a response with the user data
        res.status(200).json({ user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


/**
 * @function loginUser
 * @description Handles user login by validating credentials and returning a JWT token.
 * 
 * @param {Object} req - The request object containing the user credentials
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns {void} Sends a JSON response containing the user's email, id, name and JWT token upon successful login, or an error message upon failure.
 */
const loginUser = async (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase()

    // Validate input fields
    if (!email || !password) {
        return res.status(400).json({ error: "All fields required" });
    }

    try {
        // Check if the user exists
        const savedUser = await User.findOne({ email })
        if (!savedUser) {
            return res.status(400).json({ error: "User does not exist" });
        }

        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, savedUser.password);
        if (match) {
            // Generate JWT token
            const token = jwt.sign({ _id: savedUser._id }, process.env.SECRET);
            const { _id, name, email, followers, following, pic } = savedUser.toObject(); // Convert to plain object
            return res.status(200).json({
                user: {
                    _id,
                    name,
                    email,
                    pic,
                    followers: Array.from(followers.keys()),
                    following: Array.from(following.keys()),
                    token,
                }
            })
        } else {
            return res.status(400).json({ error: "Invalid password" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        // Generate a random token
        const buffer = await crypto.randomBytes(32);
        const token = buffer.toString("hex");

        // Check if the user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ error: "User does not exist with the specified email" });
        }

        // Set the reset token and expiration time
        user.resetToken = token;
        user.expireToken = Date.now() + 3600000; // 1 hour from now
        await user.save();

        // Send reset password email
        await transporter.sendMail({
            to: user.email,
            from: "robbarreka@gmail.com", // Replace with verified sender
            subject: "Reset Password",
            headers: {
                "From": "Instaclone Support <no-reply@instaclone.com>"
            },
            html: `
                <p>You requested to reset your password for Instaclone.</p>
                <h5>Please click this <a href="http://localhost:3000/resetpassword/${token}">link</a> to reset your password.</h5>
            `,
        });

        res.status(200).json({ message: "Reset email sent successfully" });
    } catch (error) {
        console.error("Error during password reset: ", error);
        res.status(500).json({ error: "An error occurred while processing your request" });
    }
};

const newPassword = async (req, res) => {
    try {
        const newPassword = req.body.password
        const token = req.body.token
        // check password is strong
        if (!validator.isStrongPassword(newPassword)) {
            return res.status(400).json({ error: "Password not strong enough" });
        }
        user = await User.findOne({ resetToken: token, expireToken: { $gt: Date.now() } })
        console.log(user)
        // session has expired
        if (!user) {
            return res.status(400).json({error: "Please try again session has expired"})
        }
        // hash password
        hashedPassword = await bcrypt.hash(newPassword, 12)
        user.password = hashedPassword
        user.resetToken = undefined
        user.expireToken = undefined
        await user.save()
        res.status(200).json({msg: "Successfully updated password!"})
    } catch (error) {
        console.error("Error during password reset: ", error);
        res.status(500).json({ error: error.message });
    }
}



module.exports = {signupUser, loginUser, resetPassword, newPassword}