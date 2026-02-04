import { authService } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import googleIconImage from "@/assets/images/google-icon.png";
import { useLocation, useNavigate } from "react-router";
import { CustomAlert } from "./custom-alert";

interface GoogleAuthButtonProps {
  redirect?: string;
}

export default function GoogleAuthButton({ redirect }: GoogleAuthButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const popupRef = useRef<Window | null>(null);

  const location = useLocation();

  let role = "";
  if (location.pathname.includes("onboarding/tenant")) {
    role = "tenant";
  }
  if (location.pathname.includes("onboarding/landlord")) {
    role = "landlord";
  }

  const navigate = useNavigate();

  const googleMutation = useMutation({
    mutationFn: (params: { role?: string; redirect?: string }) =>
      authService.loginWithGoogle(params),
    onSuccess: (data) => {
      return (window.location.href = data.redirectURL);
    },

    onError: (error: any) => {
      setError(error.message || "Something went wrong");
    },
  });

  return (
    <div className="w-full">
      <Button
        onClick={() => googleMutation.mutateAsync({ role, redirect })}
        disabled={googleMutation.isPending}
        variant="outline"
        className="w-full mb-3 bg-transparent text-gray-300 border-white/40 cursor-pointer rounded-full"
      >
        <img src={googleIconImage} alt="Google" className="w-4 h-4" />
        Continue with Google
      </Button>

      {error && <CustomAlert variant="destructive" message={error} />}
    </div>
  );
}
