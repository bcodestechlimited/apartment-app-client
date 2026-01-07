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
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { Link, useNavigate } from "react-router";
import { Spinner } from "@/components/custom/loader";
import { useAuthActions } from "@/store/useAuthStore";
import type { IUser } from "@/interfaces/user.interface";
import { CustomAlert } from "@/components/custom/custom-alert";
import GoogleAuthButton from "@/components/custom/google-auth-button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { images } from "@/constants/images";

interface SignInFormInputs {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { setAuthCredentials } = useAuthActions();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<SignInFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /** ---- Mutations ---- */
  const mutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data: { user: IUser }) => {
      const { user } = data;
      if (user && user.roles) {
        if (user && !user.isEmailVerified) {
          console.log("email not verified", user);
          return navigate("/auth/verify-otp");
        }
        if (user.roles.includes("admin")) {
          return navigate("/dashboard/admin");
        } else if (user.roles.includes("landlord")) {
          console.log("landlord");
          return navigate("/dashboard/landlord");
        }
      }

      //Tenant
      navigate("/dashboard");
    },
    onError: (error: any) => {
      // toast.error(error.message || "Something went wrong");
      setError(error.message || "Something went wrong");
      console.log("login error", error);
    },
  });

  /** ---- Submit Handler ---- */
  const onSubmit = (data: SignInFormInputs) => {
    console.log("Form data:", data);
    setError(null);
    setAuthCredentials({
      email: data.email,
      password: data.password,
    });
    mutation.mutateAsync(data);
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
          Welcome Back
        </h2>
        <p className="text-sm text-white/80 mb-4 text-center">
          Login to your account to continue
        </p>

        {/* Google Auth Button */}
        <GoogleAuthButton />
        <Separator className="my-4 bg-white/20 data-[orientation=horizontal]:w-[80%] " />

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

            {/* Password Field with Eye Toggle */}
            <FormField
              control={form.control}
              name="password"
              rules={{
                required: "Password is required",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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

            {/* Error Message */}
            {error && <CustomAlert variant="destructive" message={error} />}

            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2 my-2 ">
                <Checkbox /> <p className="text-white text-sm">Remember me</p>
              </div>
              <Link
                className="underline text-sm text-white"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              disabled={mutation.isPending || !form.formState.isValid}
              type="submit"
              className="w-full bg-white text-custom-primary hover:bg-white/80 cursor-pointer rounded-full"
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center">
                  <Spinner /> Loading...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>

            <p className="text-white">
              Don't have an account yet?{" "}
              <Link to="/onboarding" className="underline">
                Create One now
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
