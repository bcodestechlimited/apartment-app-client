import tenantRoleImage from "@/assets/images/tenant-role.png";
import landlordRoleImage from "@/assets/images/landlord-role.png";
import { use, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { CustomAlert } from "@/components/custom/custom-alert";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { useAuthStore } from "@/store/useAuthStore";

export default function AuthRoleSelection() {
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const navigate = useNavigate();

  // console.log({ data });

  const updateRoleMutation = useMutation({
    mutationFn: (selectedRole: string) =>
      authService.updateUser({ roles: selectedRole ? [selectedRole] : [] }),
    onSuccess: (data) => {
      const user = data.user;
      if (user && user.roles) {
        console.log("user roles", user.roles);
        if (user.roles.includes("landlord")) {
          console.log("navigate to landlord dashboard");
          return navigate("/dashboard/landlord");
        }
        if (user.roles.includes("tenant")) {
          return navigate("/dashboard/");
        }

        if (user.roles.includes("admin")) {
          navigate("/dashboard/admin");
        }
      }
    },
  });

  // navigate("/dashboard");

  const roles = [
    {
      name: "Tenant",
      value: "tenant",
      image: tenantRoleImage,
    },
    {
      name: "Landlord",
      value: "landlord",
      image: landlordRoleImage,
    },
  ];

  const handleRoleSelection = (role: string) => {
    setError(null);
    setSelectedRole(role);
  };

  const handleNext = async () => {
    console.log({ selectedRole });

    if (!selectedRole) {
      return setError("Please select a role");
    }

    updateRoleMutation.mutateAsync(selectedRole);
    return;
  };

  return (
    <div className=" flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-xl font-bold mb-2">
          Welcome to HavenLease! What would you like to do?
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Choose the role that best describes how you'd like to use the platform
        </p>
      </div>

      <div className="flex gap-2 md:gap-6">
        {roles.map((role) => (
          <div
            key={role.name}
            onClick={() => handleRoleSelection(role.value)}
            className={cn(
              "relative overflow-hidden border-4 border-red-500 shadow-md cursor-pointer transition-all duration-200",
              {
                "border-custom-primary": selectedRole === role.value,
                "border-transparent": selectedRole !== role.value,
              }
            )}
          >
            <img
              src={role.image}
              alt={role.name}
              className="w-full h-80 object-cover"
            />
          </div>
        ))}
      </div>

      <div className="pt-4">
        {error && <CustomAlert variant="destructive" message={error} />}
      </div>
      <Button
        disabled={!selectedRole || updateRoleMutation.isPending}
        onClick={handleNext}
        className="mt-6 cursor-pointer btn-primary"
      >
        Continue
      </Button>
    </div>
  );
}
