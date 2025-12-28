import { Check, ExternalLink, Flag } from "lucide-react";
import type { Booking, Report } from "./types";
import tentantprofile from "@/assets/images/haven_lease-admin_tenant_profile.png";

export const formatNaira = (value: number) => `₦${value.toLocaleString()}`;
export const flagsReportsData: Report[] = [
  {
    date: "Sept 2, 2025",
    issue: "Dispute with landlord over rent",
    reportedBy: "John Ade",
    status: "Pending",
    action: "...",
  },
  {
    date: "Sept 2, 2025",
    issue: "Tenant flagged for late payment",
    reportedBy: "System: Auto-Flag",
    status: "Reached",
    action: "...",
  },
  {
    date: "Sept 2, 2025",
    issue: "Property damage complaint",
    reportedBy: "Agent: Adewale Kay",
    status: "Pending",
    action: "...",
  },
  {
    date: "Sept 2, 2025",
    issue: "Tenant requested refund dispute",
    reportedBy: "Support Team",
    status: "Reached",
    action: "...",
  },
];

export const bookingHistoryData: Booking[] = [
  {
    property: "Harmony Court",
    location: "Lekki Phase 1",
    duration: "3 months",
    status: "Active",
    paymentStatus: "Cleared",
    landlord: "John Ade (Agent)",
  },
  {
    property: "Harmony Court",
    location: "Lekki Phase 1",
    duration: "3 months",
    status: "Pending",
    paymentStatus: "Refund issued",
    landlord: "Sarah Okoro (Owner)",
  },
  {
    property: "Harmony Court",
    location: "Lekki Phase 1",
    duration: "3 months",
    status: "Cancelled",
    paymentStatus: "Overdue",
    landlord: "Adewale Kay (Agent)",
  },
];

const mockTenantDetail = {
  name: "Ashley Walters",
  phone: "09074237420",
  email: "ashleywalters22@gmail.com",
  status: "verified",
  img: tentantprofile,
  payments: { total: 4250000, outstanding: 320000, refunds: 150000 },
};

export const tenant = mockTenantDetail;
export const paymentMetrics = [
  {
    title: "Total Paid",
    value: formatNaira(tenant.payments.total),
    subtext: "All cleared payments made by this tenant",
    color: "text-custom-primary",
    icon: Check,
    className: "",
  },
  {
    title: "Outstanding Balance",
    value: formatNaira(tenant.payments.outstanding),
    subtext: "Pending or overdue rent awaiting settlement",
    color: "text-custom-brown",
    icon: Flag,
    className: "",
  },
  {
    title: "Refunds Processed",
    value: formatNaira(tenant.payments.refunds),
    subtext: "Reimbursed amounts from cancellations or disputes",
    color: "text-custom-royal-blue",
    icon: ExternalLink,
    className: "",
  },
];

// Metric Data structured for the Landlord Detail Page (Based on VIEW (2).jpg)
export const landlordPaymentMetrics = [
  {
    title: "Total Earnings",
    value: formatNaira(tenant.payments.total), // Assuming tenant.payments.total holds the earnings
    subtext: "All cleared payments made by this tenant",
    color: "text-emerald-500",
    icon: Check,
    className: "bg-emerald-50 border-l-4 border-emerald-500",
  },
  {
    title: "Pending Payouts",
    value: formatNaira(tenant.payments.outstanding),
    subtext: "Pending or overdue rent awaiting settlement",
    color: "text-amber-500",
    icon: Flag,
    className: "bg-amber-50 border-l-4 border-amber-500",
  },
  {
    title: "Last Payout",
    value: formatNaira(tenant.payments.refunds),
    subtext: "Reimbursed amounts from cancellations or disputes",
    color: "text-sky-500",
    icon: ExternalLink,
    className: "bg-sky-50 border-l-4 border-sky-500",
  },
];
