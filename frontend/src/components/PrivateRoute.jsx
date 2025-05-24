import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null; // atau loader

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;