import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthLoader } from "@/components/custom/loader";
import { authService } from "@/api/auth.api";

export const AuthGuard = () => {
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
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export const LandlordAuthGuard = () => {
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
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  if (!user?.roles?.includes("landlord")) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return <Outlet />;
};

export const TenantAuthGuard = () => {
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
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  if (!user?.roles?.includes("tenant")) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return <Outlet />;
};
