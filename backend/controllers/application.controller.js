import Application from "../models/application.model.js"
import Job from "../models/job.model.js"

async function getApplicationsForRecruiter(req, res) {
    try {

        console.log("req.user:", req.user);

        if (!req.user) {
            return res.status(401).json({
                message: "User missing in request"
            });
        }

        const recruiterJobs = await Job.find({
            createdBy: req.user
        }).select("_id");

        console.log("Recruiter jobs:", recruiterJobs);

        const jobIds = recruiterJobs.map(job => job._id);

        if (!jobIds.length) {
            return res.json([]);
        }

        const applications = await Application.find({
            job: { $in: jobIds }
        })
        .populate("applicant", "name email resume")
        .populate("job", "title");

        res.json(applications);

    } catch (error) {

        console.error("Applications error:", error);

        res.status(500).json({
            message: "Failed to fetch applications",
            error: error.message
        });
    }
}

async function getApplicationsForSingleJob(req, res) {
    try {
        const applications = await application.find({
            jobId: req.params.jobId,
            recruiterId: req.user
        }).populate("candidateId", "name email");
        res.json(applications)
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch job applications"
        })
    }
}

async function getMyApplications(req, res) {
    try {
        const applications = await Application.find({
            applicant: req.user._id
        }).populate({
            path: "job",
            populate: {
                path: "company",
                select: "name logo"
            }
        }).sort({ createdAt: -1 })

        res.json(applications)
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch applications",
            error: error.message
        })
    }
}

async function applyToJob(req, res) {
    try {

        const jobId = req.params.jobId;
        const userId = req.user._id;
        const { resume, coverLetter } = req.body

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        if (job.status === "closed") {
            return res.status(400).json({
                message: "This job is no longer accepting applications"
            });
        }

        const alreadyApplied = await Application.findOne({
            applicant: userId,
            job: jobId
        });

        if (alreadyApplied) {
            return res.status(400).json({
                message: "Already applied to this job"
            });
        }

        const application = await Application.create({
            applicant: userId,
            job: jobId,
            resume: resume || req.user.resume,
            coverLetter
        });

        job.applicants.push(application._id);
        await job.save();

        res.status(201).json({
            message: "Application submittedsuccessfully",
            application
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to apply",
            error: error.message
        });

    }
}

async function getApplicationById(req, res) {
    try {
       const application = await Application.findById(req.params.id)
            .populate({
                path: "applicant",
                select: "name email skills education resume profilePic experience"
            })
            .populate({
                path: "job",
                populate: {
                    path: "company",
                    select: "name logo location"
                }
            });
        
        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            })
        }

        if (application.applicant._id.toString() === req.user._id.toString()) {
            return res.json(application)
        }

        const job = await Job.findById(application.job._id);

        if (job.createdBy.toString() === req.user._id.toString()) {
            return res.json(application)
        }

        return res.status(403).json({
            message: "Not Authorized"
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch application",
            error: error.message
        })       
    }
}

async function updateApplicationStatus(req, res) {

    try {

        const { status } = req.body;

        const allowedStatuses = [
            "shortlisted",
            "interview",
            "accepted",
            "rejected"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status value"
            });
        }

        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        const job = await Job.findById(application.job);

        if (job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Not authorized to update status"
            });
        }

        application.status = status;

        await application.save();

        res.json({
            message: "Status updated successfully",
            application
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to update application status",
            error: error.message
        });

    }
}

export {getApplicationsForRecruiter, getApplicationsForSingleJob, getMyApplications, applyToJob, getApplicationById, updateApplicationStatus};
