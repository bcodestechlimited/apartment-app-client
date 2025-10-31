/* eslint-disable @typescript-eslint/no-explicit-any */
// import { bookingService } from "@/api/booking.api";
// import DataTable from "@/components/custom/data-table";
// import { Spinner } from "@/components/custom/loader";
// import { Button } from "@/components/ui/button";
// import { formatDate, formatPrettyDate } from "@/lib/utils";
// import { useQuery } from "@tanstack/react-query";
// import { useSearchParams } from "react-router";

// function TenantBookings() {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const page = Number(searchParams.get("page")) || 1;
//   const limit = Number(searchParams.get("limit")) || 10;

//   const { data, isLoading } = useQuery({
//     queryKey: ["tenant-bookings", { page, limit }],
//     queryFn: () =>
//       bookingService.getTenantBookings({
//         page: 1,
//         limit: 10,
//       }),
//   });

//   const columns = [
//     {
//       header: "Booking Date",
//       render: (row: any) => formatDate(row.createdAt) || "N/A",
//     },
//     {
//       header: "Tenant Name",
//       render: (row: any) => row.tenant.firstname || "N/A",
//     },
//     {
//       header: "Property",
//       render: (row: any) => row.property.title || "N/A",
//     },
//     {
//       header: "Stay Period",
//       render: (row: any) => (
//         <span>
//           {formatPrettyDate(row?.moveInDate)} -{" "}
//           {formatPrettyDate(row?.moveOutDate)}
//         </span>
//       ),
//     },
//     {
//       header: "Amount (NGN)",
//       render: (row: any) => row.netPrice ?? "N/A",
//     },
//     {
//       header: "Status",
//       render: (row: any) => {
//         const status = row.status.toLowerCase();
//         const classNames: Record<string, string> = {
//           approved: "text-green-500",
//           pending: "text-yellow-500",
//           declined: "text-red-500",
//           expired: "text-red-500",
//         };

//         const fullClassName =
//           classNames[status] + " py-1 rounded-full capitalize";

//         return <span className={fullClassName}>{row.status}</span>;
//       },
//     },
//     {
//       header: "Payment Status",
//       render: (row: any) => {
//         const status = row.paymentStatus.toLowerCase();
//         const classNames: Record<string, string> = {
//           success: "text-green-500",
//           pending: "text-gray-500",
//           failed: "text-red-500",
//         };

//         const fullClassName =
//           classNames[status] + " py-1 rounded-full capitalize";

//         return <span className={fullClassName}>{row.paymentStatus}</span>;
//       },
//     },
//     {
//       header: "",
//       render: (row: any) => (
//         <Button
//           variant={"ghost"}
//           className=" border-1 cursor-pointer border-gray-100 text-green-950 hover:bg-green-50 active:bg-green-100 active:text-green-950 hover:text-green-950 rounded-md"
//         >
//           View
//         </Button>
//       ),
//     },
//   ];

//   if (isLoading) return <Spinner />;

//   console.log({ data });

//   return (
//     <div>
//       <DataTable
//         columns={columns}
//         data={data?.bookings || []}
//         noDataMessage="No bookings available."
//       />
//     </div>
//   );
// }

// export default TenantBookings;

// import { bookingService } from "@/api/booking.api";
// import DataTable from "@/components/custom/data-table";
// import { Spinner } from "@/components/custom/loader";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { formatDate, formatPrettyDate } from "@/lib/utils";
// import { useQuery } from "@tanstack/react-query";
// import { useSearchParams } from "react-router";
// import { useState } from "react";

// function TenantBookings() {
//   const [searchParams] = useSearchParams();
//   const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
//   const [open, setOpen] = useState(false);

//   const page = Number(searchParams.get("page")) || 1;
//   const limit = Number(searchParams.get("limit")) || 10;

//   const { data, isLoading } = useQuery({
//     queryKey: ["tenant-bookings", { page, limit }],
//     queryFn: () =>
//       bookingService.getTenantBookings({
//         page,
//         limit,
//       }),
//   });

