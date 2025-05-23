import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  "Standard rental",
  "Short let",
  "Serviced apartment",
  "Shared apartment",
  "Lekki",
  "Yaba",
  "Ikoyi",
  "Oniru",
  "Short term",
  "Long term",
  "Monthly",
  "Daily",
];

export default function LookingFor() {
  const {
    register,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const [preferences, setPreferences] = useState<string[]>([]);

  // const selectedValues = getValues("preferences") || [];

  const toggleSelection = (value: string) => {
    console.log({ preferences, value });
    clearErrors("preferences");

    if (!preferences.includes(value)) {
      setPreferences((prev) => [...prev, value]);
    } else {
      setPreferences((prev) => prev.filter((item) => item !== value));
    }
  };

  const onSubmit = (data: any) => {
    console.log("Submitted");

    if (preferences.length < 1) {
      return setError("preferences", {
        message: "Please select at least one option",
      });
    }
    
    setValue("preferences", preferences);
    // console.log("Selected:", data.preferences);
    // handle logic or navigation
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="hidden" {...register("preferences")} />

      <div className="flex flex-wrap gap-6 w-[90%] max-w-[700px] mx-auto">
        {OPTIONS.map((option) => (
          <Button
            type="button"
            key={option}
            value={option}
            aria-label={option}
            className={cn(
              "px-4 py-2 bg-white border rounded-full border-custom-primary text-custom-primary inline-block cursor-pointer hover:bg-custom-primary/80 hover:text-white",
              preferences.includes(option) && "bg-custom-primary text-white"
            )}
            onClick={() => toggleSelection(option)}
            data-state={preferences.includes(option) ? "on" : "off"}
          >
            {option}
          </Button>
        ))}
      </div>

      {/* <ToggleGroup
        type="multiple"
        className="flex-wrap gap-6 w-[700px]"
        value={selectedValues}
        onValueChange={(val) => setValue("preferences", val)}
      >
        {OPTIONS.map((option) => (
          <ToggleGroupItem
            key={option}
            value={option}
            aria-label={option}
            className="px-4 py-2 bg-amber-300 inline-block cursor-pointer  "
            onClick={() => toggleSelection(option)}
            data-state={selectedValues.includes(option) ? "on" : "off"}
          >
            {option}
          </ToggleGroupItem>
        ))}
      </ToggleGroup> */}

      {errors?.preferences?.message && (
        <p className="text-red-500">{errors?.preferences?.message as string}</p>
      )}

      <Button type="submit" className="w-full max-w-sm cursor-pointer">
        Continue
      </Button>
    </form>
  );
}
