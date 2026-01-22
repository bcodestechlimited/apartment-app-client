import { bookingService } from "@/api/booking.api";
import DataTable from "@/components/custom/data-table";
import { Spinner } from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { formatCurrency, formatDate, formatPrettyDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useState } from "react";
import { Ellipsis, House, ScanEye, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PropertyRating from "./_components/property-rating";
import LandlordRating from "./_components/landlord-rating";
import { se } from "date-fns/locale";

function TenantBookings() {
  const [searchParams] = useSearchParams();
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  console.log({ selectedBooking });

  // Dialogs
  const [isPropertyRatingModalOpen, setIsPropertyRatingModalOpen] =
    useState(false);
  const [isLandlordRatingModalOpen, setIsLandlordRatingModalOpen] =
    useState(false);

  const [openBookingDetail, setOpenBookingDetail] = useState(false);

  const openLandlordRatingModal = (booking: any) => {
    setSelectedBooking(booking);
    setIsLandlordRatingModalOpen(true);
  };
  const closeLandlordRatingModal = () => setIsLandlordRatingModalOpen(false);

  const openPropertyRatingModal = (booking: any) => {
    setSelectedBooking(booking);
    setIsPropertyRatingModalOpen(true);
  };
  const closePropertyRatingModal = () => setIsPropertyRatingModalOpen(false);

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { data, isLoading } = useQuery({
    queryKey: ["tenant-bookings", { page, limit }],
    queryFn: () =>
      bookingService.getTenantBookings({
        page,
        limit,
      }),
  });

  // Handlers
  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setOpenBookingDetail(true);
  };

  const columns = [
    {
      header: "Booking Date",
      render: (row: any) => formatDate(row.createdAt) || "N/A",
    },
    {
      header: "Tenant Name",
      render: (row: any) =>
        row.tenant.firstName + " " + row.tenant.lastName || "N/A",
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
          approved: "text-green-500",
          pending: "text-yellow-500",
          declined: "text-red-500",
          expired: "text-red-500",
        };
        return (
          <span className={`${classNames[status]} capitalize`}>
            {row.status}
          </span>
        );
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
        return (
          <span className={`${classNames[status]} capitalize`}>
            {row.paymentStatus}
          </span>
        );
      },
    },
    {
      header: "",
      render: (row: any) => (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-gray-50">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem onClick={() => handleViewBooking(row)}>
              <ScanEye className="mr-2 h-4 w-4" /> View Booking
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => openPropertyRatingModal(row)}>
              <Star className="mr-2 h-4 w-4 text-yellow-400" /> Rate Property
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => openLandlordRatingModal(row)}>
              <Star className="mr-2 h-4 w-4 text-blue-500" /> Rate Landlord
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

      {/* ===================== Booking Detail Dialog ===================== */}
      <Dialog open={openBookingDetail} onOpenChange={setOpenBookingDetail}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>

          {selectedBooking ? (
            <div className="space-y-3">
              <div>
                <strong>Tenant:</strong> {selectedBooking.tenant.firstname}{" "}
                {selectedBooking.tenant.lastname}
              </div>
              <div>
                <strong>Property:</strong> {selectedBooking.property.title}
              </div>
              <div>
                <strong>Booking Date:</strong>{" "}
                {formatDate(selectedBooking.createdAt)}
              </div>
              <div>
                <strong>Stay Period:</strong>{" "}
                {formatPrettyDate(selectedBooking.moveInDate)} –{" "}
                {formatPrettyDate(selectedBooking.moveOutDate)}
              </div>
              {/* <div>
                <strong>Amount:</strong> ₦{selectedBooking.netPrice}
              </div> */}
              <div className="rounded w-full flex gap-4 items-start">
                <House size={22} />
                <p>
                  <strong>Total:</strong>{" "}
                  {formatCurrency(selectedBooking?.netPrice || 0)}
                </p>
              </div>

              <div className="flex flex-col gap-1 ml-8 border-l-2 pl-3 py-1">
                <div className="flex justify-between w-full max-w-[250px] text-sm text-muted-foreground">
                  <span>Basic rent:</span>
                  <span>{formatCurrency(selectedBooking?.basePrice)}</span>
                </div>
                {selectedBooking?.otherFees.map((fee: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex justify-between w-full max-w-[250px] text-sm text-muted-foreground"
                  >
                    <span className="capitalize">{fee.name}:</span>
                    <span>{formatCurrency(fee.amount)}</span>
                  </div>
                ))}
                <div className="flex justify-between w-full max-w-[250px] text-sm text-muted-foreground">
                  <span>Platform Fee:</span>
                  <span>{formatCurrency(selectedBooking?.platformFee)}</span>
                </div>
              </div>
              <div>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{selectedBooking.status}</span>
              </div>
              <div>
                <strong>Payment Status:</strong>{" "}
                <span className="capitalize">
                  {selectedBooking.paymentStatus}
                </span>
              </div>
            </div>
          ) : (
            <p>No booking selected</p>
          )}

          <DialogFooter className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpenBookingDetail(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ===================== Rating Dialog ===================== */}

      {selectedBooking && isPropertyRatingModalOpen && (
        <PropertyRating
          booking={selectedBooking}
          isOpen={isPropertyRatingModalOpen}
          closeModal={closePropertyRatingModal}
        />
      )}
      {selectedBooking && isLandlordRatingModalOpen && (
        <LandlordRating
          booking={selectedBooking}
          isOpen={isLandlordRatingModalOpen}
          closeModal={closeLandlordRatingModal}
        />
      )}
    </div>
  );
}

export default TenantBookings;

// <Dialog
//         open={openRatingDialog.open}
//         onOpenChange={(open) =>
//           setOpenRatingDialog({
//             open,
//             type: open ? openRatingDialog.type : null,
//           })
//         }
//       >
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>
//               Rate{" "}
//               {openRatingDialog.type === "property" ? "Property" : "Landlord"}
//             </DialogTitle>
//           </DialogHeader>

//           <div className="space-y-4">
//             {/* Star Rating */}
//             <div className="flex space-x-2 justify-center">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <Star
//                   key={star}
//                   size={30}
//                   onClick={() => setRating(star)}
//                   className={`cursor-pointer ${
//                     star <= rating
//                       ? "text-yellow-400 fill-yellow-400"
//                       : "text-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>

//             {/* Comment box */}
//             <Textarea
//               placeholder="Leave a comment..."
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               className="min-h-[100px]"
//             />
//           </div>

//           <DialogFooter className="flex justify-end pt-4">
//             <Button
//               variant="outline"
//               onClick={() => setOpenRatingDialog({ open: false, type: null })}
//             >
//               Cancel
//             </Button>
//             <Button onClick={handleSubmitRating}>Submit Rating</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
