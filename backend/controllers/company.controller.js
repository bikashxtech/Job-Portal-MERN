import Company from "../models/company.model.js"

async function addCompany(req, res) {
    try {
        let company = req.body
        company = await Company.create(company)
        res.status(201).json(company)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

async function allCompanies(req, res) {
    try {
        let companyData = await Company.find({})
        if(companyData) {
            res.status(200).json(companyData)
        } else {
            res.status(404).send({"messsage": "No Companies Found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

async function getCompanyById(req, res) {
   try {
        let company = req.params.id
        company = await Company.findById(company)
        if (!company) {
            return res.status(400).send("Company not found")
        }
   
        res.status(200).json(company)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

async function updateCompany(req, res) {
    try {
        const id = req.params.id
        let body = req.body
        let company = await Company.findByIdAndUpdate(id, body)
        if (!company) {
            res.status(400).send({"message" : "Update error"})
        }
    
        res.json(company)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

async function deleteCompany(req, res) {
    try {
        const id = req.params.id
        await Company.findOneAndDelete({_id : id})
        res.status(201).send({"message" : "Company deleted succesfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

export {addCompany, allCompanies, getCompanyById, updateCompany, deleteCompany}