const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

const requireToken = async (req, res, next) => {
    const { authorization } = req.headers
    
    if (!authorization) {
        return res.status(401).json({error: "Authorization header required"})
    }

    token = authorization.split(" ")[1]
    try {
        const _id = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id }).select("_id name email")
        req.user = user
        next()
    } catch (error) {
        res.status(401).json({error: "Request is not authorized"})
    }
}

module.exports = requireToken