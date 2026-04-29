function candidateOnly(req, res, next) {
    if (req.user.role !== "candidate") {
        return res.status(403).json({
            message: "You are not a candidate"
        })
    }

    next()
}

export default candidateOnly;