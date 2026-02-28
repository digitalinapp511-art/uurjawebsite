import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true";
    const loginTime = localStorage.getItem("adminLoginTime");

    const isExpired =
        !loginTime || Date.now() - Number(loginTime) > 60 * 60 * 1000; // 30 min

    if (!isAuthenticated || isExpired) {
        localStorage.removeItem("adminAuth");
        localStorage.removeItem("adminLoginTime");
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default AdminProtectedRoute;