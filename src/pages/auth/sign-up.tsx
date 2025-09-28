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
import googleIconImage from "@/assets/images/google-icon.png";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Spinner } from "@/components/custom/loader";
import { useAuthActions } from "@/store/useAuthStore";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import GoogleAuthButton from "@/components/custom/google-auth-button";

interface SignUpFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
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
    <div className="flex flex-col items-center w-full max-w-sm">
      <h2 className="text-white text-lg font-semibold mb-1 text-center">
        Welcome to HavenLease
      </h2>
      <p className="text-sm text-white/80 mb-4 text-center">
        Start your journey to finding a home
      </p>

      {/* Google Auth Button */}
      <GoogleAuthButton />

      <p className="text-white/60 text-sm mb-3">Or</p>

      {/* --- ShadCN Form --- */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
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
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your email address"
                    className="bg-white/10 border-white/30 text-white placeholder-white/70 w-full border"
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
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="bg-white/10 border-white/30 text-white placeholder-white/70 w-full border pr-10"
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
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm password"
                      className="bg-white/10 border-white/30 text-white placeholder-white/70 w-full border pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white focus:outline-none"
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
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

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!form.formState.isValid || mutation.isPending}
            className={cn(
              "w-full bg-white text-custom-primary cursor-pointer transition",
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
              "Continue"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
