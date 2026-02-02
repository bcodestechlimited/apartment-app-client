/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { toast } from "sonner";
import { CustomAlert } from "@/components/custom/custom-alert";
import { useAuthActions } from "@/store/useAuthStore";
import { Spinner } from "@/components/custom/loader";
import { images } from "@/constants/images";
import { Separator } from "@/components/ui/separator";

interface ForgotPasswordFormInputs {
  email: string;
}

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { setAuthCredentials } = useAuthActions();

  const form = useForm<ForgotPasswordFormInputs>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: authService.forgotPassword,
    onSuccess: () => {
      toast.success("Password reset link sent to your email");
      setAuthCredentials({
        email: form.getValues("email"),
        password: "",
      });
      navigate("/reset-password");
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = (data: ForgotPasswordFormInputs) => {
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
          Forgot Password?
        </h2>
        <p className="text-sm text-white/80 mb-4 text-center">
          Enter your email address and we'll send you a token to reset your
          password
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

            {/* Submit Button */}
            <Button
              disabled={mutation.isPending || !form.formState.isValid}
              type="submit"
              className="w-full bg-white text-custom-primary hover:bg-white/80 cursor-pointer rounded-full"
            >
              {mutation.isPending ? (
                <span className="flex items-center justify-center">
                  <Spinner /> Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </Button>

            <p className="text-white">
              Remember your password?{" "}
              <Link to="/auth/sign-in" className="underline">
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
