const mongoose = require("mongoose")
const User = require("../models/UserModel")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const signupUser = (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({error: "All fields must be filled"})
    }
    if (!validator.isEmail(email)) { 
        return res.status(400).json({error: "Email is not valid"})
    }
    if (!validator.isStrongPassword(password)) {
        res.status(400).json({ error: "Password not strong enough" })
    }

    User.findOne({ email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(200).json({error: "Email already in use"})
            }
            bcrypt.hash(password, 10)
                .then(hashedPassword => {
                    const user = new User({
                        email, password: hashedPassword, name
                    })
                    user.save()
                        .then(user => {
                            res.json({ _id: user._id, email, name })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
            
        })
        .catch(error => {
            console.log(error)
        })
    
}

const loginUser = (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({error: "All fields required"})
    }

    User.findOne({ email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(400).json({error: "User does not exist"})
            }
            bcrypt.compare(password, savedUser.password)
                .then(match => {
                    if (match) {
                    res.status(200).json({_id: savedUser._id, email: savedUser.email, name: savedUser.name})
                    }
                    else {
                        res.status(400).json({error: "Invalid password"})
                    }
                })
                .catch(error => {
                    console.log(error)
                })
    })
}

module.exports = {signupUser, loginUser}