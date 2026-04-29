import express from "express"
import { addCompany, allCompanies, getCompanyById, updateCompany, deleteCompany } from "../controllers/company.controller.js"
import protect from "../middleware/auth.middleware.js"
import adminOnly from "../middleware/admin.middleware.js"


const router = express.Router()

router.get("/", allCompanies)
router.get("/:id", getCompanyById)
router.post("/", protect , adminOnly, addCompany)
router.put("/:id",protect, adminOnly, updateCompany)
router.delete("/:id",protect, adminOnly,  deleteCompany)

export default router