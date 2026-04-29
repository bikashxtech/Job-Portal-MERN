import { useEffect, useState } from "react";
import axiosClient from "../src/apiClient.js";
import DashboardCard from "../components/DashboardCard.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

function AdminDashboard() {

    const { user } = useAuth();

    const [stats, setStats] = useState(null);
    const [recentUsers, setRecentUsers] = useState([]);
    const [recentJobs, setRecentJobs] = useState([]);

    useEffect(() => {

        async function fetchAdminData() {

            try {

                const [statsRes, usersRes, jobsRes] =
                    await Promise.all([
                        axiosClient.get("/admin/stats"),
                        axiosClient.get("/admin/users"),
                        axiosClient.get("/admin/jobs")
                    ]);

                setStats(statsRes.data);
                setRecentUsers(usersRes.data.slice(0, 5));
                setRecentJobs(jobsRes.data.slice(0, 5));

            } catch (error) {

                console.error("Admin dashboard failed:", error);

            }

        }

        fetchAdminData();

    }, []);


    if (!stats) {

        return (
            <h4 className="text-center mt-4">
                Loading admin dashboard...
            </h4>
        );

    }


    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold mb-0">
                        Admin Control Panel ⚙️
                    </h2>

                    <p className="text-muted mb-0">
                        Manage users, jobs, companies and platform activity
                    </p>

                </div>


                <div className="d-flex gap-2">

                    <Link
                        to="/admin/users"
                        className="btn btn-outline-dark"
                    >
                        Manage Users
                    </Link>

                    <Link
                        to="/admin/jobs"
                        className="btn btn-outline-primary"
                    >
                        Manage Jobs
                    </Link>

                    <Link
                        to="/admin/companies"
                        className="btn btn-primary"
                    >
                        Manage Companies
                    </Link>

                </div>

            </div>

            <div className="row g-4 mb-4">

                <DashboardCard
                    title="Total Users"
                    value={stats.users}
                    color="primary"
                    icon="bi-people"
                />

                <DashboardCard
                    title="Recruiters"
                    value={stats.recruiters}
                    color="warning"
                    icon="bi-person-badge"
                />

                <DashboardCard
                    title="Jobs Posted"
                    value={stats.jobs}
                    color="success"
                    icon="bi-briefcase"
                />

                <DashboardCard
                    title="Applications"
                    value={stats.applications}
                    color="danger"
                    icon="bi-send"
                />

            </div>


            <div className="row">

                <div className="col-lg-6">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <div className="d-flex justify-content-between mb-3">

                                <h5 className="fw-semibold">
                                    Recent Users
                                </h5>

                                <Link
                                    to="/admin/users"
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    View All
                                </Link>

                            </div>


                            {recentUsers.map(user => (

                                <div
                                    key={user._id}
                                    className="d-flex justify-content-between border-bottom py-2"
                                >

                                    <div>

                                        <div className="fw-semibold">
                                            {user.name}
                                        </div>

                                        <small className="text-muted">
                                            {user.email}
                                        </small>

                                    </div>

                                    <span className="badge bg-secondary">
                                        {user.role}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                <div className="col-lg-6">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <div className="d-flex justify-content-between mb-3">

                                <h5 className="fw-semibold">
                                    Recent Job Listings
                                </h5>

                                <Link
                                    to="/admin/jobs"
                                    className="btn btn-sm btn-outline-secondary"
                                >
                                    View All
                                </Link>

                            </div>


                            {recentJobs.map(job => (

                                <div
                                    key={job._id}
                                    className="d-flex justify-content-between border-bottom py-2"
                                >

                                    <div>

                                        <div className="fw-semibold">
                                            {job.title}
                                        </div>

                                        <small className="text-muted">
                                            {job.company?.name}
                                        </small>

                                    </div>

                                    <span
                                        className={`badge ${
                                            job.status === "open"
                                                ? "bg-success"
                                                : "bg-secondary"
                                        }`}
                                    >
                                        {job.status}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>


            </div>

        </div>

    );
}

export default AdminDashboard;