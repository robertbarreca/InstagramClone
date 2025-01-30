/**
 * @fileoverview Posts Routes
 *
 * @description This module defines the routes for post-related operations. 
 * It requires authentication for all routes and handles the following operations:
 * - Creating posts 
 * - getting all posts
 * - Getting logged in user's posts
 *
 * @dependencies express, ../controllers/userController, ../middleware/requireToken
 */

const express = require("express")
const router = express.Router()
const requireToken = require("../middleware/requireToken")
const {getUser, followUser, unfollowUser, updatePic, searchUsers} = require("../controllers/userController")

// get user information based on id
router.get('/:id', requireToken, getUser)

// follow a user
router.put("/follow/:id", requireToken, followUser)

// unfollow a user
router.put("/unfollow/:id", requireToken, unfollowUser)

// update a profile pic
router.put("/updatepic", requireToken, updatePic )

// search for users
router.post("/searchusers", requireToken, searchUsers)

module.exports = router