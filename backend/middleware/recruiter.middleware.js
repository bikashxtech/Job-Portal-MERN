function recruiterOnly(req, res, next) {
    if (req.user.role !== "recruiter") {
        return res.status(403).json({
            message: "Only recruiters can post jobs"
        })
    }

    next()
}

export default recruiterOnly;