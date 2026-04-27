import { useQuery } from "@tanstack/react-query";
import { getSession } from "../api/auth.api";

export const useSession = () => {
    return useQuery({
        queryKey: ["auth", "session"],
        queryFn: getSession,
    });
};
