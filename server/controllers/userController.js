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
        const posts = await Post.find({ postedBy: req.params.id })
            .populate('postedBy', '_id name')
            .exec();

        // Respond with user and their posts
        res.json({ user, posts });
    } catch (err) {
        // Handle errors
        res.status(422).json({ error: err });
    }
    
}

module.exports = {getUser}