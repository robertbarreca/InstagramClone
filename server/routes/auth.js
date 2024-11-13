const express = require("express")
const { signupUser, loginUser } = require("../controllers/authController")
const requireToken = require("../middleware/requireToken")
const router = express.Router()


router.post("/signup", signupUser)

router.post("/login", loginUser)

module.exports = router