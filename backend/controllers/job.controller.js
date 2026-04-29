import Job from "../models/job.model.js"
import Application from "../models/application.model.js"

async function addJob(req, res) {   
    try {
        const newJob = await Job.create({
            ...req.body,
            createdBy: req.user._id,
            company: req.user.company
        })

        if (!req.user.company) {
            return res.status(400).json({
                message: "You must belong to a company to post jobs."
            })
        }
        res.status(201).send(newJob)
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

async function allJobs(req, res) {

    try {

        const {
            keyword,
            location,
            skills,
            experience,
            minSalary,
            maxSalary
        } = req.query;

        const filter = {};

        if (keyword && keyword.trim() !== "") {

            filter.$or = [
                {
                    title: {
                        $regex: keyword,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: keyword,
                        $options: "i"
                    }
                }
            ];

        }

        if (location && location.trim() !== "") {

            filter.location = {
                $regex: location,
                $options: "i"
            };

        }

        if (skills && skills.trim() !== "") {

            const skillsArray = skills
                .split(",")
                .map(skill => skill.trim());

            filter.skillsRequired = {
                $in: skillsArray
            };

        }

        if (experience) {

            filter.experienceRequired = {
                $lte: Number(experience)
            };

        }

        if (minSalary || maxSalary) {

            filter.salary = {};

            if (minSalary)
                filter.salary.$gte = Number(minSalary);

            if (maxSalary)
                filter.salary.$lte = Number(maxSalary);

        }

        filter.status = "open";


        const jobs = await Job.find(filter)
            .populate("company", "name logo location website")
            .sort({ createdAt: -1 });

        res.json(jobs);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch jobs",
            error: error.message
        });

    }

}

async function getJobById(req, res) {
    try {

        const job = await Job.findById(req.params.id)
            .populate("company", "name location website logo")
            .populate("createdBy", "name email");

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json(job);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch job details",
            error: error.message
        });

    }
}

async function deleteJob(req, res) {

    try {

        const job = await Job.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            });

        }

        res.json({
            message: "Job deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Delete failed"
        });

    }
}

async function updateJob(req, res) {

    try {

        const job = await Job.findOneAndUpdate(
            {
                _id: req.params.id,
                createdBy: req.user._id
            },
            req.body,
            { returnDocument: "after" }
        );

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            });

        }

        res.json(job);

    } catch (error) {

        res.status(500).json({
            message: "Update failed"
        });

    }
}

async function getMyJobs(req, res) {
    try {
        const jobs = await Job.find({
            createdBy: req.user._id
        }).populate("company", "name").sort({createdAt: -1});

        res.json(jobs)
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch recruiter jobs"
        })
    }
}

async function getRecommendedJobs(req, res) {
    try {
        const candidate = req.user

        const candidateSkills = candidate.skills || [];
        const candidateExperience = candidate.experience || 0;

        const appliedJobs = await Application.find({
            applicant: candidate._id
        }).select("job");

        const appliedJobIds = appliedJobs.map(app => app.job);

        const jobs = await Job.find({
            status: "open",

            _id: { $nin: appliedJobIds },

            experienceRequired: {
                $lte: candidateExperience
            },

            skillsRequired: {
                $in: candidateSkills
            }
        })
        .populate("company", "name logo")
        .sort({ createdAt: -1 })
        .limit(10)

        res.json(jobs)
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch recommended jobs",
            error: error.message
        });
    }
}

// async function displayJob(req, res) {
//     try {
        
//     } catch (error) {
//         console.log(error)
//         res.status(500).send(error.message)
//     }
// }

export {addJob, allJobs, getMyJobs, getJobById, updateJob, deleteJob, getRecommendedJobs};