import { useEffect, useState } from "react";
import axiosClient from "../src/apiClient.js";
import { useNavigate } from "react-router-dom";

function ManageJobs() {

    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        async function fetchJobs() {

            try {

                const res = await axiosClient.get("/jobs/my-jobs");

                setJobs(res.data);

            } catch (error) {

                console.error("Failed to load jobs", error);

            }

        }

        fetchJobs();

    }, []);


    const handleDelete = async (jobId) => {

        try {

            await axiosClient.delete(`/jobs/${jobId}`);

            setJobs(jobs.filter(job => job._id !== jobId));

        } catch (error) {

            console.error("Failed to delete job", error);

        }

    };


    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h3 className="fw-bold">
                    Manage Job Listings
                </h3>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/jobs/create")}
                >
                    + Post New Job
                </button>

            </div>


            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Applicants</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {jobs.map(job => (

                                <tr key={job._id}>

                                    <td>{job.title}</td>

                                    <td>

                                        <span
                                            className={`badge ${
                                                job.status === "open"
                                                    ? "bg-success"
                                                    : "bg-secondary"
                                            }`}
                                        >
                                            {job.status}
                                        </span>

                                    </td>

                                    <td>{job.applicants.length}</td>

                                    <td className="d-flex gap-2">

                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() =>
                                                navigate(`/jobs/edit/${job._id}`)
                                            }
                                        >
                                            Edit
                                        </button>


                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() =>
                                                handleDelete(job._id)
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}

export default ManageJobs;