import express from "express";
import protect from "../middleware/auth.middleware.js";
import { getCandidateStats, getRecruiterStats } from "../controllers/dashboard.controller.js";
import recruiterOnly from "../middleware/recruiter.middleware.js";
import candidateOnly from "../middleware/candidate.middleware.js";

const router = express.Router();

router.get("/recruiter-stats", protect, recruiterOnly,  getRecruiterStats);
router.get("/candidate-stats", protect, candidateOnly, getCandidateStats)

export default router;