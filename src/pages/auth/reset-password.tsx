/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { toast } from "sonner";
import { CustomAlert } from "@/components/custom/custom-alert";
import { useAuthActions, useAuthStore } from "@/store/useAuthStore";
import { Spinner } from "@/components/custom/loader";
import { images } from "@/constants/images";
import { Separator } from "@/components/ui/separator";

interface ResetPasswordFormInputs {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const { setAuthCredentials } = useAuthActions();
  const authCredentials = useAuthStore((state) => state.authCredentials);
  const storedEmail = authCredentials?.email || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ResetPasswordFormInputs>({
    defaultValues: {
      email: storedEmail,
      token: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully!");
      setAuthCredentials(null);
      navigate("/login");
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Failed to reset password";
      setError(errorMessage);
      toast.error(errorMessage);
      console.log(error);
    },
  });

  const onSubmit = (data: ResetPasswordFormInputs) => {
    setError(null);

    if (!data.email || data.email.trim() === "") {
      setError("Email is required");
      return;
    }

    if (!data.token || data.token.trim() === "") {
      setError("Token is required");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    mutation.mutateAsync({
      email: data.email,
      otp: data.token,
      password: data.password,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-custom-primary min-h-screen w-full">
      <div className="w-full max-w-2xl flex flex-col items-center justify-center gap-2">
        <Link to="/">
          <img
            src={images.havenLeaseLogoWhite}
            alt=""
            className="w-20 h-20 min-w-12"
          />
        </Link>
        <h2 className="text-white text-lg md:text-2xl font-semibold mb-1 text-center">
          Reset Password
        </h2>
        <p className="text-sm text-white/80 mb-4 text-center">
          Enter the token sent to your email and create a new password
        </p>

        <Separator className="my-4 bg-white/20 data-[orientation=horizontal]:w-[80%]" />

        {/* ---- ShadCN Form ---- */}
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
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/70 w-full border rounded-full py-5 px-5"
                    />
                  </FormControl>
                  <FormMessage className="text-end text-xs" />
                </FormItem>
              )}
            />

            {/* Token Field */}
            <FormField
              control={form.control}
              name="token"
              rules={{
                required: "Token is required",
                minLength: {
                  value: 1,
                  message: "Please enter a valid token",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter the token from your email"
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/70 w-full border rounded-full py-5 px-5"
                    />
                  </FormControl>
                  <FormMessage className="text-end text-xs" />
                </FormItem>
              )}
            />

            {/* Password Field with Eye Toggle */}
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
                        placeholder="Enter your new password"
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
                  <FormMessage className="text-end text-xs" />
                </FormItem>
              )}
            />

            {/* Confirm Password Field with Eye Toggle */}
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
                        placeholder="Confirm your password"
                        className="bg-white/10 border-white/30 text-white placeholder:text-white/70 w-full border rounded-full py-5 px-5"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
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
                  <FormMessage className="text-end text-xs" />
                </FormItem>
              )}
            />

            {/* Error Message */}
            {error && <CustomAlert variant="destructive" message={error} />}

            {/* Submit Button */}
            <Button
              disabled={mutation.isPending || !form.formState.isValid}
              type="submit"
              className="w-full bg-white text-custom-primary hover:bg-white/80 cursor-pointer rounded-full"
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center">
                  <Spinner /> Resetting...
                </span>
              ) : (
                "Reset Password"
              )}
            </Button>

            <p className="text-white">
              Remember your password?{" "}
              <Link to="/login" className="underline">
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
