import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const options = [
  "Standard rental",
  "Short let",
  "Serviced apartment",
  "Shared apartment",
  "Co-working space",
  "Other",
];

export default function SelectProperty() {
  const [selectedProperty, setSelectedProperty] = useState<string>("");

  const navigate = useNavigate();

  const handleNext = () => {
    if (!selectedProperty) {
      return toast.error("Please select a property type");
    }
    if (selectedProperty === "Co-working space") {
      return navigate("/onboarding/landlord/property-onboarding/workspace");
    }

    navigate("/onboarding/landlord/property-onboarding");
  };

  return (
    <div className="flex flex-col gap-4">
      <h1>Please select your property type</h1>
      <div className="grid grid-cols-3 gap-4">
        {options.map((option) => (
          <div
            className={cn(
              "border p-6 rounded-lg cursor-pointer transition-colors duration-300 font-semibold text-custom-primary/70",
              option === selectedProperty
                ? "bg-custom-primary text-white"
                : "border-custom-primary/20"
            )}
            key={option}
            onClick={() => setSelectedProperty(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <Link to="/onboarding/landlord/get-started">
          <Button className="px-14 cursor-pointer">Back</Button>
        </Link>
        <Button className="px-14 cursor-pointer" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}
