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
const { createPost, getAllPosts, getMyPosts, likePost, unlikePost, comment } = require("../controllers/postsController")
const requireToken = require("../middleware/requireToken")

// create post route
router.post("/createpost", requireToken, createPost)

// get all posts route
router.get("/allposts", requireToken, getAllPosts)

// get logged in user's posts route
router.get("/myposts", requireToken, getMyPosts)


router.put("/like/:id", requireToken, likePost)

router.put("/unlike/:id", requireToken, unlikePost)

router.put("/comment/:id", requireToken, comment)

module.exports = router