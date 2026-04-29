import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Layout from "./layout/Layout.jsx";
import Features from "../pages/Features.jsx";
import LoginRegister from "../pages/LoginRegister.jsx";
import PostJob from "../pages/PostJob.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import JobDetails from "../pages/JobDetails.jsx";
import EditProfile from "../pages/EditProfile.jsx";
import ApplyJob from "../pages/ApplyJob.jsx";
import ApplicationStatus from "../components/ApplicationStatus.jsx";
import ReviewApplication from "../components/ReviewApplication.jsx";
import CandidateProfile from "../pages/CandidateProfile.jsx";
import MyApplications from "../pages/MyApplications.jsx";
import ManageJobs from "../pages/ManageJobs.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import RecruiterRoute from "../components/RecruiterRoute.jsx";
import CandidateRoute from "../components/CandidateRoute.jsx";
import AdminRoute from "../components/AdminRoute.jsx";
import Unauthorized from "../components/Unauthorized.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import AdminUsers from "../pages/AdminUsers.jsx";
import AdminJobs from "../pages/AdminJobs.jsx";
import AdminCompanies from "../pages/AdminCompanies.jsx";
import Jobs from "../pages/Jobs.jsx";

let router = createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        children: [
            {path: "/", element: <Home />},
            {path: "/features", element: <Features/>},
            {path: "/jobs", element: <Jobs />},
            {
                path: "/admin",
                element: (
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                )
            },
            {
                path: "/admin/users",
                element: (
                    <AdminRoute>
                        <AdminUsers />
                    </AdminRoute>
                )
            },
            {
                path: "/admin/jobs",
                element: (
                    <AdminRoute>
                        <AdminJobs />
                    </AdminRoute>
                )
            },
            {
                path: "/admin/companies",
                element: (
                    <AdminRoute>
                        <AdminCompanies />
                    </AdminRoute>
                )
            },
            {
                path: "/jobs/manage",
                element: (
                    <RecruiterRoute>
                        <ManageJobs />
                    </RecruiterRoute>
                )
            },
            {
                path: "/jobs/create",
                element: (
                    <RecruiterRoute>
                        <PostJob />
                    </RecruiterRoute>
                )
            },
            {
                path: "/jobs/edit/:id", 
                element: (
                    <RecruiterRoute>
                        <PostJob editMode={true}/>
                    </RecruiterRoute>
                )
            },
            {
                path: "/jobs/:id", 
                element: <JobDetails/>
            },
            {
                path: "/jobs/:id/apply",
                element: (
                    <CandidateRoute>
                        <ApplyJob />
                    </CandidateRoute>
                )
            },
            {path:"/login", element: <LoginRegister />},
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )
            },
            {
                path:"/profile/edit", 
                element: (
                    <ProtectedRoute>
                        <EditProfile />
                    </ProtectedRoute>
                )
            },
            {
                path: "/applications", 
                element: (
                    <CandidateRoute>
                        <MyApplications />
                    </CandidateRoute>
                )
            },
            {
                path: "/applications/:id", 
                element: (
                    <CandidateRoute>
                        <ApplicationStatus />
                    </CandidateRoute>
                ) 
            },
            {
                path: "/applications/:id/review", 
                element: (
                    <RecruiterRoute>
                        <ReviewApplication />
                    </RecruiterRoute>
                ) 
                
            },
            {
                path: "/candidates/:id",
                element: (
                    <RecruiterRoute>
                        <CandidateProfile />
                    </RecruiterRoute>
                ) 
                
            },
            {
                path: "/unauthorized",
                element: <Unauthorized />
            }
        ]
    }
])

export default router