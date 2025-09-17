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
import googleIconImage from "@/assets/images/google-icon.png";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Spinner } from "@/components/custom/loader";
import { useAuthActions } from "@/store/useAuthStore";
import type { IUser } from "@/interfaces/user.interface";

interface SignInFormInputs {
  email: string;
  password: string;
}

export default function SignIn() {
  const navigate = useNavigate();
  const { setAuthCredentials } = useAuthActions();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SignInFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /** ---- Mutations ---- */
  const mutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data: IUser) => {
      if (data.roles.includes("tenant")) {
        return navigate("/dashboard");
      } else if (data.roles.includes("landlord")) {
        return navigate("/dashboard/landlord");
      }
      navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    },
  });

  const googleMutation = useMutation({
    mutationFn: authService.loginWithGoogle,
    onSuccess: (data) => {
      window.location.href = data.redirectURL;
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
      console.log(error);
    },
  });

  /** ---- Submit Handler ---- */
  const onSubmit = (data: SignInFormInputs) => {
    setAuthCredentials({
      email: data.email,
      password: data.password,
    });
    mutation.mutateAsync(data);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm">
      <h2 className="text-white text-lg font-semibold mb-1 text-center">
        Welcome Back
      </h2>
      <p className="text-sm text-white/80 mb-4 text-center">
        Sign in to your account to continue
      </p>

      {/* Google Auth Button */}
      <Button
        onClick={() => googleMutation.mutateAsync()}
        disabled={googleMutation.isPending}
        variant="outline"
        className="w-full mb-3 bg-transparent text-white border-white cursor-pointer"
      >
        <img src={googleIconImage} alt="Google" className="w-4 h-4" />
        Continue with Google
      </Button>

      <p className="text-white/60 text-sm mb-3">Or</p>

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
                    className="bg-white/10 border-white/30 text-white placeholder-white/70 w-full border"
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
                <FormMessage className="text-end text-xs" />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            disabled={mutation.isPending}
            type="submit"
            className="w-full bg-white text-custom-primary hover:bg-white/80 cursor-pointer"
          >
            {mutation.isPending ? (
              <span className="flex items-center justify-center">
                <Spinner /> Loading...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
