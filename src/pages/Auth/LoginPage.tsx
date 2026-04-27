// src/pages/Auth/LoginPage.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Card } from "@/shared/ui/card";

import { useAuth } from "@/app/providers/AuthProvider";
import type { AuthUser } from "@/features/auth/types/auth.types";

const LoginPage = () => {
    const navigate = useNavigate();

    // ✅ Hooks MUST be here (top level)
    const { user, isLoading, login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ✅ Redirect if already logged in
    useEffect(() => {
        if (!isLoading && user) {
            navigate("/dashboard", { replace: true });
        }
    }, [user, isLoading, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        try {
            setIsSubmitting(true);

            // 🔁 Simulate API
            await new Promise((r) => setTimeout(r, 800));

            // ⚠️ Mock validation
            if (email !== "admin@test.com" || password !== "123456") {
                throw new Error("Invalid credentials");
            }

            const userData: AuthUser = {
                id: "1",
                email,
                roles: ["admin"],
            };

            // 🔥 Critical: update context (NOT localStorage directly)
            await login(userData);

            // 🔥 Navigate after state update
            navigate("/dashboard", { replace: true });

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Login failed");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
            <Card className="w-full max-w-md p-6">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold">Admin Login</h2>
                    <p className="text-sm text-muted-foreground">
                        Sign in to access dashboard
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@test.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}

                    {/* Submit */}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Signing in..." : "Sign in"}
                    </Button>
                </form>

                <div className="mt-4 text-center text-xs text-muted-foreground">
                    Demo: admin@test.com / 123456
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;