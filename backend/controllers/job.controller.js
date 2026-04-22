import Job from "../models/job.model.js"

async function addJob(req, res) {   
    try {
        let newJob = req.body
        newJob = await Job.create(newJob)
        res.status(201).send(newJob)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

async function allJobs(req, res) {
    try {
        let jobData = await Job.find({})
        res.status(201).send(jobData)
        
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

async function getJobById(req, res) {
    try {
        let job = req.params.id
        job = await Job.findById(job)
        if (!job) {
            return res.status(400).send("Job not found")
        }

        res.status(200).json(job)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

async function deleteJob(req, res) {
    try {
        const id = req.params.id
        await Job.findOneAndDelete({_id : id})
        res.status(201).send({"message" : "Job deleted succesfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

async function updateJob(req, res) {
    try {
        const id = req.params.id
        let body = req.body
        let job = await Job.findByIdAndUpdate(id, body)
        if (!job) {
            res.status(400).send({"message" : "Update error"})
        }

        res.send(job)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

// async function displayJob(req, res) {
//     try {
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error.message)
//     }
// }

export {addJob, allJobs, getJobById, updateJob, deleteJob}