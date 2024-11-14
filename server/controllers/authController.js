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
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields must be filled" });
    }

    // Validate email and password
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Email is not valid" });
    }

    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ error: "Password not strong enough" });
    }

    try {
        // Check if the user already exists
        const savedUser = await User.findOne({ email });
        if (savedUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            email,
            password: hashedPassword,
            name,
        });

        // Save the user to the database
        const newUser = await user.save();

        // Send a response with the user data
        res.status(200).json({ _id: newUser._id, email: newUser.email, name: newUser.name });
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
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
        return res.status(400).json({ error: "All fields required" });
    }

    try {
        // Check if the user exists
        const savedUser = await User.findOne({ email });
        if (!savedUser) {
            return res.status(400).json({ error: "User does not exist" });
        }

        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, savedUser.password);
        if (match) {
            // Generate JWT token
            const token = jwt.sign({ _id: savedUser._id }, process.env.SECRET);
            return res.status(200).json({ name: savedUser.name, email, token });
        } else {
            return res.status(400).json({ error: "Invalid password" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {signupUser, loginUser}