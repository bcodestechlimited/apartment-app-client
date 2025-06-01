import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthLoader } from "@/components/custom/loader";
import { authService } from "@/api/auth.api";

export default function AuthGuard() {
  const location = useLocation();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authService.getUser(),
    retry: false,
  });

  if (isLoading) {
    return <AuthLoader />;
  }

  if (isError || !user) {
    return <Navigate to="/client/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
