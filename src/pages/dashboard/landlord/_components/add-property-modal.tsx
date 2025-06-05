import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { propertyService } from "@/api/property.api";
import { useState } from "react";
import { useNavigate } from "react-router";

import Header from "@/components/custom/header";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/custom/multi-select";
import { FileInput } from "@/components/custom/file-input";
import type { IAddProperty } from "@/interfaces/property.interface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface AddPropertyModalProps {
  //   propertyType: string; // <-- added back this comment
  isOpen: boolean;
  closeModal: () => void;
}

export default function AddPropertyModal({
  //   propertyType, // <-- added back this comment
  isOpen,
  closeModal,
}: AddPropertyModalProps) {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<IAddProperty>();

  const navigate = useNavigate();

  const propertyMutation = useMutation({
    mutationFn: propertyService.addProperty,
    onSuccess: async () => {
      toast.success("Property added successfully!");
      closeModal();
      navigate("/dashboard/landlord");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    },
  });

  const onSubmit = async (data: IAddProperty) => {
    if (selectedAmenities.length === 0) {
      setError("amenities", {
        type: "manual",
        message: "Please select at least one amenity",
      });
      return;
    }
    if (!data.pictures || data.pictures.length <= 2) {
      setError("pictures", {
        type: "manual",
        message: "Please upload at least 3 pictures",
      });
      return;
    }
    if (!selectedRooms) {
      setError("numberOfRooms", {
        type: "manual",
        message: "Please select number of rooms",
      });
      return;
    }

    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("amenities", JSON.stringify(selectedAmenities));
    // formData.append("type", propertyType.toLowerCase());
    formData.append("type", "serviced-apartment"); // hardcoded for now
    formData.append("numberOfRooms", String(selectedRooms));
    for (let i = 0; i < data.pictures.length; i++) {
      formData.append("pictures", data.pictures[i]);
    }

    propertyMutation.mutateAsync(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-2">Add Property</DialogTitle>
          <DialogDescription>
            Tell us about the property and its features to get matched with the
            right tenant
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Description */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="font-semibold">Description</p>
              <small>200 words</small>
            </div>
            <Textarea
              placeholder="Write a short overview of your property"
              className="min-h-28"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors?.description && (
              <p className="text-destructive text-sm text-end">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Features */}
          <div>
            <p className="font-semibold">Key Features</p>
            <div className="flex flex-col sm:flex-row gap-6 mt-2">
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <Label>No of Rooms</Label>
                <Select
                  onValueChange={(value) => {
                    setSelectedRooms(value);
                    clearErrors(["numberOfRooms"]);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-select-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors?.numberOfRooms && (
                  <p className="text-destructive text-sm text-end">
                    {errors.numberOfRooms.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <Label>Amenities</Label>
                <MultiSelect
                  options={[
                    "Wi-Fi",
                    "Air-Conditioner",
                    "Power-Backup",
                    "Coffee",
                  ]}
                  selected={selectedAmenities}
                  onChange={(value) => {
                    setSelectedAmenities(value);
                    clearErrors("amenities");
                  }}
                  placeholder="Search..."
                />
                {errors?.amenities && (
                  <p className="text-destructive text-sm text-end">
                    {errors.amenities.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-2">
            <Label>Upload Images</Label>
            <FileInput
              accept=".jpg,.jpeg,.png,.pdf"
              onFilesChange={(updatedFiles) => {
                if (updatedFiles.length > 2) {
                  clearErrors("pictures");
                }
                setValue("pictures", updatedFiles);
              }}
            />
            {errors?.pictures && (
              <p className="text-destructive text-sm text-end">
                {errors.pictures.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-4">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={propertyMutation.isPending}>
              {propertyMutation.isPending ? "Loading..." : "Publish Listing"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
