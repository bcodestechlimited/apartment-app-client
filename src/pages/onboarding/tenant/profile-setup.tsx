import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

export default function ProfileSetup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }>();

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    console.log(data);
    navigate("/onboarding/tenant/verify-identity");
  };

  return (
    <div className=" bg-white flex flex-col gap-12 justify-center items-center px-4 w-full max-w-sm mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-3">
        <div>
          <Input
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
            })}
            placeholder="Enter your first name"
            className={cn(
              "bg-white border border-gray-300 placeholder:text-gray-400",
              {
                "border-red-500": errors.firstName,
              }
            )}
          />

          {errors.firstName && (
            <span className="text-sm text-red-500 text-end block pt-1">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div>
          <Input
            {...register("lastName", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              },
            })}
            placeholder="Enter your last name"
            className={cn(
              "bg-white border border-gray-300 placeholder:text-gray-400",
              {
                "border-red-500": errors.lastName,
              }
            )}
          />
          {errors.lastName && (
            <span className="text-sm text-red-500 text-end block pt-1">
              {errors.lastName.message}
            </span>
          )}
        </div>
        <div>
          <Input
            {...register("phoneNumber", {
              required: "Phone number is required",
              minLength: {
                value: 10,
                message: "Phone number must be at least 10 characters",
              },
              maxLength: {
                value: 11,
                message: "Phone number must be at most 11 characters",
              },
              pattern: {
                value: /^[0-9]+$/,
                message: "Phone number must be numeric",
              },
            })}
            placeholder="Enter your phone number"
            className={cn(
              "bg-white border border-gray-300 placeholder:text-gray-400",
              {
                "border-red-500": errors.phoneNumber,
              }
            )}
          />
          {errors.phoneNumber && (
            <span className="text-sm text-red-500 text-end block pt-1">
              {errors.phoneNumber.message}
            </span>
          )}
        </div>

        <Button className="w-full bg-custom-primary text-white hover:opacity-90 cursor-pointer">
          Continue
        </Button>
      </form>
    </div>
  );
}
