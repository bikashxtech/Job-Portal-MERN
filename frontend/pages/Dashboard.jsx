import { useAuth } from "../src/context/AuthContext.jsx";
import CandidateDashboard from "./CandidateDashboard.jsx";
import RecruiterDashboard from "./RecruiterDashboard.jsx";

function Dashboard() {
    const {user, loading} = useAuth();

    if(loading) return <h3>Loading...</h3>;
    if(!user) return <h3>Please login first</h3>

    return (
        <>
            {user.role === "recruiter" && <RecruiterDashboard />}
            {user.role === "candidate" && <CandidateDashboard />}
        </>
    )
}

export default Dashboard;