import express from "express";
import "dotenv/config"
import cors from 'cors'
import "dotenv/config";

import connectToDB from "./utils/db.js"
import userRouter from "./routes/user.router.js"
import jobRouter from "./routes/job.routes.js"

let port = process.env.PORT

const app = express()
app.use(express.json());

app.use(cors({
    origin : "http://localhost:5173"
}))

app.get("/", (req, res) => {
    res.send("Welcome to the job portal!!");
})

app.use("/user", userRouter)
app.use("/jobs", jobRouter)

app.listen(port, () => {
    console.log("Server started at 5000")
    connectToDB()
});