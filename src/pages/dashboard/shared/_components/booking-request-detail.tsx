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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookingRequestService } from "@/api/bookingRequest.api";
import { toast } from "sonner";
import { systemSettingsService } from "@/api/admin/system-settings.api";

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
export const TenantBookingRequestDetail = ({
  bookingRequest,
  isOpen,
  setOpen,
}: // closeModal,
ModalProps) => {
  const payForBookingRequestMutation = useMutation({
    mutationFn: () =>
      bookingRequestService.payForBookingRequest(bookingRequest._id),
    onSuccess: async (data) => {
      window.location.href = data.paymentURL;
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    },
  });

  // const { data } = useQuery({
  //   queryKey: ["system-settin"],
  //   queryFn: () => systemSettingsService.getSettings(),
  // });

  const handleGeneratePaymentLink = () => {
    payForBookingRequestMutation.mutateAsync();
  };

  const otherFeesTotal =
    bookingRequest?.otherFees?.reduce(
      (acc, curr) => acc + (curr.amount as number),
      0,
    ) || 0;

  // 2. Grand Total is just Price + Calculated Fees
  // const platformFee =
  //   ((data?.platformFeePercentage || 5) / 100) *
  //   (bookingRequest?.property?.price || 0);

  const feesTotal = otherFeesTotal + bookingRequest?.platformFee;
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
            <House size={42} />
            <p>
              <strong>Description: </strong>
              {bookingRequest.property.description}
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

          <div className="rounded w-full flex gap-4 items-start">
            <House size={22} />
            <p>
              <strong>Total:</strong> {formatCurrency(grandTotal)}
            </p>
          </div>

          {/* <div className="rounded w-full flex gap-4 items-start">
            <House size={22} />
            <p>
              <strong>Service Charge:</strong>{" "}
              {formatCurrency(bookingRequest.serviceChargeAmount)}
            </p>
          </div> */}
          <div className="flex flex-col gap-1 ml-8 border-l-2 pl-3 py-1">
            <div className="flex justify-between w-full max-w-[250px] text-sm text-muted-foreground">
              <span>Basic rent:</span>
              <span>{formatCurrency(bookingRequest?.basePrice)}</span>
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
              <span>{formatCurrency(bookingRequest?.platformFee)}</span>
            </div>
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
            {bookingRequest.status === "approved" &&
              bookingRequest.paymentStatus === "pending" && (
                <div className="flex gap-4 justify-end">
                  <Button
                    type="button"
                    disabled={payForBookingRequestMutation.isPending}
                    onClick={handleGeneratePaymentLink}
                    className="w-fit btn-primary px-6"
                  >
                    Proceed to payment
                  </Button>
                </div>
              )}

            {bookingRequest.paymentStatus === "success" && (
              <div className="flex gap-4 justify-end">
                <Button
                  type="button"
                  disabled
                  className="w-fit btn-primary bg-green-500 px-6"
                >
                  Paid
                </Button>
              </div>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
