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
    creator: {
        type: ObjectId,
        ref: "User",

    }
})

module.exports = mongoose.model("Post", postSchema)