import { useEffect, useState } from "react";
import axiosClient from "../src/apiClient";
import ApplicationItem from "../components/ApplicationItem";

function MyApplications() {

    const [applications, setApplications] = useState([]);

    useEffect(() => {

        async function fetchApplications() {

            try {

                const res = await axiosClient.get(
                    "/applications/my-applications"
                );

                setApplications(res.data);

            } catch (error) {

                console.error("Failed to fetch applications", error);

            }

        }

        fetchApplications();

    }, []);


    return (

        <div className="container mt-4">

            <h3 className="fw-bold mb-3">
                My Applications
            </h3>

            <div className="card shadow-sm border-0">

                <div className="card-body">

                    {applications.length === 0 ? (

                        <p className="text-muted">
                            No applications yet.
                        </p>

                    ) : (

                        applications.map(app => (

                            <ApplicationItem
                                key={app._id}
                                name={app.job.company.name}
                                role={app.job.title}
                                applicationId={app._id}
                            />

                        ))

                    )}

                </div>

            </div>

        </div>

    );
}

export default MyApplications;