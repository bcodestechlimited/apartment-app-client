import React from "react";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "../../_component/data-table";
import { Spinner } from "@/components/custom/loader";
import { useAdminLandlordDetails } from "@/hooks/admin/useAdminLandlordDetails";
import { Check, Flag, Mail, Phone, Star, X } from "lucide-react";
import { flagsReportsColumns } from "../_components/column-definition/flag-report-columns";
import { propertyColumns } from "../_components/column-definition/property-columns";
import { MetricCard } from "../_components/metrics-card";
import { formatPrettyDate } from "@/lib/utils";
import { VerificationDocuments } from "../_components/user-document";

export function LandlordDetailPage() {
  const { id } = useParams();
  const {
    landlord,
    paymentMetrics,
    isLoadingProfile,
    documents,
    properties,
    propertyPagination,
    isFetchingProperties,
    setPropertyPage,
    setPropertyLimit,
    reports,
    reportPagination,
    isFetchingReports,
    setReportPage,
    setReportLimit,
  } = useAdminLandlordDetails(id);

  // console.log("paymentMetrics", paymentMetrics);

  const landlordMetrics = [
    {
      title: "Total Earnings",
      amount: paymentMetrics?.totalEarnings || 0,
      description: "Total Earnings made by this landlord",
      bgColor: "text-custom-primary",
    },
    {
      title: "Pending Payouts",
      amount: paymentMetrics?.pendingPayouts || 0,
      description: "Payouts that are yet to be paid",
      bgColor: "text-purple-700",
    },
    {
      title: "Last Payout",
      amount: paymentMetrics?.lastPayoutAmount || 0,
      description: `Last Payout on ${formatPrettyDate(
        paymentMetrics?.lastPayoutDate,
      )}`,
      bgColor: "text-blue-700",
    },
  ];

  if (isLoadingProfile)
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (!landlord)
    return <div className="p-6 text-center">Landlord not found.</div>;

  return (
    <div className="p-6 space-y-8 min-h-screen text-left bg-white">
      {/* --- 1. Profile Header --- */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center space-x-6">
          <img
            src={landlord.avatar || "/default-avatar.png"}
            alt={landlord.firstName}
            className="h-20 w-20 rounded-full object-cover border-2 border-gray-100"
          />
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              {landlord.firstName} {landlord.lastName}
              {landlord.isDocumentVerified ? (
                <Check className="h-6 w-6 text-white bg-green-500 rounded-full p-1" />
              ) : (
                <Check className="h-6 w-6 text-white bg-red-500 rounded-full p-1" />
              )}
            </h1>
          </div>
        </div>
        {/* <div className="flex space-x-3">
          <Button className="bg-[#003333] hover:bg-[#002222] text-white px-8">
            <Star className="mr-2 h-4 w-4 fill-white" /> Suspend
          </Button>
          <Button variant="outline" className="border-gray-200 px-8">
            <X className="mr-2 h-4 w-4" /> Reject
          </Button>
        </div> */}
      </div>

      {/* --- 2. Basic Information --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Basic Information</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <Phone className="w-5 h-5" />
            <span>{landlord.phoneNumber || "No phone provided"}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600">
            <Mail className="w-5 h-5" />
            <span>{landlord.email}</span>
          </div>
        </div>
      </div>

      {/* --- 3. Listed Properties Table --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Listed Properties</h3>
        <DataTable
          data={properties}
          columns={propertyColumns}
          isLoading={isFetchingProperties}
          pagination={propertyPagination}
          setPage={setPropertyPage}
          setPageSize={setPropertyLimit}
          onSortChange={() => {}}
        />
      </div>

      {/* --- 4. Payment Overview --- */}

      <h3 className="text-lg font-bold">Payment Overview</h3>

      <MetricCard metrics={landlordMetrics} />

      {/* --- 5. Verification Documents --- */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Verification Documents
        </h2>
        <VerificationDocuments documents={(documents as any[]) || []} />
      </section>

      {/* --- 6. Flags / Reports --- */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Flags / Reports</h3>
        <DataTable
          data={reports}
          columns={flagsReportsColumns}
          isLoading={isFetchingReports}
          pagination={reportPagination}
          setPage={setReportPage}
          setPageSize={setReportLimit}
          onSortChange={() => {}}
        />
      </div>
    </div>
  );
}
