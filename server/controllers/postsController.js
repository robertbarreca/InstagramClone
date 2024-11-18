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
        const posts = await Post.find()
            .populate("creator", "_id name")
            .populate("comments.author", "_id name");
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
        posts = await Post.find({ creator: req.user._id })
            .populate("creator", "_id name")
            .populate("comments.author", "_id name");
        res.status(200).json({posts})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const likePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const result = await Post.findByIdAndUpdate(
            postId,
            { [`likes.${userId}`]: true }, 
            { new: true }
        );
        res.status(200).json({likes: result.likes});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const unlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        const result = await Post.findByIdAndUpdate(
            postId,
            { $unset: { [`likes.${userId}`]: "" } }, 
            { new: true }
        );
        res.status(200).json({likes: result.likes});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const comment = async (req, res) => {
    try {
        postId = req.params.id
        const postComment = {
            text: req.body.text,
            author: req.user._id
        }
        const result = await Post.findByIdAndUpdate( 
            postId,
            { $push: { comments: postComment } },
            { new: true }
        )
        .populate("comments.author", "_id name")
        res.status(200).json({ comments: result.comments })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        // Find the post by ID
        const post = await Post.findById(postId);

        // Check if the post exists
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if the requesting user is the creator of the post
        if (post.creator.toString() === userId.toString()) {
            // Delete the post
            await Post.findByIdAndDelete(postId);
            return res.status(200).json({ deletedPost: post });
        } else {
            return res.status(403).json({ error: "You must be the creator of this post to delete it" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {createPost, getAllPosts, getMyPosts, likePost, unlikePost, comment, deletePost}