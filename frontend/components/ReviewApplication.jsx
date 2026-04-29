import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../src/apiClient";

function ReviewApplication() {

    const { id } = useParams();

    const navigate = useNavigate()
    const [application, setApplication] = useState(null);
    const [message, setMessage] = useState("");

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


    async function updateStatus(status) {

        try {

            await axiosClient.put(
                `/applications/${id}/status`,
                { status }
            );

            setApplication({
                ...application,
                status
            });

            setMessage(`Status updated to ${status}`);

        } catch (error) {

            console.error("Failed to update status", error);

        }

    }


    if (!application) {
        return <h4 className="text-center mt-4">Loading application...</h4>;
    }


    return (

        <div className="container mt-4">

            <div className="card shadow-sm border-0 col-md-8 mx-auto">

                <div className="card-body">

                    <h3 className="fw-bold mb-3">
                        Review Candidate
                    </h3>

                    <img
                        src={
                            application.applicant.profilePic ||
                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="Candidate Profile"
                        width="70"
                        height="70"
                        className="rounded-circle border"
                        style={{ objectFit: "cover" }}
                    />

                    <p>
                        <strong>Name:</strong>{" "}
                        {application.applicant.name}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {application.applicant.email}
                    </p>

                    <p>
                        <strong>Skills:</strong>{" "}
                        {application.applicant.skills?.join(", ")}
                    </p>

                    <p>
                        <strong>Education:</strong>{" "}
                        {application.applicant.education}
                    </p>

                    <button
                        className="btn btn-outline-dark mt-2"
                        onClick={() =>
                            navigate(`/candidates/${application.applicant._id}`)
                        }
                    >
                        View Candidate Profile
                    </button>

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

                    <hr />

                    <p>
                        <strong>Current Status:</strong>{" "}
                        <span className="badge bg-info">
                            {application.status}
                        </span>
                    </p>


                    {/* ACTION BUTTONS */}

                    <div className="d-flex gap-2 mt-3">

                        <button
                            className="btn btn-outline-success"
                            onClick={() => updateStatus("shortlisted")}
                        >
                            Shortlist
                        </button>

                        <button
                            className="btn btn-outline-warning"
                            onClick={() => updateStatus("interview")}
                        >
                            Interview
                        </button>

                        <button
                            className="btn btn-outline-primary"
                            onClick={() => updateStatus("accepted")}
                        >
                            Accept
                        </button>

                        <button
                            className="btn btn-outline-danger"
                            onClick={() => updateStatus("rejected")}
                        >
                            Reject
                        </button>

                    </div>

                    {message && (

                        <p className="mt-3 text-success">
                            {message}
                        </p>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ReviewApplication;