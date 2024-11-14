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
const { signupUser, loginUser } = require("../controllers/authController")
const router = express.Router()

// signup route
router.post("/signup", signupUser)

// login route
router.post("/login", loginUser)

module.exports = router