/**
 * @fileoverview Posts Routes
 *
 * @description This module defines the routes for post-related operations. 
 * It requires authentication for all routes and handles the following operations:
 * - Creating posts 
 * - getting all posts
 * - Getting logged in user's posts
 *
 * @dependencies express, ../controllers/postsController, ../middleware/requireToken
 */

const express = require("express")
const router = express.Router()
const requireToken = require("../middleware/requireToken")
const {getUser, followUser, unfollowUser, updatePic} = require("../controllers/userController")

router.get('/:id', requireToken, getUser)

router.put("/follow/:id", requireToken, followUser)

router.put("/unfollow/:id", requireToken, unfollowUser)

router.put("/updatepic", requireToken, updatePic )


module.exports = router