import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "@/api/property.api";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  amenities,
  facilities,
  pricingModels,
  propertyTypes,
  type IEditProperty,
  type IProperty,
} from "@/interfaces/property.interface";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import CustomMultiSelect from "@/components/custom/custom-multi-select";
import { CalendarIcon, CircleAlert } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  NIGERIAN_STATES,
  NIGERIAN_STATE_CITIES,
} from "@/constants/nigerian-states";
import { FileUpdateInput } from "@/components/custom/file-update-input";

interface EditPropertyModalProps {
  isOpen: boolean;
  closeModal: () => void;
  property: IProperty;
}

export default function EditPropertyModal({
  isOpen,
  closeModal,
  property,
}: EditPropertyModalProps) {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<string | null>(null);
  const [selectedBathrooms, setSelectedBathrooms] = useState<string | null>(
    null
  );
  const [propertyType, setPropertyType] = useState<string | null>(null);

  const [availabilityDate, setAvailabilityDate] = useState<Date | undefined>(
    undefined
  );

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<IEditProperty>({
    defaultValues: {
      title: property.title,
      description: property.description,
      type: property.type,
      address: property.address,
      state: property.state,
      lga: property.lga,
      availabilityDate: property.availabilityDate,
      price: property.price,
      pricingModel: property.pricingModel,
      existingPictures: property.pictures,
      numberOfBedRooms: String(property.numberOfBedRooms),
      numberOfBathrooms: String(property.numberOfBathrooms),
    },
  });

  // const newPictures = watch("newPictures") || [];
  const selectedState = watch("state") || property.state || "Lagos";

  useEffect(() => {
    setSelectedAmenities(property.amenities || []);
    setSelectedFacilities(property.facilities || []);
    setSelectedRooms(String(property.numberOfBedRooms));
    setSelectedBathrooms(String(property.numberOfBathrooms));
    setAvailabilityDate(
      property.availabilityDate
        ? new Date(property.availabilityDate)
        : undefined
    );
    setValue("existingPictures", property.pictures); // You might keep this empty or preload if handling existing images
  }, [property, setValue]);

  const updateMutation = useMutation({
    mutationFn: (formData: FormData) =>
      propertyService.updateProperty(property._id, formData),
    onSuccess: () => {
      toast.success("Property updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["landlord-properties"] });
      closeModal();
    },
    onError: (error) => {
      toast.error("Failed to update property");
      console.error(error);
    },
  });

  const runCustomValidation = (data: IEditProperty) => {
    let hasError = false;

    if (!data.description || data.description.length < 10) {
      setError("description", {
        type: "manual",
        message: "Description must be at least 10 characters",
      });
      hasError = true;
    }

    if (!data.address) {
      setError("address", {
        type: "manual",
        message: "Please enter an address",
      });
      hasError = true;
    }

    if (!data.state) {
      setError("state", {
        type: "manual",
        message: "Please select a state",
      });
      hasError = true;
    }

    if (!data.lga) {
      setError("lga", {
        type: "manual",
        message: "Please select a local government",
      });
      hasError = true;
    }

    if (!data.availabilityDate) {
      setError("availabilityDate", {
        type: "manual",
        message: "Please select an availability date",
      });
      hasError = true;
    }

    if (!data.price) {
      setError("price", {
        type: "manual",
        message: "Please enter a price",
      });
      hasError = true;
    }

    if (!data.pricingModel) {
      setError("pricingModel", {
        type: "manual",
        message: "Please select a pricing model",
      });
      hasError = true;
    }

    if (selectedAmenities.length === 0) {
      setError("amenities", {
        type: "manual",
        message: "Please select at least one amenity",
      });
      hasError = true;
    }

    if (selectedFacilities.length === 0) {
      setError("facilities", {
        type: "manual",
        message: "Please select at least one facility",
      });
      hasError = true;
    }

    if (!selectedRooms) {
      setError("numberOfBedRooms", {
        type: "manual",
        message: "Please select number of bedrooms",
      });
      hasError = true;
    }

    if (!selectedBathrooms) {
      setError("numberOfBathrooms", {
        type: "manual",
        message: "Please select number of bathrooms",
      });
      hasError = true;
    }

    return hasError;
  };

  const onSubmit = (data: IEditProperty) => {
    const hasError = runCustomValidation(data);
    if (hasError) return;

    const formData = new FormData();
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("state", data.state);
    formData.append("lga", data.lga);
    formData.append(
      "availabilityDate",
      data.availabilityDate ? data.availabilityDate.toLocaleString() : ""
    );
    formData.append(
      "price",
      data.price !== undefined ? String(data.price) : ""
    );
    formData.append("pricingModel", data.pricingModel.toLowerCase());
    formData.append("amenities", JSON.stringify(selectedAmenities));
    formData.append("facilities", JSON.stringify(selectedFacilities));
    formData.append("numberOfBedRooms", String(selectedRooms));
    formData.append("numberOfBathrooms", String(selectedBathrooms));
    formData.append("type", property.type); // keep original type
    for (let i = 0; i < data.newPictures?.length; i++) {
      formData.append("newPictures", data.newPictures[i]);
    }
    formData.append("existingPictures", JSON.stringify(data.existingPictures));

    console.log({ data });

    updateMutation.mutateAsync(formData);
  };

  console.log({ property });

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
          <DialogDescription>
            Update your property details below
          </DialogDescription>
        </DialogHeader>

        {/* You can now reuse the same layout/components as AddPropertyModal here */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <Label className="text-start font-bold" htmlFor="title">
              Title
            </Label>
            <Input placeholder="Enter title" {...register("title")} />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea {...register("description")} className="min-h-24" />
            {errors.description && (
              <p className="text-destructive text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Type */}
          <div className=" flex flex-col gap-2">
            <Label className="text-start font-bold" htmlFor="state">
              Property Type
            </Label>
            <Input type="text" {...register("type")} className="hidden" />

            <Select
              onValueChange={(value) => {
                setPropertyType(value);
                setValue("type", value);
                clearErrors(["type"]);
              }}
              defaultValue={property.type}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-select-" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <SelectGroup>
                  {propertyTypes.map((propertyType) => (
                    <SelectItem
                      key={propertyType}
                      value={String(
                        propertyType.replace(" ", "-").toLowerCase()
                      )}
                      className="capitalize"
                    >
                      {propertyType}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors?.state && (
              <p className="text-destructive text-sm text-end">
                {errors.state.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Address */}
            <div className="flex flex-col gap-2">
              <Label>Address</Label>
              <Input {...register("address")} />
              {errors.address && (
                <p className="text-destructive text-sm">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <Label>Price</Label>
              <Input type="number" {...register("price")} />
              {errors.price && (
                <p className="text-destructive text-sm">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* State */}
            <div className="flex flex-col gap-2">
              <Label>State</Label>
              <Input type="text" {...register("state")} className="hidden" />
              <Select
                onValueChange={(value) => {
                  setValue("state", value);
                  clearErrors("state");
                }}
                defaultValue={property.state}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {NIGERIAN_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.state && (
                <p className="text-destructive text-sm">
                  {errors.state.message}
                </p>
              )}
            </div>

            {/* LGA */}
            <div className="flex flex-col gap-2">
              <Label>LGA</Label>
              <Input type="text" {...register("lga")} className="hidden" />
              <Select
                onValueChange={(value) => {
                  setValue("lga", value);
                  clearErrors("lga");
                }}
                defaultValue={property.lga}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an LGA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {NIGERIAN_STATE_CITIES[selectedState]?.map((lga) => (
                      <SelectItem key={lga} value={lga}>
                        {lga}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.lga && (
                <p className="text-destructive text-sm">{errors.lga.message}</p>
              )}
            </div>

            {/* Availability Date  */}
            <div className=" flex flex-col gap-2">
              <Label
                className="text-start font-bold"
                htmlFor="availabilityDate"
              >
                Avalability Date
              </Label>
              <Input
                type="text"
                {...register("availabilityDate")}
                className="hidden"
              />
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full pl-3 text-left font-normal"
                  >
                    {availabilityDate
                      ? availabilityDate.toISOString().split("T")[0]
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
                    selected={availabilityDate}
                    onSelect={(date) => {
                      console.log(date);
                      if (!date) {
                        return;
                      }
                      console.log(date?.toISOString());

                      const newDate = date;

                      setAvailabilityDate(newDate);
                      setValue("availabilityDate", newDate.toISOString());

                      clearErrors(["availabilityDate"]);
                    }}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border bg-white z-50"
                  />
                </PopoverContent>
              </Popover>

              {errors?.availabilityDate && (
                <p className="text-destructive text-sm text-end">
                  {errors.availabilityDate.message}
                </p>
              )}
            </div>

            {/* Pricing Model  */}
            <div className=" flex flex-col gap-2">
              <Label className="text-start font-bold" htmlFor="pricingModel">
                Pricing Model
              </Label>
              <Input
                type="text"
                {...register("pricingModel")}
                className="hidden"
              />

              <Select
                defaultValue={property.pricingModel}
                onValueChange={(value) => {
                  setSelectedRooms(value);
                  setValue("pricingModel", value);
                  clearErrors(["pricingModel"]);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {pricingModels.map((pricingModel) => (
                      <SelectItem
                        key={pricingModel}
                        value={String(pricingModel.toLowerCase())}
                      >
                        {pricingModel}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors?.pricingModel && (
                <p className="text-destructive text-sm text-end">
                  {errors.pricingModel.message}
                </p>
              )}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <p className="font-semibold tracking-wide">Key Features</p>
            <div className="flex flex-col sm:flex-row gap-6 mt-2">
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <Label>No of bedrooms</Label>
                <Input
                  type="string"
                  {...register("numberOfBedRooms")}
                  className="hidden"
                />
                <Select
                  onValueChange={(value) => {
                    setSelectedRooms(value);
                    setValue("numberOfBedRooms", value);
                    clearErrors(["numberOfBedRooms"]);
                  }}
                  defaultValue={property.numberOfBedRooms?.toString()}
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
                {errors?.numberOfBedRooms && (
                  <p className="text-destructive text-sm text-end">
                    {errors.numberOfBedRooms.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <Label>No of bathrooms</Label>
                <Input
                  type="string"
                  {...register("numberOfBathrooms")}
                  className="hidden"
                />
                <Select
                  onValueChange={(value) => {
                    setSelectedBathrooms(value);
                    setValue("numberOfBathrooms", value);
                    clearErrors(["numberOfBathrooms"]);
                  }}
                  defaultValue={property.numberOfBathrooms?.toString()}
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
                {errors?.numberOfBathrooms && (
                  <p className="text-destructive text-sm text-end">
                    {errors.numberOfBathrooms.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Amenities and Facilites */}
          <div>
            <p className="font-semibold tracking-wide">Amenities</p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2 mt-2">
                <span className="font-semibold text-sm flex gap-2 items-center">
                  Add unit features
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <CircleAlert className=" cursor-pointer" size={14} />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        This includes only amenities available inside the unit
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </span>
                <CustomMultiSelect
                  options={amenities}
                  selected={selectedAmenities}
                  onSelect={(value) => {
                    setSelectedAmenities(value);
                    setValue("amenities", value);
                    clearErrors(["amenities"]);
                  }}
                />
                {errors?.amenities && (
                  <p className="text-destructive text-sm text-end">
                    {errors.amenities.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <span className="font-semibold text-sm flex gap-2 items-center">
                  Add facilities
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <CircleAlert className=" cursor-pointer" size={14} />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        This includes only facilities available outside the unit
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </span>
                <CustomMultiSelect
                  options={facilities}
                  selected={selectedFacilities}
                  onSelect={(value) => {
                    setSelectedFacilities(value);
                    setValue("facilities", value);
                    clearErrors(["facilities"]);
                  }}
                />
                {errors?.facilities && (
                  <p className="text-destructive text-sm text-end">
                    {errors.facilities.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* File Upload */}
          <div className="flex flex-col gap-2 mt-2">
            <Label>Upload Images of your property</Label>
            <FileUpdateInput
              existingImages={property.pictures}
              onChange={(existing, newFiles) => {
                setValue("existingPictures", existing); // new hidden field you'll add
                setValue("newPictures", newFiles); // form field
              }}
            />
          </div>

          {/* Pricing Model, Availability, Rooms/Baths, Amenities, Facilities, FileInput */}
          {/* Reuse the same layout from AddPropertyModal or call a shared FormContent component if refactored */}

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="btn-primary"
            >
              {updateMutation.isPending ? "Updating..." : "Update Property"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
