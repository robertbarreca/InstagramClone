require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/posts")
const userRoutes = require("./routes/users")
const cors = require('cors');

const app = express()
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Error connecting to MongoDB:", error)); 

app.listen(process.env.PORT, () => {
    console.log("server is running on port", process.env.PORT)
})

// middleware
app.use(express.json())
app.use((req, res, next) => {  
    console.log(req.path, req.method)
    next()
})

app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)