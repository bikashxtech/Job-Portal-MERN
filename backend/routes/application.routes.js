import express from "express"
import {applyToJob, getApplicationById, getApplicationsForRecruiter, getApplicationsForSingleJob, getMyApplications, updateApplicationStatus} from "../controllers/application.controller.js"
import protect from "../middleware/auth.middleware.js";
import candidateOnly from "../middleware/candidate.middleware.js";

let router = express.Router()

router.get("/my-applications", protect, candidateOnly, getMyApplications)

router.get(
    "/my-job-applications",
    protect,
    getApplicationsForRecruiter
);

router.get(
    "/job/:jobId",
    protect,
    getApplicationsForSingleJob
);

router.get("/:id", protect, getApplicationById)

router.post("/:jobId", protect, candidateOnly, applyToJob)

router.put("/:id/status", protect, updateApplicationStatus);

export default router;