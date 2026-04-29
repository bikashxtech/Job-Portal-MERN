import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../src/apiClient.js";
import { useAuth } from "../src/context/AuthContext.jsx";

function JobDetails() {
    const { id } = useParams();
    const { user } = useAuth();

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const res = await axiosClient.get(`/jobs/${id}`)
                setJob(res.data)
            } catch (error) {
                console.error("Failed to fetch job", error);
            } finally {
                setLoading(false)
            }
        }

        fetchJob()
    }, [id]);

    if(loading) return <h4 className="text-center mt-4"> Loading Job... </h4>

    if (!job) return <h4 className="text-center mt-4">Job not found</h4>;

    return (
        <div className="container mt-4">
            <div className="card shadow-sm p-4">
                <h2>{job?.title}</h2>

                <div className="d-flex align-items-center gap-3 mb-2">

                    {job.company?.logo && (

                        <img
                            src={job.company.logo}
                            alt="logo"
                            width="50"
                            height="50"
                            style={{ objectFit: "cover", borderRadius: "8px" }}
                        />

                    )}

                    <p className="text-muted mb-0">
                        {job.company?.name} • {job.location}
                    </p>

                </div>

                {job?.salary && (
                    <p>
                        Salary: {(job?.salary / 1000).toFixed(0)}k/year
                    </p>
                )}

                <hr />

                <h5>Description</h5>
                <p>{job?.description}</p>

                <h5>Experience Required</h5>
                <p>{job?.experienceRequired}</p>

                <h5>Required Skill</h5>

                <div className="d-flex gap-2 flex-wrap">
                    {(job?.skillsRequired || []).map(skill => (

                        <span
                            key={skill}
                            className="badge bg-light text-dark border"
                        >
                            {skill}
                        </span>

                    ))}
                </div>
                {user?.role === "recruiter" &&
                job?.createdBy?._id === user._id ? (

                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => navigate(`/jobs/edit/${id}`)}
                    >
                        Edit
                    </button>

                ) : user?.role === "candidate" ? (

                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => navigate(`/jobs/${id}/apply`)}
                    >
                        Apply Now
                    </button>

                ) : null}
                
            </div>
        </div>
    )
} 

export default JobDetails;