//   const handleViewClick = (booking: any) => {
//     setSelectedBooking(booking);
//     setOpen(true);
//   };

//   const columns = [
//     {
//       header: "Booking Date",
//       render: (row: any) => formatDate(row.createdAt) || "N/A",
//     },
//     {
//       header: "Tenant Name",
//       render: (row: any) => row.tenant.firstname || "N/A",
//     },
//     {
//       header: "Property",
//       render: (row: any) => row.property.title || "N/A",
//     },
//     {
//       header: "Stay Period",
//       render: (row: any) => (
//         <span>
//           {formatPrettyDate(row?.moveInDate)} -{" "}
//           {formatPrettyDate(row?.moveOutDate)}
//         </span>
//       ),
//     },
//     {
//       header: "Amount (NGN)",
//       render: (row: any) => row.netPrice ?? "N/A",
//     },
//     {
//       header: "Status",
//       render: (row: any) => {
//         const status = row.status.toLowerCase();
//         const classNames: Record<string, string> = {
//           approved: "text-green-500",
//           pending: "text-yellow-500",
//           declined: "text-red-500",
//           expired: "text-red-500",
//         };

//         return (
//           <span className={`${classNames[status]} capitalize`}>
//             {row.status}
//           </span>
//         );
//       },
//     },
//     {
//       header: "Payment Status",
//       render: (row: any) => {
//         const status = row.paymentStatus.toLowerCase();
//         const classNames: Record<string, string> = {
//           success: "text-green-500",
//           pending: "text-gray-500",
//           failed: "text-red-500",
//         };

//         return (
//           <span className={`${classNames[status]} capitalize`}>
//             {row.paymentStatus}
//           </span>
//         );
//       },
//     },
//     {
//       header: "",
//       render: (row: any) => (
//         <Button
//           variant="outline"
//           className="cursor-pointer text-green-950 hover:bg-green-50 active:bg-green-100 hover:text-green-950 rounded-md"
//           onClick={() => handleViewClick(row)}
//         >
//           View
//         </Button>
//       ),
//     },
//   ];

//   if (isLoading) return <Spinner />;

//   return (
//     <div>
//       <DataTable
//         columns={columns}
//         data={data?.bookings || []}
//         noDataMessage="No bookings available."
//       />

//       {/* Booking Detail Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-lg">
//           <DialogHeader>
//             <DialogTitle>Booking Details</DialogTitle>
//           </DialogHeader>

//           {selectedBooking ? (
//             <div className="space-y-3">
//               <div>
//                 <strong>Tenant:</strong> {selectedBooking.tenant.firstname}{" "}
//                 {selectedBooking.tenant.lastname}
//               </div>
//               <div>
//                 <strong>Property:</strong> {selectedBooking.property.title}
//               </div>
//               <div>
//                 <strong>Booking Date:</strong>{" "}
//                 {formatDate(selectedBooking.createdAt)}
//               </div>
//               <div>
//                 <strong>Stay Period:</strong>{" "}
//                 {formatPrettyDate(selectedBooking.moveInDate)} –{" "}
//                 {formatPrettyDate(selectedBooking.moveOutDate)}
//               </div>
//               <div>
//                 <strong>Amount:</strong> ₦{selectedBooking.netPrice}
//               </div>
//               <div>
//                 <strong>Status:</strong>{" "}
//                 <span className="capitalize">{selectedBooking.status}</span>
//               </div>
//               <div>
//                 <strong>Payment Status:</strong>{" "}
//                 <span className="capitalize">
//                   {selectedBooking.paymentStatus}
//                 </span>
//               </div>
//             </div>
//           ) : (
//             <p>No booking selected</p>
//           )}

//           <DialogFooter className="flex justify-end space-x-3 pt-4">
//             <Button variant="secondary" onClick={}>
//               Rate Tenant
//             </Button>
//             <Button variant="default">Rate Landlord</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default TenantBookings;

