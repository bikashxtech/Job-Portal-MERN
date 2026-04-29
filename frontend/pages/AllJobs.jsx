import { useEffect, useState } from "react";
import axiosClient from "../src/apiClient";
import JobRow from "../components/JobRow";

function AllJobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        async function fetchJobs() {

            try {

                const res = await axiosClient.get("/jobs");

                setJobs(res.data);

            } catch (error) {

                console.error("Failed to load jobs", error);

            }

        }

        fetchJobs();

    }, []);


    return (

        <div className="container mt-4">

            <h3 className="fw-bold mb-3">
                Available Jobs
            </h3>

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Company</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>

                            {jobs.map(job => (

                                <JobRow
                                    key={job._id}
                                    title={job.title}
                                    status={job.company?.name}
                                    applicants=""
                                    jobId={job._id}
                                />

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}

export default AllJobs;