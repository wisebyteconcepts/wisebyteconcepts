import { useContext, createContext, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean; 
  logout: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string): boolean => {
    // Admin password - in production, this would be handled by a backend
    const ADMIN_PASSWORD = "admin@123";
    if (password === ADMIN_PASSWORD) {
      const newToken = Math.random().toString(36).substr(2);
      localStorage.setItem("admin_token", newToken);
      setToken(newToken);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
