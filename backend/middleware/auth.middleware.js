import jwt from "jsonwebtoken"

function protect(req, res, next) {
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

        req.user = decoded.id;

        next()
    } catch (error) {
        return res.status(401).json({
            message: "Not Authorized"
        })
    }
}

export default protect;