/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IBookingRequest } from "@/interfaces/booking-request.interface";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { House, MessageSquareText } from "lucide-react";
import { formatCurrency, formatPrettyDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { bookingRequestService } from "@/api/bookingRequest.api";
import { toast } from "sonner";
import { systemSettingsService } from "@/api/admin/system-settings.api";
import { useState } from "react";
import { walletService } from "@/api/wallet.api";
import { Switch } from "@/components/ui/switch";

interface ModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  closeModal: () => void;
  bookingRequest: IBookingRequest;
}

export const LanlordBookingRequestDetail = ({
  bookingRequest,
  isOpen,
  setOpen,
  closeModal,
}: ModalProps) => {
  const queryClient = useQueryClient();

  const bookingRequestMutation = useMutation({
    mutationFn: (data: any) =>
      bookingRequestService.updateLandlordBookingRequests(
        bookingRequest._id,
        data,
      ),
    onSuccess: async () => {
      toast.success("Booking request updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["landlord-booking-requests"],
      });
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    },
  });

  const handleAccept = () => {
    bookingRequestMutation.mutate({ status: "approved" });
  };

  const handleDecline = () => {
    bookingRequestMutation.mutateAsync({ status: "declined" });
  };

  // const otherFeesTotal =
  //   bookingRequest?.property?.otherFees?.reduce(
  //     (acc, curr) => acc + (curr.amount as number),
  //     0,
  //   ) || 0;
  const grandTotal = bookingRequest?.netPrice || 0;

  if (!isOpen) return null;

  if (!bookingRequest) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Booking Request</DialogTitle>
        </DialogHeader>
        <Separator />

        <div className="flex flex-col gap-2">
          {/* <div className="rounded w-full flex gap-4 items-start">
            <House size={22} />
            <p>
              <strong>{bookingRequest.property.description}</strong>
            </p>
          </div> */}

          {/* <div className="rounded w-full flex gap-4 items-start">
            <House size={22} />
            <p>
              <strong>Address:</strong> {bookingRequest.property.address}
            </p>
          </div> */}

          <div className="rounded w-full flex gap-4 items-start">
            <House size={22} />
            <p>
              <strong>Property:</strong> {bookingRequest.property.title}
            </p>
          </div>

          <div className="rounded w-full flex gap-4 items-start">
            <House size={22} />
            <p>
              <strong>Total:</strong> {formatCurrency(grandTotal)}
            </p>
          </div>

          <div className="flex flex-col gap-1 ml-8 border-l-2 pl-3 py-1">
            <div className="flex justify-between w-full max-w-[250px] text-sm text-muted-foreground">
              <span>Basic rent:</span>
              <span>{formatCurrency(bookingRequest.basePrice)}</span>
            </div>
            {bookingRequest?.otherFees.map((fee, idx) => (
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
              <span>{formatCurrency(bookingRequest.platformFee)}</span>
            </div>
          </div>

          <div className="rounded w-full flex gap-4 items-start">
            <House size={22} />
            <p>
              <strong>Pricing Model:</strong>{" "}
              {bookingRequest.property.pricingModel}
            </p>
          </div>

          <div className="rounded w-full flex gap-4 items-start">
            <House size={22} />
            <p>
              <strong>Request Date:</strong>{" "}
              {formatPrettyDate(bookingRequest.createdAt)}
            </p>
          </div>

          <div className="rounded w-full flex gap-4 items-start">
            <House size={22} />
            <p>
              <strong>Preferred Move-In Date:</strong>{" "}
              {formatPrettyDate(bookingRequest.moveInDate)}
            </p>
          </div>
        </div>

        <DialogFooter className="border-t">
          <div className="flex flex-col gap-4">
            <p className="font-medium text-lg">Message</p>
            <div className="bg-gray-50 border p-4 rounded w-full flex gap-4 items-start">
              <MessageSquareText size={44} />
              <p>
                Hi! I'm interested in this property and available to move in by
                {` ${
                  formatPrettyDate(bookingRequest.moveInDate) ?? " - "
                }`}{" "}
                Looking forward to hearing from you
              </p>
            </div>
            {bookingRequest.status === "pending" && (
              <div className="flex gap-4 justify-end">
                <Button
                  type="button"
                  disabled={bookingRequestMutation.isPending}
                  onClick={handleDecline}
                  className="w-fit btn-danger px-6"
                >
                  Decline
                </Button>
                <Button
                  type="button"
                  disabled={bookingRequestMutation.isPending}
                  onClick={handleAccept}
                  className="w-fit btn-primary px-6"
                >
                  Approve
                </Button>
              </div>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
// export const TenantBookingRequestDetail = ({
//   bookingRequest,
//   isOpen,
//   setOpen,
// }: // closeModal,
// ModalProps) => {
//   const [useWallet, setUseWallet] = useState(false);

//   const { data: walletData } = useQuery({
//     queryKey: ["user-wallet"],
//     queryFn: () => walletService.getUserWallet(),
//     enabled: isOpen,
//   });

//   const walletBalance = walletData?.wallet?.balance || 0;
//   const otherFeesTotal =
//     bookingRequest?.otherFees?.reduce(
//       (acc, curr) => acc + (curr.amount as number),
//       0,
//     ) || 0;

//   const feesTotal = otherFeesTotal + bookingRequest?.platformFee;
//   const grandTotal = bookingRequest?.netPrice || 0;
//   const walletContribution = useWallet
//     ? Math.min(walletBalance, grandTotal)
//     : 0;
//   const paystackAmount = grandTotal - walletContribution;

//   const payForBookingRequestMutation = useMutation({
//     mutationFn: () =>
//       bookingRequestService.payForBookingRequest(bookingRequest._id, {
//         useWallet,
//       }),
//     onSuccess: async (data) => {
//       window.location.href = data.paymentURL;
//     },
//     onError: (error) => {
//       toast.error(error.message || "Something went wrong");
//       console.error(error);
//     },
//   });

//   // const { data } = useQuery({
//   //   queryKey: ["system-settin"],
//   //   queryFn: () => systemSettingsService.getSettings(),
//   // });

//   const handleGeneratePaymentLink = () => {
//     payForBookingRequestMutation.mutateAsync();
//   };

//   if (!isOpen) return null;

//   if (!bookingRequest) return null;

//   return (
//     <Dialog open={isOpen} onOpenChange={setOpen}>
//       <DialogContent aria-describedby="dialog-description">
//         <DialogHeader>
//           <DialogTitle>Booking Request</DialogTitle>
//         </DialogHeader>
//         <Separator />

//         <div className="flex flex-col gap-2">
//           {/* <div className="rounded w-full flex gap-4 items-start">
//             <House size={42} />
//             <p>
//               <strong>Description: </strong>
//               {bookingRequest.property.description}
//             </p>
//           </div> */}
//           {/* <div className="rounded w-full flex gap-4 items-start">
//             <House size={22} />
//             <p>
//               <strong>Address:</strong> {bookingRequest.property.address}
//             </p>
//           </div> */}
//           <div className="rounded w-full flex gap-4 items-start">
//             <House size={22} />
//             <p>
//               <strong>Property:</strong> {bookingRequest.property.title}
//             </p>
//           </div>

//           <div className="rounded w-full flex gap-4 items-start">
//             <House size={22} />
//             <p>
//               <strong>Pricing Model:</strong>{" "}
//               {bookingRequest.property.pricingModel}
//             </p>
//           </div>
//           <div className="rounded w-full flex gap-4 items-start">
//             <House size={22} />
//             <p>
//               <strong>Request Date:</strong>{" "}
//               {formatPrettyDate(bookingRequest.createdAt)}
//             </p>
//           </div>
//           <div className="rounded w-full flex gap-4 items-start">
//             <House size={22} />
//             <p>
//               <strong>Preferred Move-In Date:</strong>{" "}
//               {formatPrettyDate(bookingRequest.moveInDate)}
//             </p>
//           </div>

//           <div className="rounded w-full flex gap-4 items-start">
//             <House size={22} />
//             <p>
//               <strong>Total:</strong> {formatCurrency(grandTotal)}
//             </p>
//           </div>

//           {/* <div className="rounded w-full flex gap-4 items-start">
//             <House size={22} />
//             <p>
//               <strong>Service Charge:</strong>{" "}
//               {formatCurrency(bookingRequest.serviceChargeAmount)}
//             </p>
//           </div> */}
//           <div className="flex flex-col gap-1 ml-8 border-l-2 pl-3 py-1">
//             <div className="flex justify-between w-full max-w-[250px] text-sm text-muted-foreground">
//               <span>Basic rent:</span>
//               <span>{formatCurrency(bookingRequest?.basePrice)}</span>
//             </div>
//             {bookingRequest?.otherFees.map((fee, idx) => (
//               <div
//                 key={idx}
//                 className="flex justify-between w-full max-w-[250px] text-sm text-muted-foreground"
//               >
//                 <span className="capitalize">{fee.name}:</span>
//                 <span>{formatCurrency(fee.amount)}</span>
//               </div>
//             ))}
//             <div className="flex justify-between w-full max-w-[250px] text-sm text-muted-foreground">
//               <span>Platform Fee:</span>
//               <span>{formatCurrency(bookingRequest?.platformFee)}</span>
//             </div>
//           </div>
//         </div>

//         <DialogFooter className="border-t">
//           <div className="flex flex-col gap-4">
//             <p className="font-medium text-lg">Message</p>
//             <div className="bg-gray-50 border p-4 rounded w-full flex gap-4 items-start">
//               <MessageSquareText size={44} />
//               <p>
//                 Hi! I'm interested in this property and available to move in by
//                 {` ${
//                   formatPrettyDate(bookingRequest.moveInDate) ?? " - "
//                 }`}{" "}
//                 Looking forward to hearing from you
//               </p>
//             </div>
//             {bookingRequest.status === "approved" &&
//               bookingRequest.paymentStatus === "pending" && (
//                 <div className="flex gap-4 justify-end">
//                   <Button
//                     type="button"
//                     disabled={payForBookingRequestMutation.isPending}
//                     onClick={handleGeneratePaymentLink}
//                     className="w-fit btn-primary px-6"
//                   >
//                     Proceed to payment
//                   </Button>
//                 </div>
//               )}

//             {bookingRequest.paymentStatus === "success" && (
//               <div className="flex gap-4 justify-end">
//                 <Button
//                   type="button"
//                   disabled
//                   className="w-fit btn-primary bg-green-500 px-6"
//                 >
//                   Paid
//                 </Button>
//               </div>
//             )}
//           </div>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// };

interface ModalProps {
  bookingRequest: IBookingRequest;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const TenantBookingRequestDetail = ({
  bookingRequest,
  isOpen,
  setOpen,
}: ModalProps) => {
  const queryClient = useQueryClient();
  const [useWallet, setUseWallet] = useState(false);

  // Fetch wallet balance to show the user
  const { data: walletData } = useQuery({
    queryKey: ["user-wallet"],
    queryFn: () => walletService.getUserWallet(),
    enabled: isOpen,
  });

  const payForBookingRequestMutation = useMutation({
    mutationFn: () =>
      bookingRequestService.payForBookingRequest(bookingRequest._id, {
        useWallet,
      }),
    onSuccess: async (data) => {
      if (data?.paymentURL) {
        // Redirect to Paystack if there is a remaining balance
        window.location.href = data.paymentURL;
      } else {
        // Full wallet payment handled by backend
        toast.success("Payment successful via wallet!");
        queryClient.invalidateQueries({
          queryKey: ["landlord-booking-requests"],
        });
        queryClient.invalidateQueries({
          queryKey: ["tenant-booking-requests"],
        });
        setOpen(false);
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong during payment");
      console.error(error);
    },
  });

  const walletBalance = walletData?.wallet?.balance || 0;
  const grandTotal = bookingRequest?.netPrice || 0;

  // Calculate breakdown for the UI
  const walletContribution = useWallet
    ? Math.min(walletBalance, grandTotal)
    : 0;
  const paystackAmount = grandTotal - walletContribution;

  if (!isOpen || !bookingRequest) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-md" aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Booking Request Details</DialogTitle>
        </DialogHeader>
        <Separator />

        <div className="flex flex-col gap-3">
          <div className="rounded w-full flex gap-3 items-center">
            <House size={20} className="text-muted-foreground" />
            <p className="text-sm">
              <span className="font-semibold">Property:</span>{" "}
              {bookingRequest.property.title}
            </p>
          </div>

          <div className="rounded w-full flex gap-3 items-center">
            <House size={20} className="text-muted-foreground" />
            <p className="text-sm">
              <span className="font-semibold">Request Date:</span>{" "}
              {formatPrettyDate(bookingRequest.createdAt)}
            </p>
          </div>

          <div className="flex flex-col gap-1 ml-8 border-l-2 pl-3 py-1 bg-gray-50/50 rounded-r">
            <div className="flex justify-between w-full text-xs text-muted-foreground">
              <span>Basic rent:</span>
              <span>{formatCurrency(bookingRequest?.basePrice)}</span>
            </div>
            {bookingRequest?.otherFees.map((fee, idx) => (
              <div
                key={idx}
                className="flex justify-between w-full text-xs text-muted-foreground"
              >
                <span className="capitalize">{fee.name}:</span>
                <span>{formatCurrency(fee.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between w-full text-xs text-muted-foreground">
              <span>Platform Fee:</span>
              <span>{formatCurrency(bookingRequest?.platformFee)}</span>
            </div>
            <div className="flex justify-between w-full text-sm font-semibold border-t mt-1 pt-1">
              <span>Total:</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 p-3 rounded flex gap-3 items-start">
            <MessageSquareText size={20} className="text-blue-600 mt-1" />
            <p className="text-xs text-blue-900 leading-relaxed">
              Hi! I'm interested in this property and available to move in by
              {` ${formatPrettyDate(bookingRequest.moveInDate) ?? " - "}`}.
              Looking forward to hearing from you.
            </p>
          </div>
        </div>

        {/* Payment Section */}
        {bookingRequest.status === "approved" &&
          bookingRequest.paymentStatus === "pending" && (
            <div className="mt-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    Use Wallet Balance
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Available: {formatCurrency(walletBalance)}
                  </span>
                </div>
                <Switch
                  checked={useWallet}
                  onCheckedChange={setUseWallet}
                  disabled={
                    walletBalance <= 0 || payForBookingRequestMutation.isPending
                  }
                />
              </div>

              <div className="space-y-1.5 text-xs border-t border-primary/10 pt-3">
                <div className="flex justify-between">
                  <span>Total Due:</span>
                  <span>{formatCurrency(grandTotal)}</span>
                </div>
                {useWallet && walletContribution > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Wallet Deduction:</span>
                    <span>-{formatCurrency(walletContribution)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm pt-1 border-t border-dashed">
                  <span>Final Payment:</span>
                  <span
                    className={paystackAmount === 0 ? "text-green-600" : ""}
                  >
                    {formatCurrency(paystackAmount)}
                  </span>
                </div>
              </div>

              <Button
                type="button"
                disabled={payForBookingRequestMutation.isPending}
                onClick={() => payForBookingRequestMutation.mutate()}
                className="w-full mt-4 btn-primary"
              >
                {payForBookingRequestMutation.isPending
                  ? "Processing..."
                  : paystackAmount > 0
                    ? "Proceed to Paystack"
                    : "Pay Now with Wallet"}
              </Button>
            </div>
          )}

        {bookingRequest.paymentStatus === "success" && (
          <DialogFooter className="mt-4">
            <Button
              disabled
              className="w-full bg-green-500 hover:bg-green-500 text-white"
            >
              Paid Successfully
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
