/**
 * @fileoverview Posts Controllers
 *
 * @description This module defines the logic behind the following post related operations. 
 * - Creating a new post
 * - Get all posts
 * - Get all posts of a signed in individual
 *
 * @dependencies ../models/PostModel 
 */

const Post = require("../models/PostModel");

/**
 * @function createPost 
 * @description Creates a post and adds it to the database
 * 
 * @param {Object} req - The request object containing the post information
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns Sends a JSON response containing the created post and the creator upon successful creation, or an error message upon failure.
 */
const createPost = async (req, res) => {
    const { title, body, image } = req.body
    // check parameters are filled
    if (!title || !body || !image) {
        return res.status(400).json({error: "Posts must include title body, and image"})
    }

    const post = new Post({
        title,
        body,
        photo: image,
        creator: req.user
    })

    // add created post to database
    try {
        const result = await post.save();
        res.status(200).json({ post: result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * @function getAllPosts 
 * @description Gets all posts from the database
 * 
 * @param {Object} req - The request object 
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns Sends a JSON response containing a list of all posts and the creator's of them upon successful request, or an error message upon failure.
 */
const getAllPosts = async (req, res) => {
    try {
        // get all posts
        const posts = await Post.find().populate("creator", "_id name")
        // posts exists
        if (posts) {
            res.status(200).json({posts})
        }    
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

/**
 * @function getAllPosts 
 * @description Gets all posts from logged in user
 * 
 * @param {Object} req - The request object 
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns Sends a JSON response containing a list of all posts and the creator's of them upon successful request, or an error message upon failure.
 */
const getMyPosts = async (req, res) => {
    try {
        // get all posts
        posts = await Post.find({ creator: req.user._id }).populate("creator", "_id name")
        res.status(200).json({posts})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
module.exports = {createPost, getAllPosts, getMyPosts}