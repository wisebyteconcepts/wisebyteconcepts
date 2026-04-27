import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import type { LoginPayload } from "../types/auth.types";

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ email, password }: LoginPayload) =>
            login(email, password),
    });
};
