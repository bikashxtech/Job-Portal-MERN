import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../src/apiClient.js";

function ApplicationStatus() {

    const { id } = useParams();

    const [application, setApplication] = useState(null);

    useEffect(() => {

        async function fetchApplication() {

            try {

                const res = await axiosClient.get(`/applications/${id}`);
                setApplication(res.data);

            } catch (error) {

                console.error("Failed to load application", error);

            }

        }

        fetchApplication();

    }, [id]);


    if (!application) {
        return <h4 className="text-center mt-4">Loading application...</h4>;
    }

    return (

        <div className="container mt-4">

            <div className="card shadow-sm border-0 col-md-8 mx-auto">

                <div className="card-body">

                    <h3 className="fw-bold mb-3">
                        Application Status
                    </h3>

                    <p>
                        <strong>Job:</strong> {application.job.title}
                    </p>

                    <p>
                        <strong>Company:</strong> {application.job.company.name}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        <span className="badge bg-primary">
                            {application.status}
                        </span>
                    </p>

                    <hr />

                    <p>
                        <strong>Resume:</strong>{" "}
                        <a
                            href={application.resume}
                            target="_blank"
                            rel="noreferrer"
                        >
                            View Resume
                        </a>
                    </p>

                    {application.coverLetter && (

                        <div>

                            <strong>Cover Letter:</strong>

                            <p className="mt-2">
                                {application.coverLetter}
                            </p>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ApplicationStatus;