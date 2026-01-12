import { Navigate, Outlet, useLocation } from "react-router";
import { AuthLoader } from "@/components/custom/loader";
import { useAuthUser } from "@/hooks/useAuthUser";

export const AuthGuard = () => {
  const location = useLocation();

  const { data: user, isLoading, isError } = useAuthUser();

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

  const { data: user, isLoading } = useAuthUser();
  // console.log("landlord guard user", user);

  if (isLoading) {
    return <AuthLoader />;
  }

  if (!user) {
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

  const { data: user, isLoading } = useAuthUser();

  if (isLoading) {
    return <AuthLoader />;
  }

  if (!user) {
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

export const AdminAuthGuard = () => {
  const location = useLocation();

  const { data: user, isLoading } = useAuthUser();

  if (isLoading) {
    return <AuthLoader />;
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" state={{ from: location }} replace />;
  }

  if (!user?.roles?.includes("admin")) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h2>Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return <Outlet />;
};
