const express = require("express")
const router = express.Router()
const { createPost, getAllPosts } = require("../controllers/postsController")
const requireToken = require("../middleware/requireToken")

router.post("/createpost", requireToken, createPost)
router.get("/", requireToken, getAllPosts)

module.exports = router