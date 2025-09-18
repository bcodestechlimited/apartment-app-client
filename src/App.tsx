import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import VerifyOtp from "./pages/auth/verify-otp";
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
import SignUp from "./pages/auth/sign-up";
import LandingPage from "./pages/public/landing-page";
import RoleSelection from "./pages/onboarding/role-selection";
import GetStarted from "./pages/onboarding/landlord/get-started";
import { PropertyOnboarding } from "./pages/onboarding/landlord/property-onboarding";
import OnboardingError from "./pages/onboarding/onboarding-error";
import LandlordLayout from "./layouts/dashboard/landlord-layout";
import Listings from "./pages/dashboard/landlord/listings";
import Bookings from "./pages/dashboard/landlord/bookings";
import Tenants from "./pages/dashboard/landlord/tenants";
import Payments from "./pages/dashboard/landlord/payments";
import Analytics from "./pages/dashboard/landlord/analytics";
import Messages from "./pages/dashboard/landlord/messages";
import SignIn from "./pages/auth/sign-in";
import LandlordProfile from "./pages/dashboard/landlord/profile";
import { LandlordAuthGuard, TenantAuthGuard } from "./guards/auth.guard";
import PaymentSummary from "./pages/dashboard/tenant/payment-summary";
import PropertyDetailLayout from "./layouts/property-detail-layout";
import PropertyOverview from "./pages/dashboard/shared/property-overview";
import PropertyDescription from "./pages/dashboard/shared/property-description";
import PropertyDetails from "./pages/dashboard/shared/property-details";
import PropertyAmenities from "./pages/dashboard/shared/property-amenities";
import PropertyLocation from "./pages/dashboard/shared/property-location";
import BookingLayout from "./pages/dashboard/landlord/_layouts/booking-layout";
import BookingRequests from "./pages/dashboard/landlord/booking-requests";
import TenantBookingLayout from "./pages/dashboard/tenant/_layouts/booking-layout";
import TenantBookings from "./pages/dashboard/tenant/bookings";
import TenantBookingRequests from "./pages/dashboard/tenant/booking-requests";
import TenantMessages from "./pages/dashboard/tenant/messages";
import TenantDocuments from "./pages/dashboard/tenant/documents";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    // Auth Routes
    {
      path: "/auth",
      element: <OnboardingLayout />,
      children: [
        {
          path: "sign-up",
          element: <SignUp />,
        },
        {
          path: "sign-in",
          element: <SignIn />,
        },
        {
          path: "verify-otp",
          element: <VerifyOtp />,
        },
      ],
    },
    // Onbaording Routes
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
          path: "/onboarding/landlord/property-onboarding",
          element: <PropertyOnboarding />,
        },
        {
          path: "/onboarding/*",
          element: <OnboardingError />,
        },
      ],
    },
    // Tenant Routes
    {
      path: "/dashboard",
      element: <TenantAuthGuard />,
      children: [
        {
          element: <TenantLayout />,
          children: [
            {
              path: "",
              element: <Explore />,
            },
            {
              path: "bookings",
              element: <TenantBookingLayout />,
              children: [
                {
                  path: "",
                  element: <TenantBookings />,
                },
                {
                  path: "requests",
                  element: <TenantBookingRequests />,
                },
              ],
            },
            {
              path: "explore",
              element: <Explore />,
            },
            {
              path: "property/:propertyId",
              element: <PropertyDetailLayout />,
              children: [
                {
                  path: "",
                  element: <PropertyOverview />,
                },
                {
                  path: "description",
                  element: <PropertyDescription />,
                },
                {
                  path: "details",
                  element: <PropertyDetails />,
                },
                {
                  path: "amenities",
                  element: <PropertyAmenities />,
                },
                {
                  path: "location",
                  element: <PropertyLocation />,
                },
              ],
            },
            {
              path: "documents",
              element: <TenantDocuments />,
            },
            {
              path: "messages",
              element: <TenantMessages />,
            },
            {
              path: "*",
              element: <div>Page not found</div>,
            },
          ],
        },
      ],
    },
    // Lanlord Routes
    {
      path: "dashboard/landlord",
      element: <LandlordAuthGuard />,
      children: [
        {
          element: <LandlordLayout />,
          children: [
            {
              path: "",
              element: <Listings />,
            },
            {
              path: "listings",
              element: <Listings />,
            },
            {
              path: "bookings",
              element: <BookingLayout />,
              children: [
                {
                  path: "",
                  element: <Bookings />,
                },
                {
                  path: "requests",
                  element: <BookingRequests />,
                },
              ],
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
              path: "profile",
              element: <LandlordProfile />,
            },
            {
              path: "property/:propertyId",
              element: <PropertyDetailLayout />,
              children: [
                {
                  path: "",
                  element: <PropertyOverview />,
                },
                {
                  path: "description",
                  element: <PropertyDescription />,
                },
                {
                  path: "details",
                  element: <PropertyDetails />,
                },
                {
                  path: "amenities",
                  element: <PropertyAmenities />,
                },
                {
                  path: "location",
                  element: <PropertyLocation />,
                },
              ],
            },
            {
              path: "*",
              element: <div>Page not found</div>,
            },
          ],
        },
      ],
    },
    // Public Routes
    {
      path: "property/:propertyId",
      element: <PropertyDetailLayout />,
      children: [
        {
          path: "",
          element: <PropertyOverview />,
        },
        {
          path: "description",
          element: <PropertyDescription />,
        },
        {
          path: "details",
          element: <PropertyDetails />,
        },
        {
          path: "amenities",
          element: <PropertyAmenities />,
        },
        {
          path: "location",
          element: <PropertyLocation />,
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
