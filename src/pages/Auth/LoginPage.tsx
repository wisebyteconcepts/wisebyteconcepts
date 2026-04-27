import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Card } from "@/shared/ui/card";

import { useLogin } from "@/features/auth/hooks/useLogin";
import { useAuth } from "@/app/providers/AuthProvider";

import { toast } from "sonner";
import logo from "@/assets/wbc-logo.png";

const AdminLogin = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const loginMutation = useLogin();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /**
     * Handle redirect AFTER auth state resolves
     */
    //useEffect(() => {
    //    if (!loading && user) {
    //        navigate("/dashboard");
    //    }
    //}, [user, loading, navigate]);

    /**
     * Prevent rendering until auth state is known
     */
    if (loading) return null;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        loginMutation.mutate(
            { email, password },
            {
                onSuccess: () => {
                    toast.success("Login successful");
                    navigate("/dashboard");
                },
                onError: (error: Error) => {
                    toast.error(error.message || "Login failed");
                },
            }
        );
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <Card className="w-full max-w-md p-6 space-y-6">
                <div className="flex flex-col items-center gap-2">
                    <img src={logo} alt="Logo" className="h-12" />
                    <h1 className="text-xl font-semibold">Admin Login</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <Label>Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-2.5 text-muted-foreground"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default AdminLogin;