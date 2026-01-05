import React from "react";
import { Outlet, NavLink, useLocation } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";

const TabsList = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
    {children}
  </div>
);

const NavTab = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const location = useLocation();
  const isActive = location.pathname.includes(to);

  // Use conditional classes to mimic the active tab look
  const baseClasses =
    "py-1.5 px-4 text-sm font-medium rounded-md transition-colors";
  const activeClasses = "bg-white text-gray-900 shadow";
  const inactiveClasses = "text-muted-foreground hover:bg-gray-200";

  return (
    <NavLink
      to={to}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
    >
      {children}
    </NavLink>
  );
};

export default function AdminUserManagement() {
  const location = useLocation();
  const pathSegment = location.pathname.split("/").pop() || "users";
  const userType = pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1); // e.g., Tenants

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <nav>
          <TabsList>
            <NavTab to="tenants">Tenants</NavTab>
            <NavTab to="landlords">Landlords</NavTab>
            {/* <NavTab to="agents">Agents</NavTab> */}
          </TabsList>
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
