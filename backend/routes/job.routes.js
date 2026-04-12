import express from "express"

import {addJob} from "../controllers/job.controller.js"

const router = express.Router()

router.post("/", addJob)

export default router