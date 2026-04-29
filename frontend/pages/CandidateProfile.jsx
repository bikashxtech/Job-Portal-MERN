import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../src/apiClient";

function CandidateProfile() {

    const { id } = useParams();
    const [candidate, setCandidate] = useState(null);

    useEffect(() => {

        async function fetchCandidate() {

            try {

                const res = await axiosClient.get(`/users/${id}`);
                setCandidate(res.data);

            } catch (error) {

                console.error("Failed to load profile", error);

            }

        }

        fetchCandidate();

    }, [id]);


    if (!candidate) {
        return <h4 className="text-center mt-4">Loading profile...</h4>;
    }

    return (

        <div className="container mt-4">

            <div className="card shadow-sm border-0 col-md-8 mx-auto">

                <div className="card-body">

                    {/* PROFILE HEADER */}
                    <div className="d-flex align-items-center gap-3 mb-4">

                        <img
                            src={
                                candidate.profilePic ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt="Profile"
                            width="90"
                            height="90"
                            className="rounded-circle border"
                            style={{ objectFit: "cover" }}
                        />

                        <div>
                            <h3 className="fw-bold mb-0">
                                {candidate.name}
                            </h3>

                            <small className="text-muted">
                                {candidate.email}
                            </small>
                        </div>

                    </div>


                    {/* PROFILE DETAILS */}

                    <p>
                        <strong>Skills:</strong>{" "}
                        {candidate.skills?.length
                            ? candidate.skills.join(", ")
                            : "Not provided"}
                    </p>

                    <p>
                        <strong>Experience:</strong>{" "}
                        {candidate.experience ?? "Not provided"} years
                    </p>

                    <p>
                        <strong>Education:</strong>{" "}
                        {candidate.education || "Not provided"}
                    </p>


                    {/* RESUME BUTTON */}

                    {candidate.resume && (

                        <a
                            href={candidate.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-primary"
                        >
                            View Resume 📄
                        </a>

                    )}

                </div>

            </div>

        </div>
    );
}

export default CandidateProfile;