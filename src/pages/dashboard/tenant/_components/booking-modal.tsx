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
  date: Date;
  dateString: string;
}

export default function BookingModal({
  isOpen,
  setOpen,
  closeModal,
  property,
}: ModalProps) {
  const [availabilityDate, setAvailabilityDate] = useState<Date | undefined>(
    undefined
  );
  const [moveInDate, setMoveInDate] = useState<IMoveInDate>({
    date: new Date(),
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
      bookingRequestService.createBookingRequest({ propertyId, moveInDate }),
    onSuccess: async () => {
      toast.success("Booking request sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["property"] });
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    },
  });

  async function hanldeSubmit() {
    const now = new Date();
    const moveInDateTime = new Date(moveInDate.dateString).setHours(0, 0, 0, 0);
    const currentDateTime = now.setHours(0, 0, 0, 0);

    if (moveInDateTime < currentDateTime) {
      return toast.error("Please select a valid move-in date");
    }

    // return;
    propertyMutation.mutateAsync({
      propertyId: property._id,
      moveInDate: moveInDate.dateString,
    });
  }

  const getActualAvailabilityDate = (date: Date | string | undefined): Date => {
    if (!date) return new Date();
    return new Date(date);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Request to Book</DialogTitle>
          {/* <DialogDescription className="text-red-500">
            Are you sure you want to permanently delete this property
            <span className="font-semibold text-black">{property.title}</span>?
            This action cannot be undone.
          </DialogDescription> */}
        </DialogHeader>
        <Separator />

        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <p className="font-semibold">
              <House />
            </p>
            <p>{property.description}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">
              <MapPin />
            </p>
            <p>{property.address}</p>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">
              <CreditCard />
            </span>
            <p>{formatCurrency(Number(property?.price))} </p>
          </div>
          <div className="flex gap-2">
            <Calendar1 />
            <p className="capitalize">{property.pricingModel}</p>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-start font-bold">
              Preferred Move in date
            </Label>
            <Popover modal={true}>
              <PopoverTrigger asChild className="w-[20px]">
                <Button
                  variant={"outline"}
                  className="w-full pl-3 text-left font-normal"
                >
                  {availabilityDate
                    ? formatDate(availabilityDate)
                    : "Pick a date"}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 flex justify-end"
                align="center"
              >
                <Calendar
                  mode="single"
                  required
                  selected={availabilityDate}
                  onSelect={(date: Date) => {
                    if (!date) {
                      return;
                    }
                    setMoveInDate({
                      date,
                      dateString: formatDate(date),
                    });
                    setAvailabilityDate(date);
                  }}
                  disabled={(date) =>
                    date < getActualAvailabilityDate(property.availabilityDate)
                  }
                  className="rounded-md border bg-white z-50"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Property Type:</p>
            <p className="capitalize">{property.type.replace("-", " ")}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Available From:</p>
            <p className="capitalize">
              {formatPrettyDate(property.availabilityDate)}
            </p>
          </div>
        </div>
        <DialogFooter className="border-t">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex w-full gap-6 py-4">
              <div className="flex flex-col gap-2">
                <p>Total amount to be paid</p>
                <p className="font-semibold text-xl">
                  {formatCurrency(Number(property?.price) + 10000)}{" "}
                </p>
              </div>
              {/* <div className="flex flex-col gap-2">
                <p>Recurring Booking</p>
                <p>{formatCurrency(Number(property?.price) + 10000)} </p>
              </div> */}
            </div>
            <p className="font-medium text-lg">Message</p>
            <div className="bg-gray-50 border p-4 rounded w-full flex gap-4 items-start">
              <MessageSquareText size={44} />
              <p>
                Hi! I'm interested in this property and available to move in by
                {` ${formatPrettyDate(moveInDate.dateString) ?? " - "}`} Looking
                forward to hearing from you
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                disabled={propertyMutation.isPending}
                onClick={hanldeSubmit}
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
