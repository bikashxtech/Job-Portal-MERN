import express from "express"

import {addJob, allJobs, deleteJob, getJobById, getMyJobs, getRecommendedJobs, updateJob} from "../controllers/job.controller.js"
import protect from "../middleware/auth.middleware.js"
import recruiterOnly from "../middleware/recruiter.middleware.js"
import candidateOnly from "../middleware/candidate.middleware.js"

const router = express.Router()

router.get("/recommended", protect, candidateOnly, getRecommendedJobs)
router.post("/",protect, recruiterOnly, addJob)
router.get("/", allJobs)
router.get("/my-jobs", protect, recruiterOnly, getMyJobs)
router.get("/:id", getJobById)
router.delete("/:id",protect, recruiterOnly, deleteJob)
router.put("/:id", protect, recruiterOnly, updateJob)

export default router