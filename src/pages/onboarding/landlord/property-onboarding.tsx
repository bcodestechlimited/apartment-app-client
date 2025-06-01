import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { propertyService } from "@/api/property.api";
import Header from "@/components/custom/header";
import { Textarea } from "@/components/ui/textarea";
import type {
  IAddProperty,
  IAddPropertyCoWorkingSpace,
} from "@/interfaces/property.interface";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/custom/multi-select";
import { FileInput } from "@/components/custom/file-input";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useLocation } from "react-router";

export function PropertyOnboarding() {
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

  const location = useLocation();
  const propertyType = location.state?.propertyType as string;

  const propertyMutation = useMutation({
    mutationFn: propertyService.addProperty,
    onSuccess: async () => {},
    onError: (error) => {
      toast.error(error.message || "Invalid OTP");
      console.error(error);
    },
  });

  const onSubmit = async (data: IAddProperty) => {
    console.log({
      ...data,
      amenities,
      type: propertyType,
      numberOfRooms: selectedRooms,
    });

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

    const formData = {
      ...data,
      amenities: selectedAmenities,
    };

    console.log("Final Form Submission:", formData);
    // propertyMutation.mutateAsync(formData);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col gap-4">
      <Header text="Property Onboarding" />
      <p>
        Tell us about property and it's features to get matched with the right
        tenant
      </p>

      <div className="border flex justify-center md:justify-between w-full p-4 rounded-lg">
        <p className=" font-semibold w-1/3 text-start hidden md:block">
          Property Information
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-3 w-full md:w-2/3"
        >
          <div className="flex flex-col gap-2 justify-between">
            <div className="flex justify-between">
              <p className=" font-semibold">Description</p>
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
              <p className="text-destructive text-sm mt-1 text-end">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className=" flex flex-col gap-4">
            <p className=" text-start font-semibold">Key Features</p>
            <div className="flex flex-col sm:flex-row justify-between gap-6 ">
              <div className="flex flex-col items-start gap-2 w-full sm:w-1/2">
                <Label htmlFor="noOfRooms">No of rooms</Label>
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
                      {/* <SelectLabel>No of rooms</SelectLabel> */}
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors?.numberOfRooms && (
                  <p className="text-destructive text-sm mt-1 text-end">
                    {errors.numberOfRooms.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-start gap-2 w-full sm:w-1/2">
                <Label htmlFor="noOfRooms">Amenities</Label>

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
                  <p className="text-destructive text-sm mt-1 text-end">
                    {errors.amenities.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className=" flex flex-col gap-4">
            <p className=" text-start font-semibold">
              Upload Images of your property
            </p>
            <FileInput
              accept=".jpg,.jpeg,.png,.pdf"
              onFilesChange={(updatedFiles) => {
                console.log({ updatedFiles });

                if (updatedFiles.length > 2) {
                  clearErrors("pictures");
                }
                setValue("pictures", updatedFiles);
              }}
            />
            {errors?.pictures && (
              <p className="text-destructive text-sm mt-1 text-end">
                {errors.pictures.message}
              </p>
            )}
          </div>
        </form>
      </div>

      <div className="flex justify-end gap-4">
        <Button className="px-10 cursor-pointer" onClick={() => {}}>
          Cancel
        </Button>
        <Button
          className="px-6 cursor-pointer"
          onClick={handleSubmit(onSubmit)}
          disabled={propertyMutation.isPending}
        >
          {propertyMutation.isPending ? "Loading..." : "Publish listing"}
        </Button>
      </div>
    </div>
  );
}

const amenities = ["Wi-Fi", "Air-Conditioner", "Power-Backup", "Coffee"];
const pricingModels = ["Hourly", "Daily", "Monthly", "Yearly"];

export function PropertyOnboardingWorkSpace() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm<IAddPropertyCoWorkingSpace>();

  return (
    <div className="w-full max-w-3xl flex flex-col gap-4 pb-6">
      <Header text="Property Onboarding" />
      <p>
        Tell us about property and it's features to get matched with the right
        tenant
      </p>

      <div className="border flex justify-center md:justify-between w-full p-4 rounded-lg">
        <p className=" font-semibold w-1/3 text-start hidden md:block">
          Property Information
        </p>
        <div className=" flex flex-col gap-3 w-full md:w-2/3">
          <div className="flex flex-col gap-2 justify-between">
            <div className="flex justify-between">
              <p className=" font-semibold">Description</p>
              <small>200 words</small>
            </div>
            <Textarea
              placeholder="Write a short overview of your property"
              className="min-h-28"
            />
          </div>

          <div className=" flex flex-col gap-4">
            <p className=" text-start font-semibold">Key Features</p>
            <div className="flex flex-col gap-2 text-sm">
              <p className=" text-start font-semibold">Add amenities</p>
              <div className="flex flex-wrap gap-2 ">
                {amenities.map((amenity) => (
                  <div className="flex items-center gap-2 border px-4 py-1 rounded-full w-fit">
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-start flex flex-col gap-2 text-sm">
              <p className=" text-start font-semibold">Set availability</p>
              <Input className=" rounded-full" />
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <p className=" text-start font-semibold">Set pricing models</p>
              <div className="flex flex-wrap gap-2 ">
                {pricingModels.map((pricingModel) => (
                  <div className="flex items-center gap-2 border px-4 py-1 rounded-full w-fit">
                    <span>{pricingModel}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-start flex flex-col gap-2 text-sm">
              <p className=" text-start font-semibold">
                Define seating capacity
              </p>
              <Input className=" rounded-full" />
            </div>

            <div className=" flex flex-col gap-4">
              <p className=" text-start font-semibold">
                Upload Images of your property
              </p>
              <FileInput
                accept=".jpg,.jpeg,.png,.pdf"
                onFilesChange={(updatedFiles) => {
                  console.log({ updatedFiles });
                  if (updatedFiles.length > 2) {
                    clearErrors("pictures");
                  }
                  setValue("pictures", updatedFiles);
                }}
              />
              {errors?.pictures && (
                <p className="text-destructive text-sm mt-1 text-end">
                  {errors.pictures.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button className="px-10 cursor-pointer">Cancel</Button>
        <Button className="px-6 cursor-pointer">Publish listing</Button>
      </div>
    </div>
  );
}
