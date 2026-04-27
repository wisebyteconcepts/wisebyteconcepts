import { Navigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";

export const ProtectedRoute = ({
    children,
    requireAdmin = false,
}: {
    children: React.ReactNode;
    requireAdmin?: boolean;
}) => {
    const { user, roles, isLoading } = useAuth();

    // 1. Wait for auth to resolve
    if (isLoading) {
        return <div>Loading...</div>; // or skeleton
    }

    // 2. Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 3. Admin check
    if (requireAdmin && !roles?.includes("admin")) {
        return <Navigate to="/" replace />; // or unauthorized page
    }

    // 4. Render content
    return <>{children}</>;
};