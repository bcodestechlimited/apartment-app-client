import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { propertyService } from "@/api/property.api";
import Header from "@/components/custom/header";
import { Textarea } from "@/components/ui/textarea";
import {
  amenities,
  facilities,
  pricingModels,
  propertyTypes,
  type IAddProperty,
} from "@/interfaces/property.interface";
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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router";
import CustomMultiSelect from "@/components/custom/custom-multi-select";
import { CalendarIcon, CircleAlert } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  NIGERIAN_STATE_CITIES,
  NIGERIAN_STATES,
} from "@/constants/nigerian-states";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";

// // Schema for validation
// const propertySchema = z.object({
//   title: z
//     .string()
//     .min(1, "Please enter a title")
//     .min(10, "Title must be at least 10 characters"),
//   description: z
//     .string()
//     .min(1, "Please enter a description")
//     .min(10, "Description must be at least 10 characters"),
//   type: z.string().min(1, "Please select a property type"),
//   address: z.string().min(1, "Please enter an address"),
//   state: z.string().min(1, "Please select a state"),
//   lga: z.string().min(1, "Please select a local government"),
//   availabilityDate: z.string().min(1, "Please select an availability date"),
//   price: z.number().min(1, "Please enter a valid price"),
//   pricingModel: z.string().min(1, "Please select a pricing model"),
//   amenities: z.array(z.string()).min(1, "Please select at least one amenity"),
//   facilities: z.array(z.string()).min(1, "Please select at least one facility"),
//   numberOfBedRooms: z.string().optional(),
//   numberOfBathrooms: z.string().optional(),
//   pictures: z.array(z.any()).min(2, "Please upload at least 3 pictures"),
// });

// type PropertyFormData = z.infer<typeof propertySchema>;

