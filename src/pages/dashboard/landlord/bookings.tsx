/* eslint-disable @typescript-eslint/no-explicit-any */
import { bookingService } from "@/api/booking.api";
import DataTable from "@/components/custom/data-table";
import { Spinner } from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import { formatDate, formatPrettyDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

export default function Bookings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { data, isLoading } = useQuery({
    queryKey: ["landlord-bookings", { page, limit }],
    queryFn: () =>
      bookingService.getLandlordBookings({
        page: 1,
        limit: 10,
      }),
  });

  const columns = [
    {
      header: "Booking Date",
      render: (row: any) => formatDate(row.createdAt) || "N/A",
    },
    {
      header: "Tenant Name",
      render: (row: any) => row.tenant.firstname || "N/A",
    },
    {
      header: "Property",
      render: (row: any) => row.property.title || "N/A",
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
      render: (row: any) => row.netPrice ?? "N/A",
    },
    {
      header: "Status",
      render: (row: any) => {
        const status = row.status.toLowerCase();
        const classNames: Record<string, string> = {
          active:
            "text-green-500 bg-green-100 px-4 py-1 rounded-full capitalize",
          declined: "text-red-500 bg-red-100 px-4 py-1 rounded-full capitalize",
          inactive: "text-red-500 bg-red-100 px-4 py-1 rounded-full capitalize",
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
          success:
            "text-green-500 bg-green-100 px-4 py-1 rounded-full capitalize",
          pending:
            "text-gray-500 bg-gray-100 px-4 py-1 rounded-full capitalize",
          failed: "text-red-500 bg-red-100 px-4 py-1 rounded-full capitalize",
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
        >
          View
        </Button>
      ),
    },
  ];

  if (isLoading) return <Spinner />;

  console.log({ data });

  return (
    <div>
      <DataTable
        columns={columns}
        data={data?.bookings || []}
        noDataMessage="No bookings available."
      />
    </div>
  );
}
