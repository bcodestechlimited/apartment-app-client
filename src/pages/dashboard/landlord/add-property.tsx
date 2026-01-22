import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "@/api/property.api";
import { useState } from "react";
import { useNavigate } from "react-router";
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
import {
  CalendarIcon,
  CircleAlert,
  Plus,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import {
  NIGERIAN_STATE_CITIES,
  NIGERIAN_STATES,
} from "@/constants/nigerian-states";
import { formatDate } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"; // Optional: Use Card for style
import { Checkbox } from "@/components/ui/checkbox";

export default function AddPropertyPage() {
  const navigate = useNavigate(); // Hook for navigation
  const queryClient = useQueryClient();

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<string | null>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedBathrooms, setSelectedBathrooms] = useState<string | null>(
    null,
  );
  const [availabilityDate, setAvailabilityDate] = useState<Date | undefined>(
    undefined,
  );
  const [isEnsuite, setIsEnsuite] = useState(false);

  const form = useForm<IAddProperty>({
    defaultValues: {
      title: "",
      description: "",
      type: "",
      address: "",
      state: "",
      lga: "",
      availabilityDate: "",
      price: undefined,
      totalFees: undefined,
      pricingModel: "",
      amenities: [],
      facilities: [],
      numberOfBedRooms: "",
      numberOfBathrooms: "",
      seatingCapacity: "",
      pictures: [],
      otherFees: [],
      isEnsuite: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "otherFees",
  });

  const pictures = form.watch("pictures") || [];
  const selectedState = form.watch("state") || "Lagos";
  const propertyType = form.watch("type");

  const propertyMutation = useMutation({
    mutationFn: propertyService.addProperty,
    onSuccess: async () => {
      toast.success("Property added successfully!");
      queryClient.invalidateQueries({ queryKey: ["landlord-properties"] });
      form.reset();
      navigate(-1); // Go back to previous page
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.error(error);
    },
  });

  const onSubmit = async (data: IAddProperty) => {
    // Validation logic for Co-working vs Standard
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

    const basePrice = Number(data.price) || 0;
    const feesSum =
      data.otherFees?.reduce(
        (acc, fee) => acc + (Number(fee.amount) || 0),
        0,
      ) || 0;
    const totalFees = basePrice + feesSum;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("state", data.state);
    formData.append("lga", data.lga);
    formData.append("availabilityDate", data.availabilityDate);
    formData.append("price", String(data.price));
    formData.append("totalFees", String(totalFees));
    formData.append("pricingModel", data.pricingModel.toLowerCase());
    formData.append("amenities", JSON.stringify(selectedAmenities));
    formData.append("facilities", JSON.stringify(selectedFacilities));
    formData.append("type", data.type.replace(" ", "-").toLowerCase());
    formData.append("isEnsuite", String(data.isEnsuite));

    if (data.otherFees && data.otherFees.length > 0) {
      formData.append("otherFees", JSON.stringify(data.otherFees));
    }

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
    <div className="container ">
      {/* Back Button & Header */}
      <div className="relative mb-8 flex items-center justify-center">
        {/* Back Button: Positioned absolutely to the left */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute left-0 h-10 w-10 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>

        {/* Header Text: Centered naturally by flex container */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-wider">
            Add New Property
          </h1>
          <p className="text-muted-foreground">
            Fill in the details below to list your property.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Section 1: Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label className="font-bold">Property Title</Label>
                    <FormControl>
                      <Input
                        placeholder="e.g. Luxury 2 Bedroom Apartment in Lekki"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <Label className="font-bold">Description</Label>
                      <small className="text-muted-foreground">
                        Detailed overview
                      </small>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the property features, surroundings, etc."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Property Type & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="type"
                  rules={{ required: "Property type is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="font-bold">Property Type</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {propertyTypes.map((t) => (
                              <SelectItem
                                key={t}
                                value={String(t)}
                                className="capitalize cursor-pointer"
                              >
                                {t}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  rules={{ required: "Price is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="font-bold">Price</Label>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...field}
                          className="w-35"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="address"
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label className="font-bold">Full Address</Label>
                    <FormControl>
                      <Input
                        placeholder="House Number, Street Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* State */}
                <FormField
                  control={form.control}
                  name="state"
                  rules={{ required: "State is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="font-bold">State</Label>
                      <Select
                        onValueChange={(val) => {
                          field.onChange(val);
                          // Reset LGA if state changes?
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {NIGERIAN_STATES.map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className="cursor-pointer"
                            >
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LGA */}
                <FormField
                  control={form.control}
                  name="lga"
                  rules={{ required: "LGA is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="font-bold">LGA</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Select LGA" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-[300px]">
                          {NIGERIAN_STATE_CITIES[selectedState]?.map((c) => (
                            <SelectItem
                              key={c}
                              value={c}
                              className="cursor-pointer"
                            >
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Details & Fees */}
          <Card>
            <CardHeader>
              <CardTitle>Property Details & Pricing</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Availability Date */}
                <FormField
                  control={form.control}
                  name="availabilityDate"
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="font-bold">Availability Date</Label>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-45 pl-3 text-left font-normal cursor-pointer"
                            >
                              {availabilityDate
                                ? formatDate(availabilityDate)
                                : "Pick a date"}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={availabilityDate}
                            onSelect={(date) => {
                              if (date) {
                                setAvailabilityDate(date);
                                field.onChange(date.toISOString());
                              }
                            }}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Pricing Model */}
                <FormField
                  control={form.control}
                  name="pricingModel"
                  rules={{ required: "Pricing model is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="font-bold">Payment Frequency</Label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="cursor-pointer">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {pricingModels.map((m) => (
                            <SelectItem
                              key={m}
                              value={m}
                              className="cursor-pointer"
                            >
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Other Fees (Updated Section) */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex justify-between items-center">
                  <Label className="font-bold">Other Fees</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-8 gap-2 cursor-pointer"
                    onClick={() => append({ name: "", amount: "" })}
                  >
                    <Plus className="h-4 w-4" />
                    Add Fee
                  </Button>
                </div>

                {fields.length > 0 && (
                  <div className="grid grid-cols-1  gap-4">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="relative grid grid-cols-2  gap-4 p-4 border rounded-lg bg-slate-50"
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 text-destructive hover:bg-destructive/10 cursor-pointer"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <FormField
                          control={form.control}
                          name={`otherFees.${index}.name`}
                          rules={{ required: "Fee name is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <Label className="text-xs font-semibold text-muted-foreground">
                                Fee Name
                              </Label>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Caution Fee"
                                  {...field}
                                  className="bg-white "
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`otherFees.${index}.amount`}
                          rules={{ required: "Amount is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <Label className="text-xs font-semibold text-muted-foreground">
                                Amount
                              </Label>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="0.00"
                                  {...field}
                                  className="bg-white w-35"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features & Amenities</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              {/* Dynamic Fields (Bedrooms/Bathrooms OR Seating) */}
              {propertyType?.toLowerCase().replace(" ", "-") ===
              "co-working-space" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="seatingCapacity"
                    rules={{ required: "Seating capacity is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <Label className="font-bold">Seating Capacity</Label>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[5, 10, 15, 20, 25, 30, 40, 50].map((num) => (
                              <SelectItem
                                key={num}
                                value={String(num)}
                                className="cursor-pointer"
                              >
                                {num}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Bedrooms */}
                    <FormField
                      control={form.control}
                      name="numberOfBedRooms"
                      rules={{ required: "Bedrooms required" }}
                      render={({ field }) => (
                        <FormItem>
                          <Label className="font-bold">Bedrooms</Label>
                          <Select
                            onValueChange={(val) => {
                              field.onChange(val);
                              setSelectedRooms(val);

                              // Helper Logic: If "Ensuite" is checked, we assume AT LEAST this many bathrooms
                              if (form.getValues("isEnsuite")) {
                                const currentBathrooms = Number(
                                  form.getValues("numberOfBathrooms") || 0,
                                );
                                // Only auto-update if the current bathroom count is LESS than the new bedroom count
                                if (currentBathrooms < Number(val)) {
                                  form.setValue("numberOfBathrooms", val);
                                  setSelectedBathrooms(val);
                                }
                              }
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* Increased range to 8 */}
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <SelectItem
                                  key={num}
                                  value={String(num)}
                                  className="cursor-pointer"
                                >
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Bathrooms */}
                    <FormField
                      control={form.control}
                      name="numberOfBathrooms"
                      rules={{ required: "Bathrooms required" }}
                      render={({ field }) => (
                        <FormItem>
                          <Label className="font-bold">Bathrooms</Label>
                          <Select
                            onValueChange={(val) => {
                              field.onChange(val);
                              setSelectedBathrooms(val);
                            }}
                            // REMOVED: disabled={form.watch("isEnsuite")}
                            // This allows the user to add extra toilets even if ensuite is checked
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {/* Increased range to 8 to accommodate guest toilets */}
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <SelectItem
                                  key={num}
                                  value={String(num)}
                                  className="cursor-pointer"
                                >
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Ensuite Checkbox  */}
                  <FormField
                    control={form.control}
                    name="isEnsuite"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            className="border-custom-primary data-[state=checked]:bg-custom-primary data-[state=checked]:border-custom-primary cursor-pointer mt-1"
                            onCheckedChange={(checked) => {
                              field.onChange(checked);

                              if (checked && selectedRooms) {
                                form.setValue(
                                  "numberOfBathrooms",
                                  selectedRooms,
                                );
                                setSelectedBathrooms(selectedRooms);
                              }
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <Label className="font-bold cursor-pointer">
                            All Rooms Ensuite?
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Checking this sets the <b>minimum</b> bathrooms
                            equal to bedrooms. You can increase the bathroom
                            count manually if there is a visitor's toilet.
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Amenities & Facilities MultiSelects... */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <FormField
                  control={form.control}
                  name="amenities"
                  rules={{ required: "Amenities required" }}
                  render={({ field }) => (
                    <FormItem>
                      <Label className="font-bold flex items-center gap-2">
                        Unit Amenities{" "}
                        <CircleAlert
                          size={14}
                          className="text-muted-foreground cursor-pointer"
                        />
                      </Label>
                      <FormControl>
                        <CustomMultiSelect
                          options={amenities}
                          selected={selectedAmenities}
                          onSelect={(val) => {
                            setSelectedAmenities(val);
                            field.onChange(val);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="facilities"
                  render={({ field }) => (
                    <FormItem>
                      <Label className="font-bold flex items-center gap-2">
                        Building Facilities{" "}
                        <CircleAlert
                          size={14}
                          className="text-muted-foreground cursor-pointer"
                        />
                      </Label>
                      <FormControl>
                        <CustomMultiSelect
                          options={facilities}
                          selected={selectedFacilities}
                          onSelect={(val) => {
                            setSelectedFacilities(val);
                            field.onChange(val);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Property Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="pictures"
                rules={{ required: "Images are required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FileInput
                        accept=".jpg,.jpeg,.png"
                        value={pictures}
                        multiple
                        customMessage="min of 3 images (exterior, interior, features)"
                        numberOfFiles={2}
                        onFilesChange={(updatedFiles) =>
                          field.onChange(updatedFiles)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pb-10">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="cursor-pointer"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={propertyMutation.isPending}
              className="min-w-[150px] btn-primary cursor-pointer"
            >
              {propertyMutation.isPending ? "Publishing..." : "Publish Listing"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
