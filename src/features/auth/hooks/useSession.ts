import { useQuery } from "@tanstack/react-query";
import { getSession } from "../services/auth.service";

export const useSession = () => {
    return useQuery({
        queryKey: ["auth", "session"],
        queryFn: getSession,
    });
};