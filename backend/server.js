import express from "express";
import "dotenv/config"
import cors from 'cors'
import "dotenv/config";
import cookieParser from "cookie-parser"

import connectToDB from "./utils/db.js"
import userRouter from "./routes/user.router.js"
import jobRouter from "./routes/job.routes.js"
import companyRouter from "./routes/company.routes.js"
import applicationRouter from "./routes/application.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"
import adminRouter from "./routes/admin.routes.js"

let port = process.env.PORT

const app = express()
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))

app.get("/", (req, res) => {
    res.send("Welcome to the job portal!!");
})

app.use("/admin", adminRouter)
app.use("/users", userRouter)
app.use("/jobs", jobRouter)
app.use("/companies", companyRouter)
app.use("/applications", applicationRouter)
app.use("/dashboard", dashboardRouter)

app.listen(port, () => {
    console.log(`Server started at ${port}`)
    connectToDB()
});