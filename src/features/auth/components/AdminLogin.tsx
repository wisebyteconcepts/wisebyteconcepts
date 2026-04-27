import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Card } from "@/shared/components/ui/card";

import { useLogin } from "@/features/auth/hooks/useLogin";
import { useAuth } from "@/core/providers/AuthProvider";

import logo from "@/assets/wbc-logo.png";

const AdminLogin = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const loginMutation = useLogin();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // If already logged in → redirect
    if (user) {
        navigate("/dashboard");
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        loginMutation.mutate(
            { email, password },
            {
                onSuccess: () => {
                    navigate("/dashboard");
                },  
                onError: (error: Error) => {
                    console.error("Login failed:", error.message);
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