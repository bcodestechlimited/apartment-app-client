// src/components/PropertyDispatcher.tsx
import { Navigate, useParams, useLocation } from "react-router";
import { useAuthUser } from "@/hooks/useAuthUser";
import { AuthLoader } from "@/components/custom/loader";
import { useAuthStore } from "@/store/useAuthStore";

export const PropertyDispatcher = () => {
  const { id } = useParams(); // Get the property ID from the URL
  const location = useLocation();
  const { data: user, isLoading } = useAuthUser();
  if (isLoading) {
    return <AuthLoader />;
  }
  console.log("userin property dispatcher", user);

  // 1. Handle Unauthenticated Users
  // If they aren't logged in, send them to login, but keep the 'from' state
  // so they are sent back to this dispatcher after logging in.
  if (!user) {
    return <Navigate to={`/property/${id}`} replace />;
  }

  // 2. Handle Routing Based on Role
  const roles = user.roles || [];

  if (roles.includes("admin")) {
    return <Navigate to={`/dashboard/admin/property/${id}`} replace />;
  }

  if (roles.includes("landlord")) {
    return <Navigate to={`/dashboard/landlord/property/${id}`} replace />;
  }

  if (roles.includes("tenant")) {
    // Assuming the tenant route is generic or specific
    return <Navigate to={`/dashboard/property/${id}`} replace />;
  }

  // 3. Fallback for users with no valid role or unknown roles
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Unknown Role</h2>
      <p>We could not determine the correct view for your account.</p>
    </div>
  );
};
