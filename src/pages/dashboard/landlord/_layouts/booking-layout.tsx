import { Link, Outlet, useLocation } from "react-router";
import { cn } from "@/lib/utils";

export default function BookingLayout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const activeClassNames = "border-b-3 border-orange-500";

  return (
    <div>
      <div className="flex gap-2 font-semibold mb-2">
        <Link
          to="/dashboard/landlord/bookings"
          className={cn(
            `py-0.5`,
            isActive("/dashboard/landlord/bookings") && activeClassNames
          )}
        >
          History
        </Link>
        <Link
          to="/dashboard/landlord/bookings/requests"
          className={cn(
            `py-0.5`,
            isActive("/dashboard/landlord/bookings/requests") &&
              activeClassNames
          )}
        >
          Requests
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
