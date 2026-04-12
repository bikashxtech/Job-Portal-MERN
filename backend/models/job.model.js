import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        location: {
            type: String
        },

        salary: {
            type: Number
        },

        skillsRequired: [String],

        experienceRequired: Number,

        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        applicants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Application"
            }
        ],

        status: {
            type: String,
            enum: ["open", "closed"],
            default: "open"
        }

    },
    {timestamps: true}
);

export default mongoose.model("Job", jobSchema);