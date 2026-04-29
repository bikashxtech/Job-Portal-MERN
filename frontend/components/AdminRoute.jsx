import { Navigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext";

function AdminRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading) return <p>Checking permissions...</p>;

    if (!user) return <Navigate to="/login" replace />;

    if (user.role !== "admin")
        return <Navigate to="/unauthorized" replace />;

    return children;
}

export default AdminRoute;