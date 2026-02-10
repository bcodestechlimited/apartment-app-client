import { authService } from "@/api/auth.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { images } from "@/constants/images";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import {
  ChevronDown,
  LogOut,
  Menu,
  User,
  Info,
  Home,
  Building2,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutMutation = useMutation({
    mutationFn: authService.logOut,
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to log out");
    },
  });

  const menuItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "About Us", href: "/about", icon: Info },
    { label: "For Tenants", href: "/tenants", icon: User },
    { label: "For Landlords", href: "/landlords", icon: Building2 },
  ];

  return (
    <div className="bg-custom-primary text-white sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-opacity-95">
      <nav className="flex items-center justify-between px-4  h-16 md:h-20 max-w-custom mx-auto">
        {/* LEFT: Logo & Mobile Hamburger */}
        <div className="flex items-center">
          <div className="md:hidden mr-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 rounded-full"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] p-0 border-r-0">
                <div className="flex flex-col h-full bg-white">
                  <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex justify-start">
                      <img
                        src={images.havenLeaseLogoGreen}
                        alt="Logo"
                        className="h-10 w-auto"
                      />
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 px-4 py-6 space-y-2">
                    {menuItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className={cn(
                          "flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium text-slate-600 hover:bg-slate-50 hover:text-custom-primary",
                          location.pathname === item.href &&
                            "bg-custom-primary/5 text-custom-primary",
                        )}
                      >
                        <item.icon size={20} />
                        {item.label}
                      </Link>
                    ))}
                  </div>

                  {!user && (
                    <div className="p-6 border-t bg-slate-50/50 space-y-3">
                      <Button
                        asChild
                        className="w-full rounded-full h-11"
                        variant="outline"
                      >
                        <Link to="/onboarding">Register</Link>
                      </Button>
                      <Button
                        asChild
                        className="w-full rounded-full h-11 bg-custom-primary"
                      >
                        <Link to="/login">Sign In</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hidden md:block">
            <Link to="/" className="flex items-center">
              <img
                src={images.havenLeaseLogoWhite}
                alt="HavenLease"
                className="h-10 w-auto md:h-12 object-contain"
              />
            </Link>
          </div>
        </div>

        {/* CENTER: Desktop Nav Links */}
        <div className="hidden md:flex items-center bg-white/10 px-2 py-1.5 rounded-full border border-white/5">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all",
                location.pathname === item.href
                  ? "bg-white text-custom-primary shadow-sm"
                  : "hover:text-white/80",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* RIGHT: User Profile / Auth */}
        <div className="flex items-center">
          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 p-1 md:pr-4 rounded-full bg-white/10 md:bg-white hover:bg-white/20 md:hover:bg-slate-50 transition-all border border-white/20 md:border-transparent group">
                  <Avatar className="h-8 w-8 md:h-9 md:w-9 border-2 border-transparent group-hover:border-custom-primary/20 transition-all">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-white text-custom-primary font-bold">
                      {user?.firstName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left leading-tight">
                    <p className="text-[13px] text-slate-900 font-bold">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter font-semibold">
                      {user?.roles}
                    </p>
                  </div>
                  <ChevronDown className="hidden md:block w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-56 mt-2 p-1.5 rounded-2xl shadow-xl border-slate-100"
                align="end"
              >
                <div className="px-3 py-2 border-b border-slate-50 mb-1">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Account
                  </p>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl h-10 px-3"
                  onClick={() => logoutMutation.mutate()}
                  disabled={logoutMutation.isPending}
                >
                  <LogOut size={16} />
                  <span className="font-medium">Logout</span>
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/onboarding"
                className="hidden sm:block text-sm font-medium hover:text-white/80"
              >
                Register
              </Link>
              <Button
                asChild
                className="rounded-full bg-white text-custom-primary hover:bg-slate-100 px-6 font-semibold h-9 md:h-10"
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
