import { Link } from "react-router-dom";

function JobCard({ job }) {
    return (
        <div className="card h-100 border-0 shadow-sm hover-card">
            <div className="card-body p-4">

                <div className="d-flex align-items-center mb-3 gap-3">

                    {job.company?.logo ? (

                        <img
                            src={job.company.logo}
                            alt="company logo"
                            style={{
                                width: 48,
                                height: 48,
                                objectFit: "cover",
                                borderRadius: "10px",
                                flexShrink: 0
                            }}
                        />

                    ) : (

                        <div
                            className="rounded-3 d-flex align-items-center justify-content-center fw-bold text-white"
                            style={{
                                width: 48,
                                height: 48,
                                background: "#6366f1",
                                fontSize: 18,
                                flexShrink: 0
                            }}
                        >
                            {job.company?.name?.[0] || "?"}
                        </div>

                    )}

                    <div>
                        <h6 className="mb-0 fw-semibold">
                            {job.title}
                        </h6>

                        <small className="text-muted">
                            {job.company?.name}
                        </small>
                    </div>

                </div>


                <div className="d-flex gap-2 flex-wrap mb-3">

                    <span
                        className="badge"
                        style={{
                            background: "#ede9fe",
                            color: "#6d28d9"
                        }}
                    >
                        <i className="bi bi-geo-alt me-1" />
                        {job.location}
                    </span>

                    {job.salary && (

                        <span
                            className="badge"
                            style={{
                                background: "#d1fae5",
                                color: "#065f46"
                            }}
                        >
                            <i className="bi bi-currency-rupee me-1" />
                            {(job.salary / 1000).toFixed(0)}k/yr
                        </span>

                    )}

                </div>


                <div className="d-flex flex-wrap gap-1 mb-3">

                    {(job.skillsRequired || [])
                        .slice(0, 3)
                        .map(skill => (

                            <span
                                key={skill}
                                className="badge rounded-pill bg-light text-secondary border"
                            >
                                {skill}
                            </span>

                        ))}

                </div>


                <Link
                    to={`/jobs/${job._id}`}
                    className="btn btn-sm w-100"
                    style={{
                        background: "#6366f1",
                        color: "#fff"
                    }}
                >
                    View Job
                </Link>

            </div>
        </div>
    );
}

export default JobCard;