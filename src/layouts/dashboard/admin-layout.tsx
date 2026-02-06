import { type JSX } from "react";
import {
  Users,
  ChevronDown,
  Bell,
  House,
  BookOpen,
  LogOut,
  CreditCardIcon,
  ShieldAlertIcon,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { images } from "@/constants/images";
import { cn } from "@/lib/utils";
import { useSocketConnection } from "@/hooks/useSocketConnection";
import { useAuthStore } from "@/store/useAuthStore";
import { authService } from "@/api/auth.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { systemSettingsService } from "@/api/admin/system-settings.api";

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
    path: "/dashboard/admin",
    icon: <House className="w-5 h-5" />,
  },
  {
    name: "User Management",
    path: "/dashboard/admin/users",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    name: "Property Managment",
    path: "/dashboard/admin/properties",
    icon: <Users className="w-5 h-5" />,
  },
  {
    name: "Verification & Compliance",
    path: "/dashboard/admin/verifications",
    icon: <ShieldAlertIcon className="w-5 h-5" />,
  },
  {
    name: "Payments",
    path: "/dashboard/admin/payments",
    icon: <CreditCardIcon className="w-5 h-5" />,
  },
  // {
  //   name: "Analytics",
  //   path: "/dashboard/admin/analytics",
  //   icon: <FileChartColumnIncreasing className="w-5 h-5" />,
  // },
  // {
  //   name: "Messages",
  //   path: "dashboard/admin/messages",
  //   icon: <Mail className="w-5 h-5" />,
  // },
  // {
  //   name: "Support",
  //   path: "/dashboard/admin/support",
  //   icon: <Headset className="w-5 h-5" />,
  // },
  // {
  //   name: "Settings",
  //   path: "dashboard/admin/settings",
  //   icon: <Settings className="w-5 h-5" />,
  // },
];

function AdminSidebar() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname.toLowerCase() === path.toLowerCase();

  return (
    <Sidebar collapsible="icon">
      {/* Logo / header */}
      <SidebarHeader className="border-b ">
        <Link to="/" className="flex items-center justify-center ">
          <img
            src={images.havenLeaseLogoGreen}
            alt="Haven Lease Logo"
            className="w-15 h-15"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Admin</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {routes.map((route) => (
                <SidebarMenuItem key={route.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(route.path)}
                    tooltip={route.name} // shown when collapsed
                  >
                    <Link
                      to={route.path}
                      className={cn(
                        "flex items-center gap-2",
                        isActive(route.path) &&
                          "bg-custom-primary/20 text-custom-primary",
                      )}
                    >
                      {route.icon}
                      <span className="text-sm">{route.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* Optional footer items (e.g., settings) */}
      </SidebarFooter>

      {/* Rail shown when collapsed */}
      <SidebarRail />
    </Sidebar>
  );
}

function TopBar() {
  const navigate = useNavigate();

  const { user } = useAuthStore();
  // const { reset } = useAuthActions();

  const logoutMutation = useMutation({
    mutationFn: authService.logOut,
    onSuccess: (response) => {
      toast.success(response.message);
      // reset();
      navigate("/auth/sign-in", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to log out");
    },
  });

  return (
    <div className="flex items-center justify-between pt-1 pb-0.5   border-b bg-white mb-4 sticky top-0 z-10">
      <div className="pl-3">
        <SidebarTrigger />
      </div>

      <div className="flex items-center">
        <Bell className="w-6 h-6 text-gray-300" />
        <div className="flex items-center cursor-pointer px-3 py-2 gap-5 transition-colors">
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

  const settingsQuery = useQuery({
    queryKey: ["settings"],
    queryFn: () => systemSettingsService.getSettings(),
  });
  const settings = settingsQuery.data;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <main className="flex-1 ">
          {/* Trigger to collapse/expand sidebar */}
          {/* <div className="flex items-center justify-between mb-2"></div> */}

          <TopBar />

          <div className="w-full mb-12  ">
            <Breadcrumb />
            <Outlet context={settings} />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
