import { Outlet, useNavigate } from "react-router";
import {
  Users,
  ChevronDown,
  CreditCard,
  House,
  BookOpen,
  FileChartColumnIncreasing,
  Mail,
  PenLine,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router";
import { useState, type JSX } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { useSocketConnection } from "@/hooks/useSocketConnection";
import { images } from "@/constants/images";

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
    name: "My Listings",
    path: "/dashboard/landlord",
    icon: <House className="w-5 h-5" />,
  },
  {
    name: "Bookings",
    path: "/dashboard/landlord/bookings",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    name: "Tenants",
    path: "/dashboard/landlord/tenants",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Payments",
    path: "/dashboard/landlord/payments",
    icon: <CreditCard className="w-5 h-5" />,
  },
  // {
  //   name: "Analytics",
  //   path: "/dashboard/landlord/analytics",
  //   icon: <FileChartColumnIncreasing className="w-5 h-5" />,
  // },
  {
    name: "Messages",
    path: "/dashboard/landlord/messages",
    icon: <Mail className="w-5 h-5" />,
  },
];

function LandlordSideBar() {
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
        "min-w-42 max-w-44 h-screen bg-white border-r shadow-md flex flex-col justify-between"
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
      <nav className="flex-1 p-4 min-w-42 max-w-44">
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
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to log out");
    },
  });

  return (
    <div className="flex justify-end bg-white">
      <div className="flex items-center gap-2">
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
                  <p className="text-xs text-[#93A3AB]">Landlord</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-600 ml-2" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-50 mr-4">
              <div className="text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center justify-start gap-2">
                    <PenLine size={16} />
                    <Link to="/dashboard/landlord/profile" className="w-full">
                      Edit profile
                    </Link>
                  </div>
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

export default function LandlordLayout() {
  useSocketConnection();

  return (
    <div className="flex min-h-screen">
      <LandlordSideBar />
      <div className="flex-1 flex flex-col gap-2 bg-white p-4">
        <TopBar />
        {/* <div className="w-full max-w-[1440px]"> */}
        <div className="w-full mb-12">
          <Breadcrumb />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
