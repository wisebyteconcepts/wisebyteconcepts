import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextValue, AuthUser } from "@/features/auth/types/auth.types";

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const stored = localStorage.getItem("user");

                if (stored) {
                    const parsed: AuthUser = JSON.parse(stored);
                    setUser(parsed);
                }
            } catch (err) {
                console.error("Auth init failed:", err);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    // ✅ Derived roles (no duplicate state)
    const roles = user?.roles ?? [];

    // ✅ Implement signOut properly
    const signOut = async () => {
        try {
            localStorage.removeItem("user");
        } catch (err) {
            console.error("Sign out failed:", err);
        } finally {
            // 🔥 Critical: clear state immediately
            setUser(null);
        }
    };

    const login = async (userData: AuthUser) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData); // 🔥 THIS is what you're missing
    };

    return (
        <AuthContext.Provider value={{ user, roles, isLoading, signOut, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};