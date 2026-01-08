import { authService } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import googleIconImage from "@/assets/images/google-icon.png";
import { useLocation, useNavigate } from "react-router";
import { CustomAlert } from "./custom-alert";

export default function GoogleAuthButton() {
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
    mutationFn: (role: string) => authService.loginWithGoogle(role),
    onSuccess: (data) => {
      return (window.location.href = data.redirectURL);
      // Centered popup window logic
      // const width = 500;
      // const height = 600;
      // const left = window.screenX + (window.outerWidth - width) / 2;
      // const top = window.screenY + (window.outerHeight - height) / 2;

      // const popup = window.open(
      //   data.redirectURL,
      //   "GoogleAuth",
      //   `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
      // );

      // if (popup) {
      //   popupRef.current = popup;
      //   console.log("Popup opened successfully");

      //   // Focus the popup window
      //   popup.focus();
      // } else {
      //   setError("Popup was blocked. Please allow popups for this site.");
      // }
    },

    onError: (error: any) => {
      // toast.error(error.message || "Something went wrong");
      setError(error.message || "Something went wrong");
      console.log(error);
    },
  });

  return (
    <div className="w-full">
      <Button
        onClick={() => googleMutation.mutateAsync(role)}
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
