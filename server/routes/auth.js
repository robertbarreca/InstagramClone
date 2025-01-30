/**
 * @fileoverview Authentication Routes
 *
 * @description This module defines the routes for authentication-related operations. 
 * It handles the following operations:
 * - Logging in 
 * - Signing up
 *
 * @dependencies express, ../controllers/authController
 */


const express = require("express")
const { signupUser, loginUser, resetPassword, newPassword } = require("../controllers/authController")
const router = express.Router()

// signup route
router.post("/signup", signupUser)

// login route
router.post("/login", loginUser)

// route to email user link to reset password
router.post("/resetpassword", resetPassword)


// route to put new password in db
router.post("/newpassword", newPassword)

module.exports = router