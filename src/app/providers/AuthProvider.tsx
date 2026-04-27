import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/core/api/supabase";

type AuthContextType = {
    user: any;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);