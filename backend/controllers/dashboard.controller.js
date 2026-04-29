import Job from "../models/job.model.js"
import Application from "../models/application.model.js"

async function getRecruiterStats(req, res) {
    try {

        const recruiterId = req.user._id;

        const jobsPosted = await Job.countDocuments({
            createdBy: recruiterId
        });

        const activeListings = await Job.countDocuments({
            createdBy: recruiterId,
            status: "open"
        });

        const recruiterJobs = await Job.find({
            createdBy: recruiterId
        }).select("_id");

        const jobIds = recruiterJobs.map(job => job._id);

        const applicationsReceived = await Application.countDocuments({
            job: { $in: jobIds }
        });

        const shortlistedCandidates = await Application.countDocuments({
            job: { $in: jobIds },
            status: "shortlisted"
        });

        res.json({
            jobsPosted,
            activeListings,
            applicationsReceived,
            shortlistedCandidates
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch recruiter stats",
            error: error.message
        });

    }
}

async function getApplicationsForSingleJob (req, res) {

    try {

        const job = await Job.findOne({
            _id: req.params.jobId,
            createdBy: req.user
        });

        if (!job) {

            return res.status(403).json({
                message: "Not authorized to view applications"
            });

        }

        const applications = await Application.find({
            job: req.params.jobId
        })
        .populate("applicant", "name email resume skills")
        .sort({ createdAt: -1 });

        res.json(applications);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch job applications",
            error: error.message
        });

    }
};

async function getCandidateStats(req, res){
    try {
        const candidateId = req.user._id;
        const applicationsSent = await Application.countDocuments({
            applicant: candidateId
        })

        const applied = await Application.countDocuments({
            applicant: candidateId,
            status: "applied"
        })

        const shortlisted = await Application.countDocuments({
            applicant: candidateId,
            status: "shortlisted"
        })

        const interviews = await Application.countDocuments({
            applicant: candidateId,
            status: "interview"
        })

        const accepted = await Application.countDocuments({
            applicant: candidateId,
            status: "accepted"
        })

        const rejected = await Application.countDocuments({
            applicant: candidateId,
            status: "rejected"
        })

        res.json({
            applied,
            applicationsSent,
            shortlisted,
            interviews,
            accepted,
            rejected
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch candidate stats",
            error: error.message
        });
    }
}

export {getRecruiterStats, getApplicationsForSingleJob, getCandidateStats}