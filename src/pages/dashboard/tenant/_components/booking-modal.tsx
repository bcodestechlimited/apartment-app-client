import type { IProperty } from "@/interfaces/property.interface";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  Calendar1,
  CalendarIcon,
  CreditCard,
  House,
  MapPin,
  MessageSquareText,
} from "lucide-react";
import { formatCurrency, formatDate, formatPrettyDate } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { bookingRequestService } from "@/api/bookingRequest.api";

interface ModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  closeModal: () => void;
  property: IProperty;
}

interface IMoveInDate {
  date: Date | null;
  dateString: string;
}

export default function BookingModal({
  isOpen,
  setOpen,
  closeModal,
  property,
}: ModalProps) {
  const [availabilityDate, setAvailabilityDate] = useState<Date | undefined>();
  const [moveInDate, setMoveInDate] = useState<IMoveInDate>({
    date: null,
    dateString: "",
  });

  const queryClient = useQueryClient();

  const propertyMutation = useMutation({
    mutationFn: ({
      propertyId,
      moveInDate,
    }: {
      propertyId: string;
      moveInDate: string;
    }) =>
      bookingRequestService.createBookingRequest({
        propertyId,
        moveInDate,
      }),
    onSuccess: async () => {
      toast.success("Booking request sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["property"] });
      closeModal();
    },
    onError: (error: any) => {
      toast.error(error.message || "Something went wrong");
    },
  });

  function handleSubmit() {
    if (!moveInDate.dateString) {
      return toast.error("Please select a move-in date");
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const selectedDate = new Date(moveInDate.dateString);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate.getTime() < now.getTime()) {
      return toast.error("Please select a valid move-in date");
    }

    propertyMutation.mutate({
      propertyId: property._id,
      moveInDate: moveInDate.dateString,
    });
  }

  const getMinAllowedDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const availability = new Date(property.availabilityDate);
    availability.setHours(0, 0, 0, 0);

    return today > availability ? today : availability;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        aria-describedby="dialog-description"
        className="max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Request to Book</DialogTitle>
        </DialogHeader>

        <Separator />

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <House />
            <p>{property.description}</p>
          </div>

          <div className="flex gap-2">
            <MapPin />
            <p>{property.address}</p>
          </div>

          <div className="flex gap-2">
            <CreditCard />
            <p>{formatCurrency(property.price)}</p>
          </div>

          <div className="flex gap-2">
            <Calendar1 />
            <p>{property.pricingModel}</p>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col gap-2">
            <Label className="text-start font-bold">
              Preferred Move-in Date
            </Label>

            <Popover modal>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full pl-3 text-left font-normal"
                >
                  {availabilityDate
                    ? formatDate(availabilityDate)
                    : "Pick a date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  required
                  selected={availabilityDate}
                  onSelect={(date: Date) => {
                    if (!date) return;

                    setAvailabilityDate(date);
                    setMoveInDate({
                      date,
                      dateString: formatDate(date),
                    });
                  }}
                  disabled={(date) => date < getMinAllowedDate()}
                  className="rounded-md border bg-white z-50"
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex gap-2">
            <p className="font-semibold">Available From:</p>
            <p>{formatPrettyDate(property.availabilityDate)}</p>
          </div>
        </div>

        <DialogFooter className="border-t mt-4 pt-4">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex w-full gap-6 py-4">
              <div>
                <p>Total amount to be paid</p>
                <p className="font-semibold text-xl">
                  {formatCurrency(property.price + 10000)}
                </p>
              </div>
            </div>

            <p className="font-medium text-lg">Message</p>

            <div className="bg-gray-50 border p-4 rounded flex gap-4 items-start">
              <MessageSquareText size={44} />
              <p>
                Hi! I'm interested in this property and available to move in by{" "}
                {moveInDate.dateString
                  ? formatPrettyDate(moveInDate.dateString)
                  : "—"}
                . Looking forward to hearing from you!
              </p>
            </div>

            <div className="flex justify-end">
              <Button
                disabled={propertyMutation.isPending}
                onClick={handleSubmit}
                className="w-fit btn-primary px-6"
              >
                Submit Request
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
