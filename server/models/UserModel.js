/**
 * @fileoverview Schema for a user document
 * 
 * @description This files defines and exports the schema for a user document. 
 * 
 * @dependencies mongoose
 */
const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema.Types

// The schema for a user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followers: {
        type: Map,
        of: Boolean,
        default: {}
    },
    following: {
        type: Map,
        of: Boolean,
        default: {}
    }
})

module.exports = mongoose.model("User", userSchema)