import type { IProperty } from "@/interfaces/property.interface";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "@/api/property.api";
import { toast } from "sonner";

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
          <DialogTitle>Booking Details</DialogTitle>
          {/* <DialogDescription className="text-red-500">
            Are you sure you want to permanently delete this property
            <span className="font-semibold text-black">{property.title}</span>?
            This action cannot be undone.
          </DialogDescription> */}
        </DialogHeader>
        
       
      </DialogContent>
    </Dialog>
  );
}
