import express from "express"
import { addUser,getUserById,deleteUser,updateUser, allUsers, loginUser, logoutUser, getCurrentUser } from "../controllers/user.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();


router.post("/login", loginUser)
router.post("/logout",protect, logoutUser)
router.get("/me",protect, getCurrentUser)
router.get("/", allUsers)
router.post("/", addUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", protect, updateUser)

export default router;