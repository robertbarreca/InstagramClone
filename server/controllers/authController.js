const mongoose = require("mongoose")
const User = require("../models/UserModel")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


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
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = {signupUser, loginUser}