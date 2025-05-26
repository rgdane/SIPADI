import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

const PrivateRoute = ({ children, roles }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return null; // atau bisa pakai spinner

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Jika roles diset, cek apakah role user sesuai
    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default PrivateRoute;
