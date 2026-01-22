import { authService } from "@/api/auth.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { images } from "@/constants/images";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { ChevronDown, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function Navbar() {
  const { user } = useAuthStore();

  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: authService.logOut,
    onSuccess: (response) => {
      toast.success(response.message);
      // console.log(reset);
      // reset();

      console.log("user after logout", user);
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to log out");
    },
  });

  return (
    <div className="bg-custom-primary text-white">
      <nav className="flex items-center justify-between px-4 py-2 max-w-custom">
        <Link to="/">
          <img
            src={images.havenLeaseLogoWhite}
            alt=""
            className="w-20 h-20 min-w-12"
          />
        </Link>
        <div className="flex space-x-4 text-sm">
          <Link to="/about" className="font-medium">
            About Us
          </Link>
          <a href="#" className="font-medium">
            For Tenants
          </a>
          <a href="about" className="font-medium">
            For Lanlords
          </a>
        </div>
        {user ? (
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
                        {`${user?.firstName || "A"} ${user?.lastName || "A"}`}
                      </p>
                      <p className="text-xs text-[#93A3AB]">{user?.roles}</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600 ml-2" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-50 mr-4">
                  <div className="text-sm">
                    <div className="grid gap-2">
                      {/* <div className="flex items-center justify-start gap-2">
                    <PenLine size={16} />
                    <Link to="/dashboard/landlord/profile" className="w-full">
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
        ) : (
          <div className="flex items-center space-x-4 font-semibold text-sm">
            <Link to={"/onboarding"} className="font-medium">
              Register
            </Link>
            <Link
              to={"/login"}
              className="px-6 py-1.5 text-custom-primary bg-white rounded-full hover:bg-gray-200"
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
}
