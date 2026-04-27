import { createContext, useContext, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AppRole = "admin" | "moderator" | "user";

interface AuthContextValue {
    user: User | null;
    session: Session | null;
    roles: AppRole[];
    isAdmin: boolean;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
    user: null,
    session: null,
    roles: [],
    isAdmin: false,
    loading: true,
    signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<AppRole[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRoles = async (userId: string) => {
        const { data, error } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", userId);
        if (error) {
            console.error("Failed to fetch roles:", error.message);
            setRoles([]);
            return;
        }
        setRoles((data ?? []).map((r) => r.role as AppRole));
    };

    useEffect(() => {
        // Set up listener FIRST
        const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user ?? null);
            if (!newSession?.user) {
                setRoles([]);
            } else {
                // Defer role fetch to avoid deadlock inside auth callback
                setTimeout(() => fetchRoles(newSession.user.id), 0);
            }
            setLoading(false);
        });

        // THEN check existing session
        supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
            setSession(existingSession);
            setUser(existingSession?.user ?? null);
            if (existingSession?.user) {
                fetchRoles(existingSession.user.id);
            }
            setLoading(false);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    const isAdmin = roles.includes("admin");

    return (
        <AuthContext.Provider value={{ user, session, roles, isAdmin, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);