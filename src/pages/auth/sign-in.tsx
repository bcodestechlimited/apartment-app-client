import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import googleIconImage from "@/assets/images/google-icon.png";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();

  const mutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data: IUser) => {
      if (data.roles.includes("tenant")) {
        return navigate("/dashboard");
      } else if (data.roles.includes("landlord")) {
        return navigate("/dashboard/landlord");
      }

      navigate("/dashboard"); // or wherever you redirect after login
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

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
        variant="outline"
        className="w-full mb-3 bg-transparent text-white border-white cursor-pointer"
      >
        <img src={googleIconImage} alt="Google" className="w-4 h-4" />
        Continue with Google
      </Button>

      <p className="text-white/60 text-sm mb-3">Or</p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="mb-3">
          <Input
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email address"
            className={cn(
              "bg-white/10 border-white/30 text-white placeholder-white/70 w-full border",
              {
                "border-error": errors.email,
                "border-white/30": !errors.email,
              }
            )}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-end text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <Input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Enter your password"
            className={cn(
              "bg-white/10 border-white/30 text-white placeholder-white/70 w-full border",
              {
                "border-error": errors.password,
                "border-white/30": !errors.password,
              }
            )}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-end text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          disabled={mutation.isPending}
          type="submit"
          className="w-full bg-white text-custom-primary cursor-pointer"
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
    </div>
  );
}
