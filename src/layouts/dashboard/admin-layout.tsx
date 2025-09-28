import { useState, type JSX } from "react";
import {
  Users,
  ChevronDown,
  Bell,
  Search,
  House,
  BookOpen,
  FileChartColumnIncreasing,
  Mail,
  LogOut,
  Settings,
  CreditCardIcon,
  ShieldAlert,
  ShieldAlertIcon,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { images } from "@/constants/images";
import { cn } from "@/lib/utils";
import { useSocketConnection } from "@/hooks/useSocketConnection";
import { useAuthStore } from "@/store/useAuthStore";
import { authService } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface Submenu {
  name: string;
  path: string;
  icon: JSX.Element;
}

interface Route {
  name: string;
  path: string;
  icon: JSX.Element;
  submenu?: Submenu[];
}

const routes: Route[] = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <House className="w-5 h-5" />,
  },
  {
    name: "User Management",
    path: "/admin/users",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    name: "Property Managment",
    path: "/admin/properties",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Verification & Compliance",
    path: "/admin/verifications",
    icon: <ShieldAlertIcon className="w-5 h-5" />,
  },
  {
    name: "Payments",
    path: "/admin/payments",
    icon: <CreditCardIcon className="w-5 h-5" />,
  },
  {
    name: "Analytics",
    path: "/admin/analytics",
    icon: <FileChartColumnIncreasing className="w-5 h-5" />,
  },
  {
    name: "Support",
    path: "/dashboard/landlord/messages",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    name: "Settings",
    path: "/dashboard/landlord/messages",
    icon: <Settings className="w-5 h-5" />,
  },
];

function AdminSideBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = (menuName: string) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const isActive = (path: string) =>
    location.pathname.toLowerCase().includes(path.toLowerCase());
  const isActiveMenu = (path: string) =>
    location.pathname.toLowerCase() === path.toLowerCase();
  const isActiveSubmenu = (path: string) =>
    location.pathname.toLowerCase() === path.toLowerCase();
  return (
    <aside
      className={cn(
        "min-w-64 max-w-68 h-screen bg-white border-r shadow-md flex flex-col justify-between"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 border-b">
        <img
          src={images.havenLeaseLogoGreen}
          alt="Haven Lease Logo"
          className="w-14 h-14 mx-auto"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 min-w-64 max-w-68">
        <ul className="space-y-2">
          {routes.map((route, index) => (
            <li key={index}>
              {route.submenu ? (
                <div>
                  {/* Parent menu with toggle */}
                  <Link
                    to={route.path}
                    className={cn(
                      "flex items-center justify-between w-full font-semibold p-2 hover:bg-custom-primary/20 text-gray-700 transition duration-300 ease-in-out",
                      isActive(route.path) &&
                        "bg-custom-primary/30 text-custom-primary border-l-4 border-custom-primary"
                    )}
                    onClick={() => toggleMenu(route.name)}
                  >
                    <div className="flex items-center space-x-3">
                      {route.icon}
                      <span className="text-sm">{route.name}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        openMenu === route.name ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </Link>

                  {/* Submenu */}
                  {openMenu === route.name && (
                    <ul className="mt-2 text-left space-y-2">
                      {route.submenu.map((submenu, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={submenu.path}
                            className={cn(
                              "flex items-center font-semibold text-xs space-x-3 p-2 ml-6 hover:bg-custom-primary/20 text-gray-700 transition duration-300 ease-in-out",
                              isActiveSubmenu(submenu.path) &&
                                "bg-custom-primary/30 text-custom-primary border-l-4 border-custom-primary"
                            )}
                          >
                            {/* {submenu.icon} */}
                            <span>{submenu.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  to={route.path}
                  className={cn(
                    "flex items-center font-semibold space-x-3 p-2 hover:bg-custom-primary/20 text-gray-700 transition duration-300 ease-in-out",
                    isActiveMenu(route.path) &&
                      "bg-custom-primary/30 text-custom-primary border-l-4 border-custom-primary"
                  )}
                >
                  {route.icon}
                  <span className="text-sm">{route.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

function TopBar() {
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const logoutMutation = useMutation({
    mutationFn: authService.logOut,
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/auth/sign-in", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to log out");
    },
  });

  return (
    <div className="flex justify-between p-4 bg-white  mb-4">
      <div className="flex items-center  rounded-full w-[700px] bg-[#F7F7F7] h-10">
        <Search className="w-5 h-5 text-gray-600 ml-3" />
        <Input
          placeholder="Search"
          className="border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none "
        />
      </div>

      <div className="flex items-center gap-2">
        <Bell className="w-6 h-6 text-gray-300 mr-3" />
        <div className="flex items-center cursor-pointer  px-3 py-2   gap-5 transition-colors">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-2 border px-4 py-2 rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors">
                <Avatar>
                  <AvatarImage
                    src={user?.avatar || "https://github.com/shadcn.png"}
                  />
                  <AvatarFallback>
                    {`${user?.firstName?.charAt(0) || "A"}${
                      user?.lastName?.charAt(0) || "A"
                    }`}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm  text-[#000000] text-[14px] font-[600] ">
                    {`${user?.firstName || "A"}${user?.lastName || "A"}`}
                  </p>
                  <p className="text-xs text-[#93A3AB]">Admin</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600 ml-2" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-50 mr-4">
              <div className="text-sm">
                <div className="grid gap-2">
                  {/* <div className="flex items-center justify-start gap-2">
                    <PenLine size={16} />
                    <Link to="/dashboard/admin/profile" className="w-full">
                      Edit profile
                    </Link>
                  </div> */}
                  <Button
                    disabled={logoutMutation.isPending}
                    onClick={() => logoutMutation.mutateAsync()}
                    className="text-red-700 flex justify-start border-0 ring-0 focus-visible:ring-0 focus:ring-0 bg-white shadow-none hover:bg-white cursor-pointer m-0 p-0 text-left w-full"
                  >
                    <LogOut size={16} className="text-red-700 p-0" />
                    Log out
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  useSocketConnection();

  return (
    <div className="flex h-screen">
      <AdminSideBar />
      <div className="flex-1 bg-white p-4">
        <TopBar />
        {/* <div className="w-full max-w-[1440px]"> */}
        <div className="w-full">
          <Breadcrumb />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
