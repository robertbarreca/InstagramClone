require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const User = require("./models/UserModel")
const authRoutes = require("./routes/auth")



const app = express()
// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use("/api/auth", authRoutes)


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB:", error));

app.listen(process.env.PORT, () => {
    console.log("server is running on port", process.env.PORT)
})
