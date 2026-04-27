import { useMutation } from "@tanstack/react-query";
import { login } from "../services/auth.service";
import type { LoginPayload } from "../types/auth.types";

export const useLogin = () => {
    return useMutation({
        mutationFn: ({ email, password }: LoginPayload) =>
            login(email, password),
    });
};