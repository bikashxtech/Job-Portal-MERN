import { useNavigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

function ApplicationItem({ name, role, applicationId }) {

    const navigate = useNavigate();
    const { user } = useAuth();

    const handleReview = () => {
        if (user?.role === "recruiter") {
            navigate(`/applications/${applicationId}/review`);
        } else {
            navigate(`/applications/${applicationId}`);
        }
    }

    return (

        <div className="d-flex justify-content-between align-items-center border-bottom py-2">

            <div>

                <div className="fw-semibold">{name}</div>

                <small className="text-muted">
                    Applied for {role}
                </small>

            </div>

            <button
                className={`btn btn-sm ${
                    user?.role === "recruiter"
                        ? "btn-outline-success"
                        : "btn-outline-primary"
                }`}
                onClick={handleReview}
            >
                {user?.role === "recruiter"
                    ? "Review Candidate"
                    : "View Status"}
            </button>

        </div>

    );
}

export default ApplicationItem;