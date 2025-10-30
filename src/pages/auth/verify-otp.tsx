import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthActions, useAuthStore } from "@/store/useAuthStore";

const RESEND_COOLDOWN_MS = 2 * 60 * 1000; // 2 minutes

export default function VerifyOtp() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const authCredentials = useAuthStore((state) => state.authCredentials);
  const { setAuthCredentials } = useAuthActions();
  const email = authCredentials?.email || "";
  const password = authCredentials?.password || "";

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Compute remaining cooldown time
  useEffect(() => {
    const lastResend = localStorage.getItem("lastResendTime");
    if (lastResend) {
      const timePassed = Date.now() - parseInt(lastResend, 10);
      const remaining = RESEND_COOLDOWN_MS - timePassed;
      if (remaining > 0) {
        setTimeLeft(remaining);
      }
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1000) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const resendMutation = useMutation({
    mutationFn: authService.resendOTP,
    onSuccess: () => {
      localStorage.setItem("lastResendTime", Date.now().toString());
      setTimeLeft(RESEND_COOLDOWN_MS);
      toast.success("OTP resent successfully!");
      setSuccess("OTP resent successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    },
  });

  const verifyMutation = useMutation({
    mutationFn: authService.verifyOTP,
    onSuccess: async () => {
      toast.success("Email verified successfully!");

      try {
        const signInResponse = await authService.signIn({ email, password });
        setAuthCredentials(null);
        const { user } = signInResponse;
        if (user && user?.roles?.includes("tenant")) {
          navigate("/dashboard");
        } else if (user && user?.roles?.includes("landlord")) {
          navigate("/dashboard/landlord");
        } else {
          navigate("/dashboard/admin");
        }
      } catch (error) {
        console.error(error);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Invalid OTP");
      console.error(error);
    },
  });

  const handleResend = () => {
    console.log("Resending OTP for email:", email);
    console.log("Time left for resend:", timeLeft);

    if (!email || email.trim() === "" || email === "null") return;
    if (timeLeft <= 0) {
      resendMutation.mutate({ email });
    }
  };

  const handleVerify = () => {
    console.log("Verifying OTP:", { otp, email });

    if (!otp || otp.length !== 4) {
      toast.error("Please enter the 4-digit OTP");
      return;
    }

    if (!email || email.trim() === "" || email === "null") {
      return navigate("/auth/sign-in");
    }
    verifyMutation.mutateAsync({ email, otp });
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-custom-primary flex flex-col justify-center items-center px-4 min-h-screen">
      <div className="flex flex-col items-center w-full max-w-lg text-center">
        <h2 className="text-white text-lg font-semibold mb-1 text-center">
          Enter OTP and verify to your email
        </h2>
        <p className="text-sm text-white/80 mb-4">
          We've sent a 4-digit code to your email. Please enter it below to
          continue
        </p>

        <InputOTP maxLength={4} value={otp} onChange={setOtp}>
          <InputOTPGroup className="my-4">
            <InputOTPSlot index={0} className="text-white" />
            <InputOTPSlot index={1} className="text-white" />
            <InputOTPSlot index={2} className="text-white" />
            <InputOTPSlot index={3} className="text-white" />
          </InputOTPGroup>
        </InputOTP>

        <Button
          className="w-full mb-3 bg-white text-custom-primary cursor-pointer rounded-full font-light"
          onClick={handleVerify}
          disabled={verifyMutation.isPending}
        >
          {verifyMutation.isPending ? "Verifying..." : "Verify OTP"}
        </Button>

        <p className="text-white/70 text-sm">
          Didn’t get an OTP?{" "}
          {resendMutation.isPending ? (
            "Resending..."
          ) : timeLeft > 0 ? (
            <span className="text-white font-medium pl-1">
              Resend in {formatTime(timeLeft)}
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="text-white underline font-medium hover:opacity-80 cursor-pointer pl-1"
            >
              Resend
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
