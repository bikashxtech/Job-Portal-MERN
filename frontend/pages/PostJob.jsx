import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../src/apiClient.js";

function PostJob({ editMode }) {

    const { id } = useParams();
    const navigate = useNavigate();

    const isEdit = editMode || !!id;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        skillsRequired: "",
        experienceRequired: ""
    });

    const [message, setMessage] = useState("");


    /*
    =========================
    FETCH JOB IF EDIT MODE
    =========================
    */
    useEffect(() => {

        if (!isEdit) return;

        async function fetchJob() {

            try {

                const res = await apiClient.get(`/jobs/${id}`);

                const job = res.data;

                setFormData({
                    title: job.title,
                    description: job.description,
                    location: job.location,
                    salary: job.salary,
                    skillsRequired: job.skillsRequired.join(", "),
                    experienceRequired: job.experienceRequired
                });

            } catch (error) {

                console.error("Failed to load job", error);

            }

        }

        fetchJob();

    }, [id, isEdit]);


    /*
    =========================
    HANDLE INPUT CHANGE
    =========================
    */
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    /*
    =========================
    HANDLE SUBMIT
    =========================
    */
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

            let res;

            if (isEdit) {

                res = await apiClient.put(
                    `/jobs/${id}`,
                    jobPayload
                );

                setMessage("Job updated successfully");

            } else {

                res = await apiClient.post(
                    "/jobs",
                    jobPayload
                );

                setMessage("Job created successfully");

            }

            setTimeout(() => {
                navigate("/jobs/manage");
            }, 1200);

        } catch (error) {

            console.error(error);
           setMessage(
                error.response?.data?.message ||
                "You are not authorized to edit this job"
            );

        }

    };


    return (

        <div className="container col-md-6 mt-4">

            <h3 className="mb-4">
                {isEdit ? "Edit Job" : "Post a Job"}
            </h3>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    className="form-control mb-3"
                    placeholder="Job Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    className="form-control mb-3"
                    placeholder="Job Description"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    className="form-control mb-3"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="salary"
                    className="form-control mb-3"
                    placeholder="Salary (per annum)"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="skillsRequired"
                    className="form-control mb-3"
                    placeholder="Skills (comma separated)"
                    value={formData.skillsRequired}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="experienceRequired"
                    className="form-control mb-3"
                    placeholder="Experience Required (years)"
                    value={formData.experienceRequired}
                    onChange={handleChange}
                    required
                />

                <button className="btn btn-dark w-100">

                    {isEdit ? "Update Job" : "Submit Job"}

                </button>

            </form>

            {message && (

                <p
                    className={
                        message.includes("successfully")
                            ? "text-success"
                            : "text-danger"
                    }
                >
                    {message}
                </p>

            )}

        </div>

    );
}

export default PostJob;