// import { bookingService } from "@/api/booking.api";
// import DataTable from "@/components/custom/data-table";
// import { Spinner } from "@/components/custom/loader";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Textarea } from "@/components/ui/textarea";
// import { formatDate, formatPrettyDate } from "@/lib/utils";
// import { useQuery } from "@tanstack/react-query";
// import { useSearchParams } from "react-router";
// import { useState } from "react";
// import { Ellipsis, FileWarning, ScanEye, Star } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// function TenantBookings() {
//   const [searchParams] = useSearchParams();
//   const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
//   const [open, setOpen] = useState(false);
//   const [openPropertyRating, setOpenPropertyRating] = useState(false);
//   const [openLandlordRating, setOpenLandlordRating] = useState(false);

//   const [ratingDialog, setRatingDialog] = useState<{
//     open: boolean;
//     type: "tenant" | "landlord" | null;
//   }>({ open: false, type: null });
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   const page = Number(searchParams.get("page")) || 1;
//   const limit = Number(searchParams.get("limit")) || 10;

//   const { data, isLoading } = useQuery({
//     queryKey: ["tenant-bookings", { page, limit }],
//     queryFn: () =>
//       bookingService.getTenantBookings({
//         page,
//         limit,
//       }),
//   });

//   const handleViewClick = (booking: any) => {
//     setSelectedBooking(booking);
//     setOpen(true);
//   };

//   const handleOpenRating = (type: "tenant" | "landlord") => {
//     setRatingDialog({ open: true, type });
//     setRating(0);
//     setComment("");
//   };

//   const handleSubmitRating = () => {
//     if (!selectedBooking) return;

//     const payload = {
//       ratedUserType: ratingDialog.type,
//       rating,
//       comment,
//       bookingId: selectedBooking._id,
//     };

//     console.log("Submitting rating:", payload);

//     // TODO: Integrate with API
//     // await ratingService.submitRating(payload);

//     setRatingDialog({ open: false, type: null });
//   };

//   const columns = [
//     {
//       header: "Booking Date",
//       render: (row: any) => formatDate(row.createdAt) || "N/A",
//     },
//     {
//       header: "Tenant Name",
//       render: (row: any) => row.tenant.firstname || "N/A",
//     },
//     {
//       header: "Property",
//       render: (row: any) => row.property.title || "N/A",
//     },
//     {
//       header: "Stay Period",
//       render: (row: any) => (
//         <span>
//           {formatPrettyDate(row?.moveInDate)} -{" "}
//           {formatPrettyDate(row?.moveOutDate)}
//         </span>
//       ),
//     },
//     {
//       header: "Amount (NGN)",
//       render: (row: any) => row.netPrice ?? "N/A",
//     },
//     {
//       header: "Status",
//       render: (row: any) => {
//         const status = row.status.toLowerCase();
//         const classNames: Record<string, string> = {
//           approved: "text-green-500",
//           pending: "text-yellow-500",
//           declined: "text-red-500",
//           expired: "text-red-500",
//         };

//         return (
//           <span className={`${classNames[status]} capitalize`}>
//             {row.status}
//           </span>
//         );
//       },
//     },
//     {
//       header: "Payment Status",
//       render: (row: any) => {
//         const status = row.paymentStatus.toLowerCase();
//         const classNames: Record<string, string> = {
//           success: "text-green-500",
//           pending: "text-gray-500",
//           failed: "text-red-500",
//         };

//         return (
//           <span className={`${classNames[status]} capitalize`}>
//             {row.paymentStatus}
//           </span>
//         );
//       },
//     },
//     {
//       header: "",
//       render: (row: any) => (
//         <div>
//           <DropdownMenu modal={false}>
//             <DropdownMenuTrigger className="cursor-pointer">
//               <Ellipsis />
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="mr-6">
//               <DropdownMenuItem onClick={() => openProfileModal(row?.user)}>
//                 <ScanEye /> Profile
//               </DropdownMenuItem>

//               <DropdownMenuItem onClick={() => openLandlordRating(row?.user)}>
//                 <Star /> Rate Landlord
//               </DropdownMenuItem>

