import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

export default function ProfileSetup() {
  const form = useFormContext<{
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
    <div className="bg-white flex flex-col gap-12 justify-center items-center px-4 w-full max-w-sm mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            rules={{
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your first name"
                    className={cn(
                      "bg-white border border-gray-300 placeholder:text-gray-400",
                      {
                        "border-red-500": form.formState.errors.firstName,
                      }
                    )}
                  />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            rules={{
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your last name"
                    className={cn(
                      "bg-white border border-gray-300 placeholder:text-gray-400",
                      {
                        "border-red-500": form.formState.errors.lastName,
                      }
                    )}
                  />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            rules={{
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
            }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your phone number"
                    className={cn(
                      "bg-white border border-gray-300 placeholder:text-gray-400",
                      {
                        "border-red-500": form.formState.errors.phoneNumber,
                      }
                    )}
                  />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-custom-primary text-white hover:opacity-90 cursor-pointer"
          >
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
