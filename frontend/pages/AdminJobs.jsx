import { useEffect, useState } from "react";
import axiosClient from "../src/apiClient.js";
import { Link } from "react-router-dom";

function AdminJobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        async function fetchJobs() {

            const res = await axiosClient.get("/admin/jobs");
            setJobs(res.data);

        }

        fetchJobs();

    }, []);


    const deleteJob = async (id) => {

        if (!window.confirm("Delete this job?")) return;

        await axiosClient.delete(`/admin/jobs/${id}`);

        setJobs(jobs.filter(job => job._id !== id));

    };


    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-3">

                <h3>Manage Jobs</h3>

                <Link
                    to="/admin"
                    className="btn btn-outline-secondary"
                >
                    Back
                </Link>

            </div>


            <table className="table table-hover">

                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Posted By</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {jobs.map(job => (

                        <tr key={job._id}>

                            <td>{job.title}</td>

                            <td>{job.company?.name}</td>

                            <td>{job.createdBy?.name}</td>

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

                            <td>

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                        deleteJob(job._id)
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

    );
}

export default AdminJobs;