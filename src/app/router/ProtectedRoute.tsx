import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
    const { user, isAdmin, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-muted-foreground">Loading…</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
