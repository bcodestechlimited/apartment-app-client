import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import VerifyOtp from "./pages/onboarding/verify-otp";
import {
  OnboardingLayout,
  OnboardingLayoutLight,
} from "./layouts/onboarding-layout";
import MultiStepForm from "./layouts/multi-step-layout";
import ProfileSetup from "./pages/onboarding/tenant/profile-setup";
import VerifyIdentity from "./pages/onboarding/tenant/verify-identity";
import LookingFor from "./pages/onboarding/tenant/looking-for";
import TenantLayout from "./layouts/dashboard/tenant-layout";
import Explore from "./pages/dashboard/tenant/explore";
import SignUp from "./pages/onboarding/sign-up";
import LandingPage from "./pages/public/landing-page";
import RoleSelection from "./pages/onboarding/role-selection";
import GetStarted from "./pages/onboarding/landlord/get-started";
import SelectProperty from "./pages/onboarding/landlord/select-property";
import {
  PropertyOnboarding,
  PropertyOnboardingWorkSpace,
} from "./pages/onboarding/landlord/property-onboarding";
import OnboardingError from "./pages/onboarding/onboarding-error";
import LandlordLayout from "./layouts/dashboard/landlord-layout";
import Listings from "./pages/dashboard/landlord/listings";
import Bookings from "./pages/dashboard/landlord/bookings";
import Tenants from "./pages/dashboard/landlord/tenants";
import Payments from "./pages/dashboard/landlord/payments";
import Analytics from "./pages/dashboard/landlord/analytics";
import Messages from "./pages/dashboard/landlord/messages";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/auth",
      element: <OnboardingLayout />,
      children: [
        {
          path: "sign-up",
          element: <SignUp />,
        },
        {
          path: "verify-otp",
          element: <VerifyOtp />,
        },
      ],
    },
    {
      element: <OnboardingLayoutLight />,
      children: [
        {
          path: "/onboarding/role-selection",
          element: <RoleSelection />,
        },
        {
          element: <MultiStepForm />,
          children: [
            {
              path: "/onboarding/tenant/setup-profile",
              element: <ProfileSetup />,
            },
            {
              path: "/onboarding/tenant/verify-identity",
              element: <VerifyIdentity />,
            },
            {
              path: "/onboarding/tenant/looking-for",
              element: <LookingFor />,
            },
          ],
        },
        {
          path: "/onboarding/landlord/get-started",
          element: <GetStarted />,
        },
        {
          path: "/onboarding/landlord/select-property",
          element: <SelectProperty />,
        },
        {
          path: "/onboarding/landlord/property-onboarding",
          element: <PropertyOnboarding />,
        },
        {
          path: "/onboarding/landlord/property-onboarding/workspace",
          element: <PropertyOnboardingWorkSpace />,
        },
        {
          path: "/onboarding/*",
          element: <OnboardingError />,
        },
      ],
    },
    {
      path: "/dashboard",
      children: [
        {
          element: <TenantLayout />,
          children: [
            {
              path: "",
              element: <Explore />,
            },
            {
              path: "explore",
              element: <Explore />,
            },
            {
              path: "onboarding/verify-identity",
              element: <VerifyIdentity />,
            },
            {
              path: "onboarding/looking-for",
              element: <LookingFor />,
            },
            {
              path: "*",
              element: <div>Page not found</div>,
            },
          ],
        },
        {
          path: "landlord",
          element: <LandlordLayout />,
          children: [
            {
              path: "",
              element: <Listings />,
            },
            {
              path: "bookings",
              element: <Bookings />,
            },
            {
              path: "tenants",
              element: <Tenants />,
            },
            {
              path: "payments",
              element: <Payments />,
            },
            {
              path: "analytics",
              element: <Analytics />,
            },
            {
              path: "messages",
              element: <Messages />,
            },
            {
              path: "*",
              element: <div>Page not found</div>,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <div>Page not found</div>,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
