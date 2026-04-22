import express from "express"

import {addJob, allJobs, deleteJob, getJobById, updateJob} from "../controllers/job.controller.js"

const router = express.Router()

router.post("/", addJob)
router.get("/", allJobs)
router.get("/:id", getJobById)
router.delete("/:id", deleteJob)
router.put("/:id", updateJob)

export default router