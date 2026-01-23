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

export default function DeletePropertyModal({
  open,
  setOpen,
  property,
  closeModal,
}: ModalProps) {
  const queryClient = useQueryClient();

  const propertyMutation = useMutation({
    mutationFn: () => propertyService.softDeleteProperty(property._id),
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Property</DialogTitle>
          <DialogDescription className="text-red-500">
            Are you sure you want to permanently delete this property
            <span className="font-semibold text-black">{property.title}</span>?
            This action cannot be undone.
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
