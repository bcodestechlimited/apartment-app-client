/* eslint-disable @typescript-eslint/no-explicit-any */
import { bookingRequestService } from "@/api/bookingRequest.api";
import DataTable from "@/components/custom/data-table";
import { Spinner } from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, formatPrettyDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useState } from "react";
import { TenantBookingRequestDetail } from "../shared/_components/booking-request-detail";
import BookingRequestPaymentSuccessfulModal from "./_components/booking-request-payment-successful-modal";

export default function TenantBookingRequests() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBookingRequest, setSelectedBookingRequest] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(true);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setSearchParams({});
  };

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const bookingRequestId = searchParams.get("bookingRequestId");

  const { data, isLoading } = useQuery({
    queryKey: ["tenant-booking-requests", { page, limit }],
    queryFn: () =>
      bookingRequestService.getTenantBookingRequests({
        page: 1,
        limit: 10,
      }),
  });

  const columns = [
    {
      header: "Request Date",
      render: (row: any) => formatDate(row.createdAt) || "N/A",
    },
    {
      header: "Tenant Name",
      render: (row: any) => row?.tenant?.firstName || "N/A",
    },
    {
      header: "Property",
      render: (row: any) => row?.property?.title || "N/A",
    },
    {
      header: "Stay Period",
      render: (row: any) => (
        <span>
          {formatPrettyDate(row?.moveInDate)} -{" "}
          {formatPrettyDate(row?.moveOutDate)}
        </span>
      ),
    },
    {
      header: "Amount (NGN)",
      render: (row: any) => formatCurrency(row.netPrice) ?? "N/A",
    },
    {
      header: "Status",
      render: (row: any) => {
        const status = row.status.toLowerCase();
        const classNames: Record<string, string> = {
          approved: "text-green-500",
          pending: "text-yellow-500",
          declined: "text-red-500",
          expired: "text-red-500",
        };

        const fullClassName =
          classNames[status] + " py-1 rounded-full capitalize";

        return <span className={fullClassName}>{row.status}</span>;
      },
    },
    {
      header: "Payment Status",
      render: (row: any) => {
        const status = row.paymentStatus.toLowerCase();
        const classNames: Record<string, string> = {
          success: "text-green-500",
          pending: "text-gray-500",
          failed: "text-red-500",
        };

        const fullClassName =
          classNames[status] + " py-1 rounded-full capitalize";

        return <span className={fullClassName}>{row.paymentStatus}</span>;
      },
    },
    {
      header: "",
      render: (row: any) => (
        <Button
          variant={"ghost"}
          className=" border-1 cursor-pointer border-gray-100 text-green-950 hover:bg-green-50 active:bg-green-100 active:text-green-950 hover:text-green-950 rounded-md"
          onClick={() => {
            setSelectedBookingRequest(row);
            openModal();
          }}
        >
          View
        </Button>
      ),
    },
  ];

  if (isLoading) return <Spinner />;

  return (
    <div>
      <DataTable
        columns={columns}
        data={data?.bookingRequests || []}
        noDataMessage="No booking requests available."
      />

      {selectedBookingRequest && (
        <TenantBookingRequestDetail
          isOpen={isOpen}
          setOpen={setIsOpen}
          closeModal={closeModal}
          bookingRequest={selectedBookingRequest}
        />
      )}

      {bookingRequestId && (
        <BookingRequestPaymentSuccessfulModal
          isOpen={isSuccessModalOpen}
          setOpen={setIsSuccessModalOpen}
          closeModal={closeSuccessModal}
          bookingRequestId={bookingRequestId}
        />
      )}
    </div>
  );
}
