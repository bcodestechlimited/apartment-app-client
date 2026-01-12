import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "../../_component/data-table";
import { Spinner } from "@/components/custom/loader";
import { useAdminTenantDetails } from "@/hooks/admin/useAdminTenantDetails";
import { Check, Flag, Mail, Phone, Star, X } from "lucide-react";
import { flagsReportsColumns } from "../_components/column-definition/flag-report-columns";
import { bookingColumns } from "../_components/column-definition/booking-columns";
import { MetricCard } from "../_components/metrics-card";
import { VerificationDocuments } from "../_components/user-document";

export function TenantDetailPage() {
  const { id } = useParams();

  const {
    tenant,
    paymentMetrics,
    isLoadingProfile,
    documents,

    // Bookings Data
    bookings,
    bookingPagination,
    isFetchingBookings,
    setBookingPage,
    setBookingLimit, // Fixed: Destructured

    // Reports Data
    reports,
    reportPagination,
    isFetchingReports,
    setReportPage,
    setReportLimit, // Fixed: Destructured
  } = useAdminTenantDetails(id);

  console.log("paymentMetrics", paymentMetrics);
  const tenantMetrics = [
    {
      title: "Total Paid",
      amount: paymentMetrics?.totalPaid || 0,
      description: "All cleared payments made by this tenant",
      bgColor: "text-custom-primary",
    },
    {
      title: "Outstanding Balance",
      amount: paymentMetrics?.outstandingBalance || 0,
      description: "Pending or overdue rent awaiting settlement",
      bgColor: "text-orange-700",
    },
    {
      title: "Refunds Processed",
      amount: paymentMetrics?.refundsProcessed || 0,
      description: "Reimbursed amounts from cancellations",
      bgColor: "text-blue-700",
    },
  ];

  if (isLoadingProfile) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!tenant) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Tenant details not found.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 min-h-screen text-left">
      {/* --- 1. Header and Actions --- */}
      <div className="flex flex-col justify-start gap-4">
        <div className="flex items-center space-x-8 pb-4">
          <img
            src={tenant.avatar || "/default-avatar.png"}
            alt={`${tenant.firstName} ${tenant.lastName}`}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3">
              {tenant.firstName} {tenant.lastName}
              {tenant.isDocumentVerified && (
                <Check className="h-5 w-5 text-green-500" />
              )}
            </h1>
          </div>
        </div>
        <div className="flex space-x-4">
          <Button variant="default" size="lg" className="bg-custom-primary">
            <Star className="mr-2 h-4 w-4" /> Suspend
          </Button>
          <Button variant="outline" size="lg" className="text-custom-primary">
            <X className="h-4 w-4 mr-2" /> Reject
          </Button>
        </div>
      </div>

      {/* --- 2. Basic Information --- */}
      <div className="flex flex-col pb-4 justify-start gap-4 w-full md:w-1/4">
        <p className="font-medium text-xl">Basic Information</p>
        <div className="flex items-center gap-2 text-custom-grey">
          <Phone className="w-4 h-4" />
          <span>{tenant.phoneNumber || "No phone provided"}</span>
        </div>
        <div className="flex items-center gap-2 text-custom-grey">
          <Mail className="w-4 h-4" />
          <span>{tenant.email}</span>
        </div>
      </div>

      {/* --- 3. Booking History Table --- */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold pt-4">Booking History</h2>
        <DataTable
          data={bookings}
          columns={bookingColumns}
          isLoading={isFetchingBookings}
          pagination={bookingPagination}
          setPage={setBookingPage}
          setPageSize={setBookingLimit} // Fixed: Passing correct handler
          onSortChange={() => {}}
        />
      </div>

      {/* --- 4. Payment Overview Metrics --- */}
      <h2 className="text-xl font-semibold pt-4">Payment Overview</h2>
      <MetricCard metrics={tenantMetrics} />

      {/* --- 5. Verification Documents --- */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Verification Documents
        </h2>
        <VerificationDocuments documents={(documents as any[]) || []} />
      </section>

      {/* --- 6. Flags / Reports Table --- */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold pt-4">Flags / Reports</h2>
        <DataTable
          data={reports}
          columns={flagsReportsColumns}
          isLoading={isFetchingReports}
          pagination={reportPagination}
          setPage={setReportPage}
          setPageSize={setReportLimit} // Fixed: Passing correct handler
          onSortChange={() => {}}
        />
      </div>
    </div>
  );
}
