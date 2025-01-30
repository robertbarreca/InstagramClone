const mongoose = require("mongoose")
const User = require("../models/UserModel")
const Post = mongoose.model("Post")

/**
 * @function getUser 
 * @description gets all the information about a user
 *
 * @param {Object} req - The request object 
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns Sends a JSON response containing the user's information, or an error message upon failure.
 */
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

/**
 * @function followUser 
 * @description Adds a follower to the requested user's followers and adds that user to their following
 *
 * @param {Object} req - The request object 
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns Sends a JSON response containing both user's information, or an error message upon failure.
 */
const followUser = async (req, res) => {
    try {
        const userId = req.user._id;
        // check if attempting follow themselves
        if (userId.toString() === req.params.id.toString()) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        } 
        // add yourself to other's following list
        const influencer = await User.findByIdAndUpdate(
            req.params.id,
            { [`followers.${userId}`]: true },
            { new: true }
        ).select("-password")

        // add influencer to your following list
        const wannabe = await User.findByIdAndUpdate(
            userId,
            { [`following.${req.params.id}`]: true },
            { new: true }
        ).select("-password")
        res.status(200).json({influencer, wannabe})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

/**
 * @function unfollowUser 
 * @description Removes a follower from the requested user's followers and removes that user from their following
 *
 * @param {Object} req - The request object 
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns Sends a JSON response containing both user's information, or an error message upon failure.
 */
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
        ).select("-password")

        // add influencer to your following list
        const wannabe = await User.findByIdAndUpdate(
            userId,
            { $unset: {[`following.${req.params.id}`]: ""} },
            { new: true }
        ).select("-password")
        res.status(200).json({influencer, wannabe})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


/**
 * @function updatePic 
 * @description Changes a user's profile pic in the database
 *
 * @param {Object} req - The request object 
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns Sends a JSON response containing the updated user's information, or an error message upon failure.
 */
const updatePic = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { pic: req.body.pic } },
            { new: true }
        )
        res.status(200).json({ user:  updatedUser})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

/**
 * @function searchUsers 
 * @description Gets all users in db that have usernames that start with search term
 *
 * @param {Object} req - The request object 
 * @param {Object} res - The response object used to send back the desired HTTP response
 * 
 * @returns Sends a JSON response containing an array of all users that match the search, or an error message upon failure.
 */
const searchUsers = async (req, res) => {
    try {
        let userPattern = new RegExp("^" + req.body.query)
        const user = await User.find({ name: { $regex: userPattern } })
        .select("_id name")
        res.json({user})    
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}


module.exports = {getUser, followUser, unfollowUser, updatePic, searchUsers}