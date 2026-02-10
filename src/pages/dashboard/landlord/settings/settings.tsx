import { NavLink, Outlet, useLocation } from "react-router";
import { motion } from "motion/react";

const settingsLinks = [
  { name: "Personal Info", path: "" },
  { name: "Employment", path: "employment" },
  { name: "Documents", path: "documents" },
  { name: "Next of Kin", path: "next-of-kin" },
  { name: "Guarantor", path: "guarantor" },
  { name: "Notification", path: "notification" },
];

export default function SettingsLayout() {
  const location = useLocation();

  return (
    <div className="space-y-4 p-2">
      {/* Top Navigation Bar */}
      <aside className="relative flex justify-between border-b w-85 md:w-full overflow-x-auto md:overflow-x-hidden">
        {settingsLinks.map((link) => {
          const isActive =
            location.pathname.endsWith(link.path) ||
            (link.path === "" && location.pathname.endsWith("/settings"));

          return (
            <NavLink
              key={link.path || "root"}
              to={link.path}
              end
              className="relative px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary whitespace-nowrap md:whitespace-normal"
            >
              {link.name}
              {isActive && (
                <motion.div
                  layoutId="settings-active-indicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-custom-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </aside>

      {/* Outlet Content */}
      <div className=" ">
        <div className="  w-full  flex justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
