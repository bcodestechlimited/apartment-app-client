import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import VerifyOtp from "./pages/auth/verify-otp";
import { OnboardingLayout } from "./layouts/onboarding-layout";
import TenantLayout from "./layouts/dashboard/tenant-layout";
import Explore from "./pages/dashboard/tenant/explore";
import SignUp from "./pages/auth/sign-up";
import LandingPage from "./pages/public/landing-page/landing-page";
import RoleSelection from "./pages/onboarding/role-selection";
import OnboardingError from "./pages/onboarding/onboarding-error";
import LandlordLayout from "./layouts/dashboard/landlord-layout";
import Listings from "./pages/dashboard/landlord/listings";
import Bookings from "./pages/dashboard/landlord/bookings";
import Tenants from "./pages/dashboard/landlord/tenants";
import Analytics from "./pages/dashboard/landlord/analytics";
import Messages from "./pages/dashboard/landlord/messages";
import SignIn from "./pages/auth/sign-in";
import LandlordProfile from "./pages/dashboard/landlord/profile";
import {
  AdminAuthGuard,
  AuthGuard,
  LandlordAuthGuard,
  TenantAuthGuard,
} from "./guards/auth.guard";
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
import About from "./pages/public/about/about";
import AdminLayout from "./layouts/dashboard/admin-layout";
import AdminDashboard from "./pages/dashboard/admin/admin-dashboard/admin-dashboard";
import Admin404 from "./pages/dashboard/admin/admin-404";
import AdminUserManagement from "./pages/dashboard/admin/admin-user-management/admin-user-management";
import AdminPropertyManagement from "./pages/dashboard/admin/admin-property-management/admin-property-management";
import AdminPropertyDetail from "./pages/dashboard/admin/admin-property-detail/admin-property-detail";
import AdminMessages from "./pages/dashboard/admin/admin-messages/admin-messages";
import Settings from "./pages/dashboard/tenant/settings/settings";
import LandlordSettings from "./pages/dashboard/landlord/settings/settings";
import PersonalInfo from "./pages/dashboard/tenant/settings/_components/personal-info";
import Employement from "./pages/dashboard/tenant/settings/_components/employment";
import Documents from "./pages/dashboard/tenant/settings/_components/documents";
import NextOfKin from "./pages/dashboard/tenant/settings/_components/next-of-kin";
import Guarantor from "./pages/dashboard/tenant/settings/_components/guarantor";
import Notification from "./pages/dashboard/tenant/settings/_components/notification";
import PropertySearch from "./pages/public/property-search/property-search";
import LandLordPersonalInfo from "./pages/dashboard/landlord/settings/_components/personal-info";
import LandLordEmployement from "./pages/dashboard/landlord/settings/_components/employment";
import LandLordDocuments from "./pages/dashboard/landlord/settings/_components/documents";
import LandLordNextOfKin from "./pages/dashboard/landlord/settings/_components/next-of-kin";
import LandLordGuarantor from "./pages/dashboard/landlord/settings/_components/guarantor";
import LandLordNotification from "./pages/dashboard/landlord/settings/_components/notification";

