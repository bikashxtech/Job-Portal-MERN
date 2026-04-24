import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

async function allUsers(req, res) {
    try {
        let users = await User.find({})//.select("-password")
        if (users) {
            res.status(200).json(users)
        } else {
            res.status(400).send({"message" : "No users Found"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

async function loginUser(req, res) {
    try {
        const {email, username, password} = req.body;

        if(!password || (!email && !username)) {
            return res.status(400).json({
                message: "Email/username and password required"
            })
        }

        const user = await User.findOne({
            $or: [
                {email: email},
                {name: username}
            ]
        })

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            {id : user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            message: "Login Successful",
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Login Failed",
            error: error.message
        })
    }
}

async function logoutUser(req, res) {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "lax"
        })

        res.status(200).json({
            message: "Logged Out Sucsessfully"
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            message:"Logout failed",
            error: error.message
        })
    }
}

async function addUser(req, res) {
    try {
        const {name, email, password, role} = req.body
        const userExists = await User.findOne({ email });
        if(userExists)
                    return res.status(400).json({ message: "User already exists"});
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role
        })

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured");
        }

        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({"message" : "User not added", "error": error.message})
    }
}

async function getUserById(req,res) {
    try {
        let {id} = req.params
        let user = await User.findById(id).select("-password")
        if (user) {
            res.send(user)
        } else {
            res.status(404).send({"message": "User Not Found"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({"message": "User not found", "error": error.message})
    }
}

async function deleteUser(req, res) {
    try {
        let {id} = req.params
        await User.findOneAndDelete({_id: id})
        res.status(201).send({"message" : "User deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

async function updateUser(req, res) {
    try {
        let {id} = req.params
        let data = req.body
        let user = await User.findByIdAndUpdate(id, data);
        if(user) {
            res.send(user)
        } else {
            res.status(404).send({"message": "Update error"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
}

async function getCurrentUser(req, res) {
    try {

        const user = await User.findById(req.user).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch user",
            error: error.message
        });

    }
}

export {allUsers, addUser, getUserById, deleteUser, updateUser, loginUser, logoutUser, getCurrentUser};