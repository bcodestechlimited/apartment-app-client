import { Outlet } from "react-router";
import {
  Users,
  ChevronDown,
  CreditCard,
  Bell,
  Search,
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
import { Input } from "@/components/ui/input";
import cityLightsLogo from "@/assets/images/citylights-logo-main-light.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

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
    path: "/dashboard/landlord/listings",
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
  {
    name: "Analytics",
    path: "/dashboard/landlord/analytics",
    icon: <FileChartColumnIncreasing className="w-5 h-5" />,
  },
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
        "w-54 h-screen bg-white border-r shadow-md flex flex-col justify-between"
      )}
    >
      {/* Logo Section */}
      <div className="p-4">
        <img
          src={cityLightsLogo}
          alt="CityLights Logo"
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

// function TopBar() {
//   return (
//     <div className="flex items-center justify-between p-4">
//       <div className="flex items-center space-x-4">
//         <div className="flex items-center space-x-2 ">
//           <Input className="" />
//         </div>
//       </div>
//     </div>
//   );
// }

function TopBar() {
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
          <div className="leading-12 w-10 h-10 bg-[#004542] rounded-full flex items-center justify-center text-white font-bold text-3xl">
            A
          </div>
          <div className="text-left">
            <p className="text-sm  text-[#000000] text-[14px] font-[600] ">
              Alicia Larsen
            </p>
            <p className="text-xs text-[#93A3AB]">Landlord</p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <ChevronDown className="w-4 h-4 text-gray-600 ml-2" />
            </PopoverTrigger>
            <PopoverContent className="w-50 mr-10 mt-8">
              <div className="  text-sm">
                <div className="grid gap-2">
                  <div className="flex items-center justify-start gap-2">
                    <PenLine size={16} />
                    <Link to="/dashboard/landlord/profile" className="w-full">
                      Edit profile
                    </Link>
                  </div>
                  <div className="flex gap-2 justify-start items-center">
                    <LogOut size={16} className="text-red-700" />
                    <Button className="text-red-700 border-0 bg-white shadow-none hover:bg-white cursor-pointer m-0 p-0 text-left justify-start w-fit">
                      Log out
                    </Button>
                  </div>
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
  return (
    <div className="flex h-screen">
      <LandlordSideBar />
      <div className="flex-1 bg-white p-4">
        <TopBar />
        <div className="w-full max-w-[1440px]">
          <Breadcrumb />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
