import express from "express";
import protect from "../middleware/auth.middleware.js";
import adminOnly from "../middleware/admin.middleware.js";

import {
    getAllUsers,
    deleteUser,
    getAllJobsAdmin,
    deleteJobAdmin,
    getDashboardStats
} from "../controllers/admin.controller.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

router.get("/jobs", getAllJobsAdmin);
router.delete("/jobs/:id", deleteJobAdmin);

router.get("/stats", getDashboardStats);

export default router;