import PublicLayout from "./pages/public/_layouts/public-layout";
import LandlordSignup from "./pages/onboarding/landlord-signup";
import Login from "./pages/auth/login";
import TenantSignup from "./pages/onboarding/tenant-signup";
import TenantPayments from "./pages/dashboard/tenant/payments/payments";
import PublicPropertyDetail from "./pages/public/public-property-detail/public-property-detail";
import LandlordPayments from "./pages/dashboard/landlord/payments";
import Wallet from "./pages/dashboard/tenant/wallet/Wallet";
import LandlordWallet from "./pages/dashboard/landlord/wallet/Wallet";
import LandlordPaymentVerification from "./pages/dashboard/landlord/wallet/PaymentVerification";
import SavedProperties from "./pages/dashboard/tenant/saved-properties";
import { TenantPage } from "./pages/dashboard/admin/admin-user-management/_components/tenant-page";
// import { AgentPage } from "./pages/dashboard/admin/admin-user-management/_components/agent-page";
import { LandlordPage } from "./pages/dashboard/admin/admin-user-management/_components/landlord-page";
import { TenantDetailPage } from "./pages/dashboard/admin/admin-user-management/pages/tenant-detail-page";
import { AdminDocumentVerification } from "./pages/dashboard/admin/admin-document-verification/document-verification";
import { LandlordDetailPage } from "./pages/dashboard/admin/admin-user-management/pages/landlord-detail-page";
import { AdminPaymentsPage } from "./pages/dashboard/admin/admin-payments/payments";
import PaymentVerification from "./pages/dashboard/tenant/wallet/PaymentVerification";
import ForgotPassword from "./pages/auth/forgot-password";
import ResetPassword from "./pages/auth/reset-password";
import TermsAndConditions from "./pages/public/terms-page/terms";
import PrivacyPolicy from "./pages/public/privacy-policy-page/privacy";
import ContactUs from "./pages/public/contact/contact";
import AuthRoleSelection from "./pages/onboarding/auth-role-selection";
import AddPropertyPage from "./pages/dashboard/landlord/add-property";
import { PropertyDispatcher } from "./pages/shared/property-dispatcher";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    // Public Routes
    {
      element: <PublicLayout />,
      children: [
        {
          path: "",
          element: <LandingPage />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <ContactUs />,
        },
        {
          path: "properties",
          element: <PropertySearch />,
        },
        {
          path: "property/:propertyId",
          element: <PublicPropertyDetail />,
        },
        {
          path: "terms",
          element: <TermsAndConditions />,
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />,
        },
      ],
    },
    // Auth Routes
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
    },
    // Onboarding Routes
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
    // Onboarding Routes
    {
      path: "onboarding",
      children: [
        {
          index: true,
          element: <RoleSelection />,
        },
        {
          path: "google",
          element: <AuthGuard />,
          children: [
            {
              index: true,
              element: <AuthRoleSelection />,
            },
          ],
        },
        {
          path: "tenant",
          element: <TenantSignup />,
        },
        {
          path: "landlord",
          element: <LandlordSignup />,
        },
        {
          path: "verify-otp",
          element: <VerifyOtp />,
        },
        {
          path: "*",
          element: <OnboardingError />,
        },
      ],
    },
    // {
    //   path: "property",
    //   element: <PublicPropertyLayout />, // <-- Outer Layout
    //   children: [
    //     {
    //       path: ":propertyId",
    //       element: <PropertyDetailLayout />, // <-- Inner Layout
    //       children: [
    //         {
    //           path: "",
    //           element: <PropertyOverview />,
    //         },
    //         {
    //           path: "description",
    //           element: <PropertyDescription />,
    //         },
    //         {
    //           path: "details",
    //           element: <PropertyDetails />,
    //         },
    //         {
    //           path: "amenities",
    //           element: <PropertyAmenities />,
    //         },
    //         {
    //           path: "location",
    //           element: <PropertyLocation />,
    //         },
    //       ],
    //     },
    //   ],
    // },

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
              path: "explore/saved-properties",
              element: <SavedProperties />,
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
              path: "wallet",
              element: <Wallet />,
            },
            {
              path: "paystack/verify",
              element: <PaymentVerification />,
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
              path: "payments",
              element: <TenantPayments />,
            },
            {
              path: "messages",
              element: <TenantMessages />,
            },
            {
              path: "settings",
              element: <Settings />,
              children: [
                {
                  path: "",
                  element: <PersonalInfo />,
                },
                {
                  path: "employment",
                  element: <Employement />,
                },
                {
                  path: "documents",
                  element: <Documents />,
                },
                {
                  path: "next-of-kin",
                  element: <NextOfKin />,
                },
                {
                  path: "guarantor",
                  element: <Guarantor />,
                },
                {
                  path: "notification",
                  element: <Notification />,
                },
                {
                  path: "*",
                  element: <div>Page not found</div>,
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
              path: "add-property",
              element: <AddPropertyPage />,
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
              element: <LandlordPayments />,
            },
            {
              path: "analytics",
              element: <Analytics />,
            },
            {
              path: "paystack/verify",
              element: <LandlordPaymentVerification />,
            },
            {
              path: "wallet",
              element: <LandlordWallet />,
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
              path: "settings",
              element: <LandlordSettings />,
              children: [
                {
                  path: "",
                  element: <LandLordPersonalInfo />,
                },
                {
                  path: "documents",
                  element: <Documents />,
                },
                {
                  path: "notification",
                  element: <Notification />,
                },
                {
                  path: "next-of-kin",
                  element: <LandLordNextOfKin />,
                },
                {
                  path: "guarantor",
                  element: <LandLordGuarantor />,
                },
                {
                  path: "employment",
                  element: <LandLordEmployement />,
                },
                {
                  path: "*",
                  element: <div>Page not found</div>,
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
    //Admin Routes
    {
      path: "dashboard/admin",
      element: <AdminAuthGuard />,
      children: [
        {
          element: <AdminLayout />,
          children: [
            {
              path: "",
              element: <AdminDashboard />,
            },
            {
              path: "users",
              element: <AdminUserManagement />,
              children: [
                {
                  path: "",
                  element: <Navigate to="tenants" replace />,
                },
                {
                  path: "tenants",
                  element: <TenantPage />,
                },

                {
                  path: "landlords",
                  element: <LandlordPage />,
                },
                // {
                //   path: "agents",
                //   element: <AgentPage />,
                // },
              ],
            },
            {
              path: "verifications",
              element: <AdminDocumentVerification />,
            },
            {
              path: "properties",
              element: <AdminPropertyManagement />,
            },
            {
              path: "properties/:propertyId",
              element: <AdminPropertyDetail />,
            },
            {
              path: "messages",
              element: <AdminMessages />,
            },
            {
              path: "payments",
              element: <AdminPaymentsPage />,
            },
            {
              path: "analytics",
              // element: <AdminAnalytics />,
            },
            {
              path: "users/tenants/:id",
              element: <TenantDetailPage />,
            },
            { path: "users/landlords/:id", element: <LandlordDetailPage /> },
            {
              path: "*",
              element: <div>Page not found</div>,
            },
          ],
        },
      ],
    },

    {
      path: "view/property/:id",
      element: <PropertyDispatcher />,
    },

    {
      path: "*",
      element: <Admin404 />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-right" richColors />
      <RouterProvider router={router} />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
