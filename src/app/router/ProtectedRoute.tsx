import { Navigate } from "react-router-dom";
import { useAuth } from "@/core/providers/AuthProvider";

export const ProtectedRoute = ({ children }: any) => {
    const { user, loading } = useAuth();

    if (loading) return null;
    if (!user) return <Navigate to="/login" />;

    return children;
};