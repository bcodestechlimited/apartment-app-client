import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import googleIconImage from "@/assets/images/google-icon.png";
import { Link } from "react-router";

export default function SignUp() {
  return (
    <div className="flex flex-col items-center w-full max-w-sm">
      <h2 className="text-white text-lg font-semibold mb-1 text-center">
        Welcome to CitiLights
      </h2>
      <p className="text-sm text-white/80 mb-4 text-center">
        Start your journey to finding a home
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

      <form action="" className="w-full">
        <Input
          placeholder="Enter your email address"
          className="mb-3 bg-white/10 border-white/30 text-white placeholder-white/70 w-full"
        />

        <Link to="/auth/verify-otp">
          <Button className="w-full bg-white text-custom-primary cursor-pointer">
            Continue
          </Button>
        </Link>
      </form>
    </div>
  );
}
