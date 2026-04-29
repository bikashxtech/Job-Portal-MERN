import { useAuth } from "../src/context/AuthContext.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import CandidateDashboard from "./CandidateDashboard.jsx";
import RecruiterDashboard from "./RecruiterDashboard.jsx";

function Dashboard() {
    const {user, loading} = useAuth();

    if(loading) return <h3 className="text-center">Loading...</h3>;
    if(!user) return <h3 className="text-center">Please login first</h3>

    return (
        <>
            {user.role === "recruiter" && <RecruiterDashboard />}
            {user.role === "candidate" && <CandidateDashboard />}
            {user.role === "admin" && <AdminDashboard />}
        </>
    )
}

export default Dashboard;