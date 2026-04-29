import { Navigate } from "react-router-dom";
import { useAuth } from "../src/context/AuthContext.jsx";

function ProtectedRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading) {
        return <h4 className="text-center mt-4">Checking authentication...</h4>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;