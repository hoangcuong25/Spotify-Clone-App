import express from "express"
import cors from "cors"
import "dotenv/config"
import songRouter from "./src/routes/songRoute.js"
import connectDB from "./src/config/mongodb.js"
import connectCloudinary from "./src/config/cloudinary.js"
import upload from "./src/middleware/multer.js"

// app congfig
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// initializing routes
app.use("/api/song", upload.fields([{ name: "image", maxCount: 1 }, { name: "audio", maxCount: 1 }]), songRouter)

app.get("/", (req, res) => res.send("Api Working"))

app.listen(port, () => console.log("Server Start hihi"))
