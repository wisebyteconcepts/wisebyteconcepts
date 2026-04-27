// auth.types.ts

export type Role = "admin" | "editor" | "viewer"; // adjust to your system

export interface AuthUser {
    id: string;
    email: string;
    roles: Role[];
}

export interface AuthContextValue {
    user: AuthUser | null;
    roles: Role[];
    isLoading: boolean;

    login: (user: AuthUser) => Promise<void>;
    signOut: () => Promise<void>;
}