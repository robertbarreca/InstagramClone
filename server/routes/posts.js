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
const { createPost, getAllPosts, getMyPosts, likePost, unlikePost, comment, deletePost } = require("../controllers/postsController")
const requireToken = require("../middleware/requireToken")

// create post route
router.post("/createpost", requireToken, createPost)

// get all posts route
router.get("/allposts", requireToken, getAllPosts)

// get logged in user's posts route
router.get("/myposts", requireToken, getMyPosts)

// like a post
router.put("/like/:id", requireToken, likePost)

// unlike a post
router.put("/unlike/:id", requireToken, unlikePost)

// add a commend to a post
router.put("/comment/:id", requireToken, comment)

// delete a post
router.delete("/delete/:id", requireToken, deletePost)

module.exports = router