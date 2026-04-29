import { useAuth } from "../src/context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../src/apiClient.js";

import DashboardCard from "../components/DashboardCard.jsx"
import ApplicationItem from "../components/ApplicationItem.jsx";
import JobRow from "../components/JobRow.jsx";

function CandidateDashboard() {
    const { user } = useAuth();

    const [stats, setStats] = useState(null)
    const [applications, setApplications] = useState([])
    const [recommendedJobs, setRecommendedJobs] = useState([])

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, appsRes, jobsRes] = await Promise.all([
                    axiosClient.get("/dashboard/candidate-stats"),
                    axiosClient.get("/applications/my-applications"),
                    axiosClient.get("/jobs/recommended")
                ]);

                setStats(statsRes.data)
                setApplications(appsRes.data.slice(0,5))
                setRecommendedJobs(jobsRes.data.slice(0, 5))
            } catch (error) {
                console.error("Dashboard fetch failed: ", error);
            }
        };

        fetchDashboardData()
    }, []);

    if (!stats) {
        return <h4 className="text-center mt-4">Loading dashboard...</h4>;
    }

    return (

        <div className="container mt-4">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div className="d-flex align-items-center gap-3">

                    {user?.profilePic ? (
                        <img
                            src={user.profilePic}
                            alt="profile"
                            width="60"
                            height="60"
                            className="rounded-circle"
                            style={{ objectFit: "cover" }}
                        />
                    ) : (
                        <div
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                            style={{ width: 60, height: 60, fontWeight: "bold" }}
                        >
                            {user?.name?.[0]}
                        </div>
                    )}

                    <div>

                        <h2 className="fw-bold mb-0">
                            Welcome back, {user?.name} 👋
                        </h2>

                        <p className="text-muted mb-0">
                            Track applications and discover new opportunities
                        </p>

                    </div>

                </div>

                <div className="d-flex gap-2">

                    <Link
                        to="/profile/edit"
                        className="btn btn-outline-dark"
                    >
                        Update Profile
                    </Link>

                    <Link
                        to="/jobs"
                        className="btn btn-primary"
                    >
                        Browse Jobs
                    </Link>

                </div>

            </div>


            {/* STATS CARDS */}
            <div className="row g-4 mb-4">

                <DashboardCard
                    title="Applications Sent"
                    value={stats.applicationsSent}
                    color="primary"
                    icon="bi-send"
                />

                <DashboardCard
                    title="Applied in"
                    value={stats.applied}
                    color="warning"
                    icon="bi-calendar-event"
                />

                <DashboardCard
                    title="Shortlisted"
                    value={stats.shortlisted}
                    color="success"
                    icon="bi-person-check"
                />

                <DashboardCard
                    title="Interview Invites"
                    value={stats.interviews}
                    color="warning"
                    icon="bi-calendar-event"
                />

                <DashboardCard
                    title="Accepted"
                    value={stats.accepted}
                    color="warning"
                    icon="bi-calendar-event"
                />

                <DashboardCard
                    title="Rejected"
                    value={stats.rejected}
                    color="warning"
                    icon="bi-calendar-event"
                />

                <DashboardCard
                    title="Saved Jobs"
                    value={stats.savedJobs}
                    color="danger"
                    icon="bi-bookmark"
                />

            </div>


            <div className="row">

                <div className="col-lg-7">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <h5 className="fw-semibold">
                                    Recent Applications
                                </h5>

                                <Link
                                    to="/applications"
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    View All
                                </Link>

                            </div>

                            {applications.map(app => (

                                <ApplicationItem
                                    key={app._id}
                                    name={app.applicant.name}
                                    role={app.job.title}
                                    applicationId={app._id}
                                />

                            ))}

                        </div>

                    </div>

                </div>

                <div className="col-lg-5">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <h5 className="fw-semibold">
                                    Recommended Jobs
                                </h5>

                                <Link
                                    to="/jobs"
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    View All
                                </Link>

                            </div>

                            <table className="table table-hover">

                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Company</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {recommendedJobs.map(job => (

                                        <JobRow
                                            key={job._id}
                                            title={job.title}
                                            status={job.company?.name}
                                            applicants=""
                                            jobId={job._id}
                                            logo={job.company?.name}
                                        />

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default CandidateDashboard;