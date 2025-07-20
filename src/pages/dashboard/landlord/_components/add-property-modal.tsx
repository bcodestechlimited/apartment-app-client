import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "@/api/property.api";
import { useState } from "react";
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
import { FileInput } from "@/components/custom/file-input";
import {
  amenities,
  facilities,
  pricingModels,
  propertyTypes,
  type IAddProperty,
} from "@/interfaces/property.interface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import CustomMultiSelect from "@/components/custom/custom-multi-select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CalendarIcon, CircleAlert } from "lucide-react";
import {
  NIGERIAN_STATE_CITIES,
  NIGERIAN_STATES,
} from "@/constants/nigerian-states";

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
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
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
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IAddProperty>();

  const pictures = watch("pictures") || [];
  const selectedState = watch("state") || "Lagos";

  const propertyMutation = useMutation({
    mutationFn: propertyService.addProperty,
    onSuccess: async () => {
      toast.success("Property added successfully!");
      queryClient.invalidateQueries({ queryKey: ["landlord-properties"] });
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    },
  });

  const runCustomValidation = (data: any) => {
    let hasError = false;

    if (data.title === "") {
      setError("title", {
        type: "manual",
        message: "Please enter a title",
      });
      hasError = true;
    }

    if (data.title.length < 10) {
      setError("title", {
        type: "manual",
        message: "Title must be at least 10 characters",
      });
      hasError = true;
    }

    if (data.description === "") {
      setError("description", {
        type: "manual",
        message: "Please enter a description",
      });
      hasError = true;
    }

    if (data.description.length < 10) {
      setError("description", {
        type: "manual",
        message: "Description must be at least 10 characters",
      });
      hasError = true;
    }

    if (data.address === "" || !data.address) {
      setError("address", {
        type: "manual",
        message: "Please enter an address",
      });
      hasError = true;
    }

    if (data.state === "" || !data.state) {
      setError("state", {
        type: "manual",
        message: "Please select a state",
      });
      hasError = true;
    }

    if (data.lga === "" || !data.lga) {
      setError("lga", {
        type: "manual",
        message: "Please select a local government",
      });
      hasError = true;
    }

    if (data.availabilityDate === "" || !data.availabilityDate) {
      setError("availabilityDate", {
        type: "manual",
        message: "Please select an availability date",
      });
      hasError = true;
    }

    if (data.price === null || !data.price) {
      setError("price", {
        type: "manual",
        message: "Please enter a price",
      });
      hasError = true;
    }

    if (data.pricingModel === "") {
      setError("pricingModel", {
        type: "manual",
        message: "Please select a pricing model",
      });
      hasError = true;
    }

    if (data.description === "") {
      setError("description", {
        type: "manual",
        message: "Please enter a description",
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
        message: "Please select number of rooms",
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

    if (!watch("pictures") || watch("pictures").length < 2) {
      setError("pictures", {
        type: "manual",
        message: "Please upload at least 3 pictures",
      });
      hasError = true;
    }

    return hasError;
  };

  const onSubmit = async (data: IAddProperty) => {
    console.log("Form submitted");
    console.log({ data });

    const hasErrors = runCustomValidation(data);
    if (hasErrors) return;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("state", data.state);
    formData.append("lga", data.lga);
    formData.append("availabilityDate", data.availabilityDate);
    formData.append("price", String(data.price));
    formData.append("pricingModel", data.pricingModel.toLowerCase());
    formData.append("amenities", JSON.stringify(selectedAmenities));
    formData.append("facilities", JSON.stringify(selectedFacilities));
    formData.append("type", data.type.replace(" ", "-").toLowerCase());
    // formData.append("type", "serviced-apartment"); // hardcoded for now
    formData.append("numberOfBedRooms", String(selectedRooms));
    formData.append("numberOfBathrooms", String(selectedBathrooms));
    for (let i = 0; i < data.pictures.length; i++) {
      formData.append("pictures", data.pictures[i]);
    }

    propertyMutation.mutateAsync(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-2">Add Property</DialogTitle>
          <DialogDescription>
            Tell us about the property and its features to get matched with the
            right tenant
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <Label className="text-start font-bold" htmlFor="title">
              Title
            </Label>
            <Input placeholder="Enter title" {...register("title")} />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <p className="font-semibold">Description</p>
              <small>200 words</small>
            </div>
            <Textarea
              placeholder="Write a short overview of your property"
              className="min-h-28"
              {...register("description")}
            />
            {errors?.description && (
              <p className="text-destructive text-sm text-end">
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
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="-select-" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <SelectGroup>
                  {propertyTypes.map((propertyType) => (
                    <SelectItem
                      key={propertyType}
                      value={String(propertyType)}
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

          <div className="grid grid-cols-2 gap-6">
            {/* Address  */}
            <div className=" flex flex-col gap-2">
              <Label className="text-start font-bold" htmlFor="address">
                Address
              </Label>

              <Input
                id="address"
                type="text"
                placeholder="Enter price"
                {...register("address")}
              />

              {errors?.address && (
                <p className="text-destructive text-sm text-end">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Price  */}
            <div className=" flex flex-col gap-2">
              <Label className="text-start font-bold" htmlFor="price">
                Price
              </Label>

              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                {...register("price")}
              />
              {errors?.price && (
                <p className="text-destructive text-sm text-end">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* State */}
            <div className=" flex flex-col gap-2">
              <Label className="text-start font-bold" htmlFor="state">
                State
              </Label>
              <Input type="text" {...register("state")} className="hidden" />

              <Select
                onValueChange={(value) => {
                  setValue("state", value);
                  clearErrors(["state"]);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-select-" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectGroup>
                    {NIGERIAN_STATES.map((state) => (
                      <SelectItem key={state} value={String(state)}>
                        {state}
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

            {/* Local Government Area */}
            <div className=" flex flex-col gap-2">
              <Label className="text-start font-bold" htmlFor="lga">
                LGA
              </Label>
              <Input type="text" {...register("lga")} className="hidden" />

              <Select
                onValueChange={(value) => {
                  setValue("lga", value);
                  clearErrors(["lga"]);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {NIGERIAN_STATE_CITIES[selectedState].map((lga) => (
                      <SelectItem key={lga} value={String(lga)}>
                        {lga}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors?.lga && (
                <p className="text-destructive text-sm text-end">
                  {errors.lga.message}
                </p>
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
                    required
                    selected={availabilityDate}
                    onSelect={(date: Date) => {
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
                    disabled={(date: Date) => date < new Date()}
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
                onValueChange={(value) => {
                  setValue("pricingModel", value);
                  clearErrors(["pricingModel"]);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {pricingModels.map((num) => (
                      <SelectItem key={num} value={String(num)}>
                        {num}
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
            <FileInput
              accept=".jpg,.jpeg,.png"
              value={pictures}
              multiple
              customMessage="min of 3 images (exterior view, interior view, key features)"
              numberOfFiles={2}
              onFilesChange={(updatedFiles) => {
                console.log({ updatedFiles });

                if (updatedFiles.length > 1) {
                  clearErrors("pictures");
                  setValue("pictures", updatedFiles);
                } else {
                  setError("pictures", {
                    type: "manual",
                    message: "Please upload at least 3 pictures",
                  });
                }
              }}
              errorMessage={errors.pictures?.message}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={propertyMutation.isPending}
              // className="cursor-pointer bg-custom-primary hover:bg-custom-primary/90"
              className="btn-primary"
            >
              {propertyMutation.isPending ? "Publishing..." : "Publish Listing"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
