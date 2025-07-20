import { bookingRequestService } from "@/api/bookingRequest.api";
import { Loader } from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";

interface ModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  closeModal: () => void;
  bookingRequestId: string;
}

export default function BookingRequestPaymentSuccessfulModal({
  isOpen,
  setOpen,
  closeModal,
  bookingRequestId,
}: ModalProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["booking-request", { bookingRequestId }],
    queryFn: () => bookingRequestService.getBookingRequest(bookingRequestId),
  });

  const bookingRequest = data?.bookingRequest;

  if (!bookingRequest) return null;

  if (isLoading) return <Loader />;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Successful</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <p>
            Your payment for <strong>{bookingRequest.property.title}</strong>{" "}
            has been successfully processed.
          </p>
          {/* <p>
            Your booking request ID is <strong>{bookingRequest._id}</strong>.
          </p> */}
          <p>
            Your booking request has been marked as paid. You can view the
            details of your booking request in the <strong>History</strong>{" "}
            section of your bookings.
          </p>
        </div>

        <DialogFooter>
          <Button
            className="cursor-pointer btn-primary"
            variant="outline"
            onClick={closeModal}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
