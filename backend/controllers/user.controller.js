import User from "../models/user.model.js"

async function allUsers(req, res) {
    try {
        let users = await User.find({})
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

async function addUser(req, res) {
    try {
        let newUser = req.body
        newUser = await User.create(newUser)
        res.status(201).send(newUser)
    } catch (error) {
        console.log(error)
        res.status(400).send({"message" : "User not added", "error": error.message})
    }
}

async function getUserById(req,res) {
    try {
        let {id} = req.params
        let user = await User.findOne({_id: id})
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

export {allUsers, addUser, getUserById, deleteUser, updateUser};