export function PropertyOnboarding() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<string | null>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState<string | null>(
    null
  );

  const [availabilityDate, setAvailabilityDate] = useState<Date | undefined>(
    undefined
  );

  const form = useForm<IAddProperty>({
    // resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      address: "",
      state: "",
      lga: "",
      availabilityDate: "",
      price: undefined,
      pricingModel: "",
      amenities: [],
      facilities: [],
      numberOfBedRooms: "",
      numberOfBathrooms: "",
      seatingCapacity: "",
      pictures: [],
    },
  });

  const location = useLocation();
  const navigate = useNavigate();

  const pictures = form.watch("pictures") || [];
  const selectedState = form.watch("state") || "Lagos";
  const propertyType = form.watch("type");

  const propertyMutation = useMutation({
    mutationFn: propertyService.addProperty,
    onSuccess: async (data) => {
      console.log({ data });
      toast.success("Property added successfully!");
      navigate("/dashboard/landlord");
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    },
  });

  const onSubmit = async (data: IAddProperty) => {
    console.log("Form submitted");
    console.log({ data });

    // Additional validation for co-working space
    if (
      data?.type.toLowerCase().replace(" ", "-") !== "co-working-space" &&
      !selectedRooms
    ) {
      form.setError("numberOfBedRooms", {
        type: "manual",
        message: "Please select number of rooms",
      });
      return;
    }

    if (
      data?.type.toLowerCase().replace(" ", "-") !== "co-working-space" &&
      !selectedBathrooms
    ) {
      form.setError("numberOfBathrooms", {
        type: "manual",
        message: "Please select number of bathrooms",
      });
      return;
    }

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

    if (data.type.toLowerCase().replace(" ", "-") === "co-working-space") {
      formData.append("seatingCapacity", String(data.seatingCapacity));
      formData.append("numberOfBedrooms", "1");
      formData.append("numberOfBathrooms", "1");
    } else {
      formData.append("numberOfBedrooms", String(selectedRooms));
      formData.append("numberOfBathrooms", String(selectedBathrooms));
    }

    for (let i = 0; i < data.pictures.length; i++) {
      formData.append("pictures", data.pictures[i]);
    }

    propertyMutation.mutateAsync(formData);
  };

  return (
    <div className="w-full max-w-3xl flex flex-col gap-4 mb-14">
      <Header text="Property Onboarding" />
      <p>
        Tell us about property and it's features to get matched with the right
        tenant
      </p>

      <div className="border flex flex-col gap-4 justify-center md:justify-between w-full p-4 rounded-lg">
        <p className="font-semibold text-start hidden md:block">
          Property Information
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: { value: true, message: "Title is required" },
              }}
              render={({ field }) => (
                <FormItem>
                  <Label className="text-start font-bold">Title</Label>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-end" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              rules={{
                required: { value: true, message: "Description is required" },
              }}
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <Label className="font-semibold">Description</Label>
                    <small>200 words</small>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Write a short overview of your property"
                      className="min-h-28"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-end" />
                </FormItem>
              )}
            />

            {/* Property Type */}
            <FormField
              control={form.control}
              name="type"
              rules={{
                required: { value: true, message: "Property type is required" },
              }}
              render={({ field }) => (
                <FormItem>
                  <Label className="text-start font-bold">Property Type</Label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                    </FormControl>
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
                  <FormMessage className="text-sm text-end" />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-6">
              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                rules={{
                  required: { value: true, message: "Address is required" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-start font-bold">Address</Label>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage className="text-sm text-end" />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={form.control}
                name="price"
                rules={{
                  required: { value: true, message: "Price is required" },
                  min: { value: 0, message: "Price must be greater than 0" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-start font-bold">Price</Label>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter price"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? "" : e.target.value
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-end" />
                  </FormItem>
                )}
              />

              {/* State */}
              <FormField
                control={form.control}
                name="state"
                rules={{
                  required: { value: true, message: "State is required" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-start font-bold">State</Label>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedRooms(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="-select-" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage className="text-sm text-end" />
                  </FormItem>
                )}
              />

              {/* Local Government Area */}
              <FormField
                control={form.control}
                name="lga"
                rules={{
                  required: { value: true, message: "LGA is required" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-start font-bold">LGA</Label>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedRooms(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="-select-" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {NIGERIAN_STATE_CITIES[selectedState]?.map((city) => (
                            <SelectItem key={city} value={String(city)}>
                              {city}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-sm text-end" />
                  </FormItem>
                )}
              />

              {/* Availability Date */}
              <FormField
                control={form.control}
                name="availabilityDate"
                rules={{
                  required: {
                    value: true,
                    message: "Availability date is required",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-start font-bold">
                      Availability Date
                    </Label>
                    <Popover modal={true}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className="w-full pl-3 text-left font-normal"
                          >
                            {availabilityDate
                              ? formatDate(availabilityDate)
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
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
                            if (!date) return;
                            setAvailabilityDate(date);
                            field.onChange(date.toISOString());
                          }}
                          disabled={(date: Date) => date < new Date()}
                          className="rounded-md border bg-white z-50"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-sm text-end" />
                  </FormItem>
                )}
              />

              {/* Pricing Model */}
              <FormField
                control={form.control}
                name="pricingModel"
                rules={{
                  required: {
                    value: true,
                    message: "Pricing model is required",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-start font-bold">
                      Pricing Model
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedRooms(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="-select-" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {pricingModels.map((pricingModel) => (
                            <SelectItem
                              key={pricingModel}
                              value={String(pricingModel)}
                            >
                              {pricingModel}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-sm text-end" />
                  </FormItem>
                )}
              />
            </div>

            {/* Key Features */}
            {propertyType?.toLowerCase().replace(" ", "-") !==
              "co-working-space" && (
              <div className="text-start">
                <p className="font-semibold tracking-wide my-2">Key Features</p>
                <div className="flex flex-col sm:flex-row gap-6 mt-2">
                  <FormField
                    control={form.control}
                    name="numberOfBedRooms"
                    rules={{
                      required: {
                        value: true,
                        message: "No of bedrooms is required",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem className="w-full sm:w-1/2">
                        <Label>No of bedrooms</Label>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedRooms(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="-select-" />
                            </SelectTrigger>
                          </FormControl>
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
                        <FormMessage className="text-sm text-end" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="numberOfBathrooms"
                    rules={{
                      required: {
                        value: true,
                        message: "No of bathrooms is required",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem className="w-full sm:w-1/2">
                        <Label>No of bathrooms</Label>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedBathrooms(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="-select-" />
                            </SelectTrigger>
                          </FormControl>
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
                        <FormMessage className="text-sm text-end" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Seating Capacity - Only for Co-Working Space */}
            {propertyType?.toLowerCase().replace(" ", "-") ===
              "co-working-space" && (
              <div className="text-start">
                <p className="font-semibold tracking-wide my-2">
                  Seating Capacity
                </p>
                <div className="flex flex-col sm:flex-row gap-6 mt-2">
                  <FormField
                    control={form.control}
                    name="seatingCapacity"
                    rules={{
                      required: {
                        value: true,
                        message: "Seating capacity is required",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem className="w-full sm:w-1/2">
                        <Label>Seating Capacity</Label>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="-select-" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {[5, 10, 15, 20, 25, 30, 40, 50].map((num) => (
                                <SelectItem key={num} value={String(num)}>
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-sm text-end" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Amenities and Facilities */}
            <div className="text-start">
              <p className="font-semibold tracking-wide">Amenities</p>
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="amenities"
                  rules={{
                    required: {
                      value: true,
                      message: "Amenities is required",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col gap-2 mt-2">
                        <span className="font-semibold text-sm flex gap-2 items-center">
                          Add unit features
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>
                                <CircleAlert
                                  className="cursor-pointer"
                                  size={14}
                                />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                This includes only amenities available inside
                                the unit
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </span>
                        <FormControl>
                          <CustomMultiSelect
                            options={amenities}
                            selected={selectedAmenities}
                            onSelect={(value) => {
                              setSelectedAmenities(value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-end" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="facilities"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col gap-2 mt-2">
                        <span className="font-semibold text-sm flex gap-2 items-center">
                          Add facilities
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span>
                                <CircleAlert
                                  className="cursor-pointer"
                                  size={14}
                                />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                This includes only facilities available outside
                                the unit
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </span>
                        <FormControl>
                          <CustomMultiSelect
                            options={facilities}
                            selected={selectedFacilities}
                            onSelect={(value) => {
                              setSelectedFacilities(value);
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-sm text-end" />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Upload Images */}
            <FormField
              control={form.control}
              name="pictures"
              rules={{
                required: {
                  value: true,
                  message: "Images are required",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-4">
                    <Label className="text-start font-semibold">
                      Upload Images of your property
                    </Label>
                    <FormControl>
                      <FileInput
                        accept=".jpg,.jpeg,.png"
                        value={pictures}
                        multiple
                        customMessage="min of 3 images (exterior view, interior view, key features)"
                        numberOfFiles={2}
                        onFilesChange={(updatedFiles) => {
                          field.onChange(updatedFiles);
                        }}
                        // errorMessage={form.formState.errors.pictures?.message}
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-end" />
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

       

      <div className="flex justify-end gap-4">
        <Button variant={"outline"} className="px-10 cursor-pointer">
          Cancel
        </Button>
        <Button
          className="px-6 cursor-pointer bg-custom-primary"
          onClick={form.handleSubmit(onSubmit)}
          disabled={propertyMutation.isPending}
        >
          {propertyMutation.isPending ? "Publishing..." : "Publish listing"}
        </Button>
      </div>
    </div>
  );
}
