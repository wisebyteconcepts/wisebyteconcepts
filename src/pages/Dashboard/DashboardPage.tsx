import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { useAuth } from "@/app/providers/AuthProvider";
import { useData } from "@/features/data/DataContext";
import { AdminLayout } from "@/layouts/AdminLayout";

const DashboardPage = () => {
    const { user, roles } = useAuth();
    const { services, products, skills, resetToDefaults } = useData();
    const [showReset, setShowReset] = useState(false);

    const handleReset = () => {
        resetToDefaults();
        setShowReset(false);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                    <p className="text-sm text-muted-foreground">
                        Welcome back{user?.email ? `, ${user.email}` : ""}.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-border/50 p-6">
                        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                            Total services
                        </h3>
                        <p className="text-3xl font-bold">{services.length}</p>
                    </Card>
                    <Card className="border-border/50 p-6">
                        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                            Total products
                        </h3>
                        <p className="text-3xl font-bold">{products.length}</p>
                    </Card>
                    <Card className="border-border/50 p-6">
                        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                            Total skills
                        </h3>
                        <p className="text-3xl font-bold">{skills.length}</p>
                    </Card>
                    <Card className="border-border/50 p-6">
                        <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                            Your roles
                        </h3>
                        <p className="text-lg font-semibold capitalize">
                            {roles.length > 0 ? roles.join(", ") : "—"}
                        </p>
                    </Card>
                </div>

                <Card className="border-border/50 p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Settings className="h-5 w-5 text-muted-foreground" />
                            <div>
                                <h3 className="font-semibold">Danger zone</h3>
                                <p className="text-sm text-muted-foreground">
                                    Reset all services and products to defaults.
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setShowReset((prev) => !prev)}
                        >
                            Reset data
                        </Button>
                    </div>

                    {showReset && (
                        <div className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
                            <p className="mb-4 text-sm text-muted-foreground">
                                This action cannot be undone. All custom services and products will
                                be removed and replaced with defaults.
                            </p>
                            <div className="flex gap-3">
                                <Button size="sm" variant="destructive" onClick={handleReset}>
                                    Confirm reset
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setShowReset(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </AdminLayout>
    );
};

export default DashboardPage;
