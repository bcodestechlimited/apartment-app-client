import tenantRoleImage from "@/assets/images/tenant-role.png";
import landlordRoleImage from "@/assets/images/landlord-role.png";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const navigate = useNavigate();

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
    // {
    //   name: "Agent",
    //   image: "/images/agent.jpg",
    // },
  ];

  const handleNext = () => {
    if (!selectedRole) {
      return toast.error("Please select a role");
    }

    if (selectedRole === "tenant") {
      navigate("/onboarding/tenant/setup-profile");
    } else if (selectedRole === "landlord") {
      navigate("/onboarding/landlord/get-started");
    }
  };

  return (
    <div className="">
      <div className="text-center mb-12">
        <h2 className="text-xl font-bold mb-2">
          Welcome to CitiLights Realty! What would you like to do?
        </h2>
        <p className="text-sm text-gray-600">
          Choose the role that best describes how you’d like to use the platform
        </p>
      </div>

      <div className="flex gap-2 md:gap-6">
        {roles.map((role) => (
          <div
            key={role.name}
            onClick={() => setSelectedRole(role.value)}
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

      <Button
        onClick={handleNext}
        disabled={!selectedRole}
        className="mt-6 cursor-pointer btn-primary"
      >
        Continue
      </Button>
    </div>
  );
}
