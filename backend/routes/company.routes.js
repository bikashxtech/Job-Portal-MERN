import express from "express"
import { addCompany, allCompanies, getCompanyById, updateCompany, deleteCompany } from "../controllers/company.controller.js"


const router = express.Router()

router.get("/", allCompanies)
router.get("/:id", getCompanyById)
router.post("/", addCompany)
router.put("/:id", updateCompany)
router.delete("/:id", deleteCompany)

export default router