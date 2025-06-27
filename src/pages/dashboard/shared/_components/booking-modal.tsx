import type { IProperty } from "@/interfaces/property.interface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "@/api/property.api";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  Calendar1,
  CreditCard,
  House,
  MapPin,
  MessageSquareText,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  closeModal: () => void;
  property: IProperty;
}

export default function BookingModal({
  isOpen,
  setOpen,
  closeModal,
  property,
}: ModalProps) {
  const queryClient = useQueryClient();

  const propertyMutation = useMutation({
    mutationFn: () =>
      propertyService.updateProperty(property._id, {
        isDeleted: true,
      }),
    onSuccess: async () => {
      toast.success("Property deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["landlord-properties"] });
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent>
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
          <div className="flex gap-2">
            <Calendar1 />
            <p className="capitalize">{property.pricingModel}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold">Property Type:</p>
            <p>{property.type}</p>
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
              <div className="flex flex-col gap-2">
                <p>Recurring Booking</p>
                <p>{formatCurrency(Number(property?.price) + 10000)} </p>
              </div>
            </div>
            <p className="font-medium text-lg">Message</p>
            <div className="bg-gray-50 border p-4 rounded w-full flex gap-4 items-start">
              <MessageSquareText size={44} />
              <p>
                Hi! I'm interested in this property and available to move in by
                April 25. Looking forward to hearing from you
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  propertyMutation.mutate();
                }}
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
