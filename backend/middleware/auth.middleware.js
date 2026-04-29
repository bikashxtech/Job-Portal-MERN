import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

async function protect(req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    } else if (req.cookies?.token) {
        token = req.cookies.token
    }

    if(!token) {
        return res.status(401).json({
            message: "No token"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if(!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        req.user = user;

        next()
    } catch (error) {
        return res.status(401).json({
            message: "Not Authorized"
        })
    }
}

export default protect;