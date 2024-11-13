const express = require("express")
const router = express.Router()
const { createPost, getAllPosts, getMyPosts } = require("../controllers/postsController")
const requireToken = require("../middleware/requireToken")

router.post("/createpost", requireToken, createPost)
router.get("/allposts", requireToken, getAllPosts)
router.get("/myposts", requireToken, getMyPosts)

module.exports = router