import { authService } from "@/api/auth.api";
import { useQuery } from "@tanstack/react-query";

export const useAuthUser = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authService.getUser(),
    retry: false,
  });
};
