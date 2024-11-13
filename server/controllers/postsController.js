const Post = require("../models/PostModel");

const createPost = async (req, res) => {
    const { title, body } = req.body
    if (!title || !body) {
        return res.status(400).json({error: "Posts must include title and body"})
    }

    const post = new Post({
        title,
        body,
        creator: req.user
    })

    try {
        const result = await post.save();
        res.status(200).json({ post: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create post" });
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("creator", "_id name")

        if (posts) {
            res.status(200).json({posts})
        }    
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

const getMyPosts = async (req, res) => {
    try {
        posts = await Post.find({ creator: req.user._id }).populate("creator", "_id name")
        res.status(200).json({posts})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
module.exports = {createPost, getAllPosts, getMyPosts}