import Company from "../models/company.model.js"

async function addCompany(req, res) {
    try {

        const { name, location, description, website, logo } = req.body;

        if (!name || !location) {
            return res.status(400).json({
                message: "Company name and location are required"
            });
        }

        const existingCompany = await Company.findOne({ name });

        if (existingCompany) {
            return res.status(400).json({
                message: "Company already exists"
            });
        }

        const company = await Company.create({
            name,
            location,
            description,
            website,
            logo,
            createdBy: req.user._id
        });

        res.status(201).json(company);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to create company",
            error: error.message
        });

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

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );

        if (!company) {

            return res.status(404).json({
                message: "Company not found"
            });

        }

        res.json(company);

    } catch (error) {

        res.status(500).json({
            message: "Update failed"
        });

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