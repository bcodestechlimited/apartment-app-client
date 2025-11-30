import { Outlet, useNavigate } from "react-router";
import {
  ChevronDown,
  Compass,
  BookOpenCheck,
  HandCoins,
  Mail,
  Search,
  Bell,
  LogOut,
  Settings,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";
import { useState, type JSX } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useSocketConnection } from "@/hooks/useSocketConnection";
import { images } from "@/constants/images";

interface Submenu {
  name: string;
  path: string;
  //   icon: JSX.Element;
}

interface Route {
  name: string;
  path: string;
  icon: JSX.Element;
  submenu?: Submenu[];
}

const routes: Route[] = [
  {
    name: "Explore",
    path: "/dashboard",
    icon: <Compass className="w-4 h-4" />,
    submenu: [
      {
        name: "Saved Properties",
        path: "/dashboard/explore/saved-properties",
        // icon: <Compass className="w-4 h-4" />,
      },
    ],
  },
  {
    name: "Bookings",
    path: "/dashboard/bookings",
    icon: <BookOpenCheck className="w-4 h-4" />,
    // submenu: [],
  },
  {
    name: "Payments",
    path: "/dashboard/payments",
    icon: <HandCoins className="w-4 h-4" />,
    // submenu: [],
  },
  {
    name: "Wallet",
    path: "/dashboard/wallet",
    icon: <Wallet className="w-4 h-4" />,
    // submenu: [],
  },

  {
    name: "Messages",
    path: "/dashboard/messages",
    icon: <Mail className="w-4 h-4" />,
    // submenu: [],
  },
  {
    name: "Settings",
    path: "/dashboard/settings",
    icon: <Settings className="w-4 h-4" />,
    // submenu: [],
  },
];

function TenantSideBar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const location = useLocation();

  const toggleMenu = (menuName: string) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const isActive = (path: string) =>
    location.pathname.toLowerCase().includes(path.toLowerCase());
  const isActiveSubmenu = (path: string) =>
    location.pathname.toLowerCase() === path.toLowerCase();

  return (
    <aside
      className={cn(
        "min-w-46 h-screen bg-white border-r shadow-md flex flex-col justify-between"
      )}
    >
      {/* Logo Section */}
      <div className="p-4">
        <img
          src={images.havenLeaseLogoGreen}
          alt="Haven Lease Logo"
          className="w-14 h-14 mx-auto"
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {routes.map((route, index) => (
            <li key={index}>
              {route.submenu ? (
                <div>
                  {/* Parent menu with toggle */}
                  <Link
                    to={route.path}
                    className={cn(
                      "flex items-center justify-between w-full font-semibold p-2 hover:bg-gray-100 text-gray-700",
                      isActive(route.path) &&
                        "bg-gray-200 text-gray-900 border-l-4 border-custom-primary"
                    )}
                    onClick={() => toggleMenu(route.name)}
                  >
                    <div className="flex items-center space-x-3">
                      {route.icon}
                      <span>{route.name}</span>
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
                              "flex items-center font-semibold text-xs space-x-3 p-2 ml-6 hover:bg-gray-100 text-gray-600",
                              isActiveSubmenu(submenu.path) &&
                                "bg-gray-200 text-gray-900 border-l-4 border-black"
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
                    "flex items-center font-semibold space-x-3 p-2 hover:bg-gray-100 text-gray-700",
                    isActive(route.path) &&
                      "bg-gray-200 text-gray-900 border-l-4 border-black"
                  )}
                >
                  {route.icon}
                  <span>{route.name}</span>
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
      navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to log out");
    },
  });

  return (
    <div className="grid items-center justify-end p-4 bg-white mb-4">
      <div className="flex items-center justify-end gap-2">
        {/* <Bell className="w-6 h-6 text-gray-300 mr-3" /> */}
        <div className="flex items-center cursor-pointer px-2 gap-5 transition-colors">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-4 border px-2 py-2 rounded-full bg-white shadow-sm hover:bg-custom-primary/10 transition-colors">
                <div className="flex items-center gap-2">
                  <Avatar className="">
                    <AvatarImage
                      src={user?.avatar || "https://github.com/shadcn.png"}
                    />
                    <AvatarFallback className="bg-custom-primary text-white">
                      {`${user?.firstName?.charAt(0) || "A"}${
                        user?.lastName?.charAt(0) || "A"
                      }`}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-xs text-[#000000] font-[600] ">
                      {`${user?.firstName || "A"} ${user?.lastName || "A"}`}
                    </p>
                    <p className="text-xs text-[#93A3AB]">tenant</p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600 ml-2" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-50 mr-4">
              <div className="text-sm">
                <div className="grid gap-2">
                  {/* <div className="flex items-center justify-start gap-2">
                    <PenLine size={16} />
                    <Link to="/dashboard/profile" className="w-full">
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

export default function TenantLayout() {
  useSocketConnection();

  return (
    <div className="flex min-h-screen">
      <TenantSideBar />
      <div className="flex-1 bg-white p-4">
        <TopBar />
        <div className="w-full max-w-[1440px] mb-12">
          <Breadcrumb />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
