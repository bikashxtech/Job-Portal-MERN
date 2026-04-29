import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../src/apiClient";
import { useAuth } from "../src/context/AuthContext";

function ApplyJob() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [job, setJob] = useState(null);

    const [formData, setFormData] = useState({
        resume: "",
        coverLetter: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function fetchJob() {

            try {

                const res = await axiosClient.get(`/jobs/${id}`);
                setJob(res.data);

            } catch (error) {

                console.error("Failed to load job", error);

            }

        }

        fetchJob();

    }, [id]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {

            if (!formData.resume && !user?.resume) {

                setMessage(
                    "Please upload a resume in your profile or provide one here before applying."
                );

                setLoading(false);
                return;

            }

            const payload = {
                coverLetter: formData.coverLetter
            };

            if (formData.resume) {
                payload.resume = formData.resume;
            }

            await axiosClient.post(
                `/applications/${id}`,
                payload
            );

            setMessage("Application submitted successfully 🎉");

            setTimeout(() => {
                navigate("/dashboard");
            }, 1500);

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Failed to apply"
            );

        } finally {

            setLoading(false);

        }

    };


    if (!job) {
        return <h4 className="text-center mt-4">Loading job details...</h4>;
    }


    return (

        <div className="container mt-4">

            <div className="card shadow-sm border-0 col-md-8 mx-auto">

                <div className="card-body">

                    <h3 className="fw-bold mb-2">
                        Apply for {job.title}
                    </h3>

                    <p className="text-muted">
                        {job.company?.name}
                    </p>

                    <hr />


                    {/* JOB SUMMARY */}
                    <div className="mb-4">

                        <p>
                            <strong>Location:</strong> {job.location}
                        </p>

                        <p>
                            <strong>Experience Required:</strong>{" "}
                            {job.experienceRequired} years
                        </p>

                        <p>
                            <strong>Skills Required:</strong>{" "}
                            {job.skillsRequired.join(", ")}
                        </p>

                    </div>


                    {/* RESUME STATUS NOTICE */}
                    {user?.resume && !formData.resume && (
                        <div className="alert alert-info">

                            Using resume from your profile.

                        </div>
                    )}


                    {/* APPLY FORM */}
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Resume URL (optional)</label>

                            <input
                                name="resume"
                                value={formData.resume}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Leave blank to use profile resume"
                            />

                        </div>


                        <div className="mb-3">

                            <label>Cover Letter</label>

                            <textarea
                                name="coverLetter"
                                value={formData.coverLetter}
                                onChange={handleChange}
                                className="form-control"
                                rows="4"
                                placeholder="Write a short cover letter..."
                            />

                        </div>


                        <button
                            className="btn btn-success w-100"
                            disabled={loading}
                        >
                            {loading
                                ? "Submitting..."
                                : "Apply Now"}
                        </button>

                    </form>


                    {/* STATUS MESSAGE */}
                    {message && (

                        <p className="mt-3 text-primary text-center">

                            {message}

                        </p>

                    )}

                </div>

            </div>

        </div>

    );
}

export default ApplyJob;