const mongoose = require("mongoose")
const User = require("../models/UserModel")
const Post = mongoose.model("Post")

const getUser = async (req, res) => {
    try {
        // Find the user by ID 
        const user = await User.findOne({ _id: req.params.id }).select('-password');
        // check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find posts associated with the user 
        const posts = await Post.find({ creator: req.params.id })
            .populate('creator', '_id name')
            .exec();

        // Respond with user and their posts
        res.status(200).json({ user, posts });
    } catch (err) {
        // Handle errors
        res.status(422).json({ error: err });
    }
    
}

const followUser = async (req, res) => {
    try {
        const userId = req.user._id;
        // check if attempting follow themselves
        if (userId === req.params.id) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }
        // add yourself to other's following list
        const influencer = await User.findByIdAndUpdate(
            req.params.id,
            { [`followers.${userId}`]: true },
            { new: true }
        )

        // add influencer to your following list
        const follower = await User.findByIdAndUpdate(
            userId,
            { [`following.${req.params.id}`]: true },
            { new: true }
        )
        res.status(200).json({following: follower.following})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const unfollowUser = async (req, res) => {
    try {
        const userId = req.user._id;
        // check if attempting follow themselves
        if (userId === req.params.id) {
            return res.status(400).json({ error: "You cannot unfollow yourself" });
        }
        // add yourself to other's following list
        const influencer = await User.findByIdAndUpdate(
            req.params.id,
            { $unset: {[`followers.${userId}`]: ""} },
            { new: true }
        )

        // add influencer to your following list
        const follower = await User.findByIdAndUpdate(
            userId,
            { $unset: {[`following.${req.params.id}`]: ""} },
            { new: true }
        )
        res.status(200).json({following: follower.following})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {getUser, followUser, unfollowUser}