import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,

        email: {
            type: String,
            unique: true,
            required: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["candidate", "recruiter", "admin"],
            default: "candidate",
            required: true
        },
        
        skills: [String],

        resume: String,
        
        experience: Number,

        education: String,
        
        profilePic: String,

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        }
    },
    { timestamps: true}
);

export default mongoose.model("User", userSchema);