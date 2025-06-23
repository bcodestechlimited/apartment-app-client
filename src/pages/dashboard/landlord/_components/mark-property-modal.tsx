import { propertyService } from "@/api/property.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IProperty } from "@/interfaces/property.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  closeModal: () => void;
  property: IProperty;
}

export default function MarkPropertyModal({
  open,
  setOpen,
  closeModal,
  property,
}: ModalProps) {
  const queryClient = useQueryClient();

  const propertyMutation = useMutation({
    mutationFn: () =>
      propertyService.updateProperty(property._id, {
        isAvailable: !property.isAvailable,
      }),
    onSuccess: async () => {
      toast.success("Property updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["landlord-properties"] });
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark as Unavailable</DialogTitle>
          <DialogDescription>
            Are you sure you want to mark this property as{" "}
            {property.isAvailable ? "unavailable" : "available"}?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <Button
            variant={"outline"}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant={"destructive"}
            className="cursor-pointer"
            disabled={propertyMutation.isPending}
            onClick={() => propertyMutation.mutateAsync()}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