//               <DropdownMenuItem onClick={openReportModal}>
//                 <FileWarning /> Rate Tenant
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       ),
//     },
//   ];

//   if (isLoading) return <Spinner />;

//   return (
//     <div>
//       <DataTable
//         columns={columns}
//         data={data?.bookings || []}
//         noDataMessage="No bookings available."
//       />

//       {/* Booking Detail Dialog */}
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="max-w-lg">
//           <DialogHeader>
//             <DialogTitle>Booking Details</DialogTitle>
//           </DialogHeader>

//           {selectedBooking ? (
//             <div className="space-y-3">
//               <div>
//                 <strong>Tenant:</strong> {selectedBooking.tenant.firstname}{" "}
//                 {selectedBooking.tenant.lastname}
//               </div>
//               <div>
//                 <strong>Property:</strong> {selectedBooking.property.title}
//               </div>
//               <div>
//                 <strong>Booking Date:</strong>{" "}
//                 {formatDate(selectedBooking.createdAt)}
//               </div>
//               <div>
//                 <strong>Stay Period:</strong>{" "}
//                 {formatPrettyDate(selectedBooking.moveInDate)} –{" "}
//                 {formatPrettyDate(selectedBooking.moveOutDate)}
//               </div>
//               <div>
//                 <strong>Amount:</strong> ₦{selectedBooking.netPrice}
//               </div>
//               <div>
//                 <strong>Status:</strong>{" "}
//                 <span className="capitalize">{selectedBooking.status}</span>
//               </div>
//               <div>
//                 <strong>Payment Status:</strong>{" "}
//                 <span className="capitalize">
//                   {selectedBooking.paymentStatus}
//                 </span>
//               </div>
//             </div>
//           ) : (
//             <p>No booking selected</p>
//           )}

//           <DialogFooter className="flex justify-end space-x-3 pt-4">
//             <Button
//               variant="secondary"
//               onClick={() => handleOpenRating("tenant")}
//             >
//               Rate Tenant
//             </Button>
//             <Button
//               variant="default"
//               onClick={() => handleOpenRating("landlord")}
//             >
//               Rate Landlord
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>

//       {/* Rating Dialog */}
//       <Dialog
//         open={ratingDialog.open}
//         onOpenChange={(open) =>
//           setRatingDialog({ open, type: open ? ratingDialog.type : null })
//         }
//       >
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle>
//               Rate {ratingDialog.type === "tenant" ? "Tenant" : "Landlord"}
//             </DialogTitle>
//           </DialogHeader>

//           <div className="space-y-4">
//             {/* Star rating */}
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
//               onClick={() => setRatingDialog({ open: false, type: null })}
//             >
//               Cancel
//             </Button>
//             <Button onClick={handleSubmitRating}>Submit Rating</Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default TenantBookings;

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
import { formatDate, formatPrettyDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useState } from "react";
import { Ellipsis, ScanEye, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PropertyRating from "./_components/property-rating";
import LandlordRating from "./_components/landlord-rating";

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
  // const [openRatingDialog, setOpenRatingDialog] = useState<{
  //   open: boolean;
  //   type: "property" | "landlord" | null;
  // }>({ open: false, type: null });

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

  // Rating state
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");

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

  // const handleOpenRating = (booking: any, type: "property" | "landlord") => {
  //   setSelectedBooking(booking);
  //   setOpenRatingDialog({ open: true, type });
  //   setRating(0);
  //   setComment("");
  // };

  // const handleSubmitRating = () => {
  //   if (!selectedBooking) return;

  //   const payload = {
  //     ratedType: openRatingDialog.type,
  //     rating,
  //     comment,
  //     bookingId: selectedBooking._id,
  //   };

  //   console.log("Submitting rating:", payload);
  //   // TODO: call ratingService.submitRating(payload);

  //   setOpenRatingDialog({ open: false, type: null });
  // };

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
              <div>
                <strong>Amount:</strong> ₦{selectedBooking.netPrice}
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
