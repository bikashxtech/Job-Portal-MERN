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

// async function displayJob(req, res) {
//     try {
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error.message)
//     }
// }

export {addJob}