import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Spinner } from "@/components/custom/loader";
import { useAuthActions } from "@/store/useAuthStore";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import GoogleAuthButton from "@/components/custom/google-auth-button";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { CustomAlert } from "@/components/custom/custom-alert";
import { images } from "@/constants/images";

interface SignUpFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export default function LandlordSignup() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setAuthCredentials } = useAuthActions();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignUpFormInputs>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange", // Enable live validation to control button disabled state
  });

  /** --- Mutation for Register --- */
  const mutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success("Registration successful");
      navigate("/auth/verify-otp");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    },
  });

  /** --- Submit Handler --- */
  const onSubmit = (data: SignUpFormInputs) => {
    const { confirmPassword, ...payload } = data; // exclude confirmPassword before sending
    setAuthCredentials({
      email: data.email,
      password: data.password,
    });
    mutation.mutateAsync(payload);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-custom-primary min-h-screen">
      <div className="w-full max-w-2xl flex flex-col items-center p-4">
        <Link to="/">
          <img
            src={images.havenLeaseLogoWhite}
            alt=""
            className=" min-w-12 w-20 h-20 md:w-28 md:w-h-28 "
          />
        </Link>
        <h2 className="text-white text-lg font-semibold mb-1 text-center">
          Create Your Landlord Account
        </h2>
        <p className="text-sm text-white/80 mb-4 text-center">
          Join Havenlease to explore verified apartments and co-working spaces
          with flexible rent and secure bookings
        </p>

        {/* Google Auth Button */}
        <GoogleAuthButton />

        <Separator className="my-4 bg-white/20 data-[orientation=horizontal]:w-[80%] " />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              {/* First Name Field */}
              <FormField
                control={form.control}
                name="firstName"
                rules={{
                  required: "First Name is required",
                  minLength: {
                    value: 2,
                    message: "First Name must be at least 2 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start gap-1">
                    <Label className="text-white">First Name</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter first name"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/70 w-full border rounded-full py-5 px-5"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-end" />
                  </FormItem>
                )}
              />

              {/* Last Name Field */}
              <FormField
                control={form.control}
                name="lastName"
                rules={{
                  required: "Last Name is required",
                  minLength: {
                    value: 2,
                    message: "Last Name must be at least 2 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start gap-1">
                    <Label className="text-white">Last Name</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter last name"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/70 w-full border rounded-full py-5 px-5"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-end" />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start gap-1">
                    <Label className="text-white">Email</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your email address"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/70 w-full border rounded-full py-5 px-5"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-end" />
                  </FormItem>
                )}
              />

              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phoneNumber"
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^(\+\d{1,3}[- ]?)?\d{10}$/, // Regular expression for phone number validation
                    message: "Please enter a valid phone number",
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start gap-1">
                    <Label className="text-white">Phone Number</Label>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your phone number"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/70 w-full border rounded-full py-5 px-5"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-end" />
                  </FormItem>
                )}
              />

              {/* Password Field with Toggle */}
              <FormField
                control={form.control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start gap-1">
                    <Label className="text-white">Create a password</Label>
                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="bg-white/10 border-white/30 text-white placeholder:text-white/70 w-full border rounded-full py-5 px-5"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5 cursor-pointer" />
                          ) : (
                            <Eye className="w-5 h-5 cursor-pointer" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm text-end" />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field with Toggle */}
              <FormField
                control={form.control}
                name="confirmPassword"
                rules={{
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === form.getValues("password") ||
                    "Passwords do not match",
                }}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start gap-1">
                    <Label className="text-white">Confirm password</Label>

                    <FormControl>
                      <div className="relative w-full">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm password"
                          className="bg-white/10 border-white/30 text-white placeholder:text-white/70 w-full border rounded-full py-5 px-5"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5 cursor-pointer" />
                          ) : (
                            <Eye className="w-5 h-5 cursor-pointer" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm text-end" />
                  </FormItem>
                )}
              />
            </div>

            {/* Error Message */}
            {error && <CustomAlert variant="destructive" message={error} />}

            <div className="flex items-center gap-2 my-2 px-2 ">
              <Checkbox />{" "}
              <p className="text-white text-sm text-start">
                By signing up now, you agree to our{" "}
                <Link to="#" className="underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="#" className="underline">
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!form.formState.isValid || mutation.isPending}
              className={cn(
                "w-full bg-white text-custom-primary cursor-pointer transition col-span-2 rounded-full",
                {
                  "opacity-50 cursor-not-allowed":
                    !form.formState.isValid || mutation.isPending,
                }
              )}
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center">
                  <Spinner /> Loading...
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>

            <p className="text-white">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
