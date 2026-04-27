import { Link, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Package, Wrench } from "lucide-react";
import { useAuth } from "@/app/providers/AuthProvider";
import { Button } from "@/shared/ui/button";
import logo from "@/assets/wbc-logo.png";

const navItems = [
    { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
    { to: "/dashboard/services", label: "Services", icon: Wrench },
    { to: "/dashboard/products", label: "Products", icon: Package },
];

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b border-border/50 bg-secondary/30">
                <div className="container flex items-center justify-between py-4">
                    <Link to="/dashboard" className="flex items-center gap-3">
                        <img src={logo} alt="Wise Byte Concepts" className="h-8 w-8 rounded-lg" />
                        <div>
                            <h1 className="text-lg font-bold leading-none">Admin Console</h1>
                            <p className="text-xs text-muted-foreground">Wise Byte Concepts</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm text-muted-foreground sm:inline">
                            {user?.email}
                        </span>
                        <Button asChild variant="outline" size="sm">
                            <a href="/" target="_blank" rel="noopener noreferrer">
                                View site
                            </a>
                        </Button>
                        <Button onClick={handleLogout} variant="outline" size="sm">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container grid gap-6 py-6 md:grid-cols-[200px_1fr]">
                <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col">
                    {navItems.map(({ to, label, icon: Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                }`
                            }
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </NavLink>
                    ))}
                </nav>
                <main>{children}</main>
            </div>
        </div>
    );
};
