import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function VerifyOtp() {
  return (
    <div className="bg-custom-primary flex flex-col justify-center items-center px-4">
      <div className="flex flex-col items-center w-full max-w-sm text-center">
        <h2 className="text-white text-base font-semibold mb-1">
          Enter OTP and verify your email
        </h2>
        <p className="text-sm text-white/80 mb-4">
          We've sent a 6-digit code to your email. Please enter it below to
          continue
        </p>

        <Input
          placeholder="Enter OTP"
          className="mb-3 bg-white/10 border-white/30 text-white placeholder-white/70"
        />

        <Link to="/onboarding/setup-profile" className="w-full">
          <Button className="w-full mb-3 bg-white text-custom-primary cursor-pointer">
            Verify OTP
          </Button>
        </Link>

        <p className="text-white/70 text-sm">
          Didn’t get OTP?{" "}
          <button className="text-white underline font-medium hover:opacity-80 cursor-pointer">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
