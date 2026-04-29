import User from "../models/user.model.js"
import Job from "../models/job.model.js"
import Application from "../models/application.model.js"

async function getAllUsers(req, res) {
    try {
        const users = await User.find({
            role: { $ne: "admin" },
            _id: { $ne: req.user._id }
        }).select("-password")
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            message: error.message,
        })        
    }
}

async function deleteUser(req, res) {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(201).json({
            messgae: "User deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })        
    }
}

async function getAllJobsAdmin(req, res) {
    try {
        const jobs = await Job.find().populate("company", "name").populate("createdBy","name email")
        res.status(200).json(jobs)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })    
    }
}

async function deleteJobAdmin(req, res) {
    try {
        await Job.findByIdAndDelete(req.params.id)

        res.json({
            message:"Job removed by admin"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })    
    }
}

async function getDashboardStats(req, res) {
    try {
        const users = await User.countDocuments();
        const recruiters = await User.countDocuments({
            role: "recruiter"
        })

        const jobs = await Job.countDocuments()

        const applications = await Application.countDocuments()

        res.json({
            users,
            recruiters,
            jobs,
            applications
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })    
    }
}

export {getAllUsers, deleteUser, getAllJobsAdmin, deleteJobAdmin, getDashboardStats}