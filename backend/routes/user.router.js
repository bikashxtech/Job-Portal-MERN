import express from "express"
import { addUser,getUserById,deleteUser,updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", addUser);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser)

export default router;