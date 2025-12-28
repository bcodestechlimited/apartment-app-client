/* eslint-disable @typescript-eslint/no-explicit-any */
import { bookingService } from "@/api/booking.api";
import DataTable from "@/components/custom/data-table";
import { Spinner } from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import { formatDate, formatPrettyDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

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

  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [openBookingDetail, setOpenBookingDetail] = useState(false);

  const columns = [
    {
      header: "Booking Date",
      render: (row: any) => formatDate(row.createdAt) || "N/A",
    },
    {
      header: "Tenant Name",
      render: (row: any) => row.tenant.firstName || "N/A",
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
          onClick={() => {
            setSelectedBooking(row);
            setOpenBookingDetail(true);
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
        data={data?.bookings || []}
        noDataMessage="No bookings available."
      />

      {/* Booking Detail Modal */}
      <Dialog open={openBookingDetail} onOpenChange={setOpenBookingDetail}>
        <DialogContent className="max-w-md sm:max-w-lg p-0">
          <DialogHeader>
            <DialogTitle className=" text-center pt-4">
              Booking Details
            </DialogTitle>
          </DialogHeader>
          {selectedBooking ? (
            <div className="space-y-5 p-5">
              {/* Tenant Info */}
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={selectedBooking.tenant.avatar}
                  alt={selectedBooking.tenant.firstName}
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <div className="font-semibold text-base">Tenant</div>
                  <div className="font-medium">
                    {selectedBooking.tenant.firstName}{" "}
                    {selectedBooking.tenant.lastName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <span>{selectedBooking.tenant.email}</span>
                    <span className="ml-2">
                      {selectedBooking.tenant.phoneNumber}
                    </span>
                  </div>
                </div>
              </div>

              {/* Property Info */}
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">
                    {selectedBooking.property.title}
                  </span>
                  <span className="bg-custom-primary/10 text-custom-primary px-2 py-0.5 rounded text-xs capitalize">
                    {selectedBooking.property.type.replace("-", " ")}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  {selectedBooking.property.address}
                </div>
                <div className="flex gap-3 text-xs mb-1">
                  <span>Bed: {selectedBooking.property.numberOfBedrooms}</span>
                  <span>
                    Bath: {selectedBooking.property.numberOfBathrooms}
                  </span>
                  <span>Pricing: {selectedBooking.property.pricingModel}</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1 truncate">
                  {selectedBooking.property.description}
                </div>
                <div className="flex gap-2 mb-1">
                  {selectedBooking.property.pictures
                    ?.slice(0, 2)
                    .map((img: string, idx: number) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`property-img-${idx}`}
                        className="w-14 h-14 object-cover rounded border"
                      />
                    ))}
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>
                    Amenities:{" "}
                    {selectedBooking.property.amenities?.slice(0, 2).join(", ")}
                  </span>
                  <span>
                    Facilities:{" "}
                    {selectedBooking.property.facilities
                      ?.slice(0, 2)
                      .join(", ")}
                  </span>
                </div>
              </div>

              {/* Booking & Payment Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-white rounded p-3 border">
                  <div className="font-semibold text-sm mb-1">Booking</div>
                  <div className="text-xs mb-1">
                    <strong>Date:</strong>{" "}
                    {formatDate(selectedBooking.createdAt)}
                  </div>
                  <div className="text-xs mb-1">
                    <strong>Stay:</strong>{" "}
                    {formatPrettyDate(selectedBooking.moveInDate)} –{" "}
                    {formatPrettyDate(selectedBooking.moveOutDate)}
                  </div>
                  <div className="text-xs mb-1">
                    <strong>Status:</strong>{" "}
                    <span className="capitalize">{selectedBooking.status}</span>
                  </div>
                  <div className="text-xs">
                    <strong>Renew:</strong>{" "}
                    {selectedBooking.canRenew ? "Yes" : "No"}
                  </div>
                </div>
                <div className="bg-white rounded p-3 border">
                  <div className="font-semibold text-sm mb-1">Payment</div>
                  <div className="text-xs mb-1">
                    <strong>Amount:</strong> ₦{selectedBooking.netPrice}
                  </div>
                  <div className="text-xs mb-1">
                    <strong>Status:</strong>{" "}
                    <span className="capitalize">
                      {selectedBooking.paymentStatus}
                    </span>
                  </div>
                  <div className="text-xs mb-1">
                    <strong>Method:</strong> {selectedBooking.paymentMethod}
                  </div>
                  <div className="text-xs">
                    <strong>Ref:</strong> {selectedBooking.paymentReference}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="p-6">No booking selected</p>
          )}
          <DialogFooter className=" pt-4  ">
            <Button
              variant="outline"
              onClick={() => setOpenBookingDetail(false)}
              className="  mx-auto w-full mb-4"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
