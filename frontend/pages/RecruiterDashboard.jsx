import { useAuth } from "../src/context/AuthContext.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import axiosClient from "../src/apiClient.js";

import ApplicationItem from "../components/ApplicationItem.jsx"
import DashboardCard from "../components/DashboardCard.jsx";
import JobRow from "../components/JobRow.jsx";
import axios from "axios";

function RecruiterDashboard() {

    const { user } = useAuth();

    const [stats, setStats] = useState(null);
    const [jobs, setJobs] = useState([])
    const [applications, setApplications] = useState([])

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, jobsRes, appsRes] = await Promise.all([
                    axiosClient.get("/dashboard/recruiter-stats" ),
                    axiosClient.get("/jobs/my-jobs"),
                    axiosClient.get("applications/my-job-applications")
                ])

                setStats(statsRes.data)
                setJobs(jobsRes.data.slice(0, 5))
                setApplications(appsRes.data.slice(0,5))
            } catch (error) {
                console.error("Dashboard fetch failed: ", error)
            }
        }

        fetchDashboardData();
    }, [])

    if(!stats) {
        return <h4 className="text-center mt-4">Loading dashboard</h4>
    }

    return (

        <div className="container mt-4">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div className="d-flex align-items-center gap-3">

                    <img
                        src={user?.profilePic || "https://via.placeholder.com/60"}
                        alt="profile"
                        className="rounded-circle"
                        width="60"
                        height="60"
                        style={{ objectFit: "cover" }}
                    />

                    <div>
                        <h2 className="fw-bold mb-0">
                            Welcome back, {user?.name} 👋
                        </h2>

                        <p className="text-muted mb-0">
                            {user?.company?.name || "No company assigned"}
                        </p>
                        <p className="text-muted mb-0">
                            Manage your jobs and applicants from here
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
                        to="/jobs/create"
                        className="btn btn-primary"
                    >
                        + Post New Job
                    </Link>

                </div>

            </div>


            <div className="row g-4 mb-4">

                <DashboardCard
                    title="Jobs Posted"
                    value={stats.jobsPosted}
                    color="primary"
                    icon="bi-briefcase"
                />

                <DashboardCard
                    title="Active Listings"
                    value={stats.activeListings}
                    color="success"
                    icon="bi-check-circle"
                />

                <DashboardCard
                    title="Applications Received"
                    value={stats.applicationsReceived}
                    color="warning"
                    icon="bi-people"
                />

                <DashboardCard
                    title="Shortlisted Candidates"
                    value={stats.shortlistedCandidates}
                    color="danger"
                    icon="bi-person-check"
                />

            </div>


            <div className="row">

                {/* JOB TABLE */}
                <div className="col-lg-7">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <h5 className="fw-semibold">
                                    Recent Job Listings
                                </h5>

                                <Link
                                    to="/jobs/manage"
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    View All
                                </Link>

                            </div>

                            <table className="table table-hover">

                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Status</th>
                                        <th>Applicants</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {jobs.map(job => (

                                        <JobRow
                                            key={job._id}
                                            title={job.title}
                                            status={job.status}
                                            applicants={job.applicants.length}
                                            jobId={job._id}
                                            logo={job.company?.logo}
                                        />

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>


                {/* APPLICATION PANEL */}
                <div className="col-lg-5">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h5 className="fw-semibold mb-3">
                                Recent Applications
                            </h5>

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

            </div>

        </div>
    );
}

export default RecruiterDashboard;