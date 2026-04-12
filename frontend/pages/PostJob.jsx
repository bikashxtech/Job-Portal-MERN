import { useState } from "react";
import apiClient from "../src/apiClient.js"

function PostJob() {
    const [formData, setFormData] = useState({
        title:"",
        description:"",
        location:"",
        salary:"",
        skillsRequired:"",
        experienceRequired:""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

   const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jobPayload = {
            ...formData,
            salary: Number(formData.salary),
            experienceRequired: Number(formData.experienceRequired),
            skillsRequired: formData.skillsRequired
                .split(",")
                .map(skill => skill.trim())
        };

        try {
            let res = await apiClient.post("/jobs", jobPayload);

            if (res.status === 201) {
                setMessage("Job Created Successfully");
                setFormData({
                    title:"",
                    description:"",
                    location:"",
                    salary:"",
                    skillsRequired:"",
                    experienceRequired:""
                })
            } else {
                setMessage("Job Not Created");
            }

        } catch (error) {
            console.log(error);
            setMessage("Job Not Created");
        }
    };
    return (
        <div className="container col-md-6 mt-4">
            <h3 className="mb-4">Post a Job</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" className="form-control mb-3" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
                <textarea name="description" className="form-control mb-3" placeholder="Job Description" rows="4" value={formData.description} onChange={handleChange} required/>
                <input type="text" name="location" className="form-control mb-3" placeholder="Location" value={formData.location} onChange={handleChange} required />
                <input type="number" name="salary" className="form-control mb-3" placeholder="Salary (per annum)" value={formData.salary} onChange={handleChange} required />
                <input type="text" name="skillsRequired" className="form-control mb-3" placeholder="Skills (comma separated: React, Node.js, MongoDB)" value={formData.skillsRequired} onChange={handleChange} required />
                <input type="number" name="experienceRequired" className="form-control mb-3" placeholder="Experience Required (years)" value={formData.experienceRequired} onChange={handleChange} required/>
                <button className="btn btn-dark w-100">Submit Job</button>
            </form>
            {message && (
                <p className={message.includes("Successfully") ? "text-success" : "text-danger"}>
                    {message}
                </p>
            )}
        </div>
    )
}

export default PostJob;