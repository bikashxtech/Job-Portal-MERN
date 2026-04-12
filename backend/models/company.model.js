import mongoose from "mongoose"

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        website: {
            type: String
        },
         
        location: {
            type: String, 
            required: true
        },

        logo: {
            type: String
        },

        createdBy: {
            type: mongoose.Schema.Types.objectId,
            ref: "User"
        }
    },
    {timestamps: true}
);

export default mongoose.model("Company", companySchema);