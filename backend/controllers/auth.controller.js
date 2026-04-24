import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { addUser, getUserById } from "./user.controller.js"

async function registerUser(req, res) {
    try {
        const {name, email, password} = req.body

        const userExists = await User.findOne({ email });

        if(userExists)
            return res.status(400).json({ message: "User already exists"});

        const hashedPassword = await bcrypt.hash(password, 10)

        
    } catch (error) {
        
    }
}