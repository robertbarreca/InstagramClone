/**
 * @fileoverview Schema for a post document
 * 
 * @description This files defines and exports the schema for a post document. 
 * 
 * @dependencies mongoose
 */


const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

// schema for post 
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes: {
        type: Map,
        of: Boolean,
        default: {}
    },
    comments: [{
        text: String,
        author: {type: ObjectId, ref: "User"}
    }],
    creator: {
        type: ObjectId,
        ref: "User",

    }
}, {timestamps: true})

module.exports = mongoose.model("Post", postSchema)