import { Navigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

function RecruiterRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading) {
        return <h4 className="text-center mt-4">Checking permissions...</h4>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "recruiter") {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}

export default RecruiterRoute;