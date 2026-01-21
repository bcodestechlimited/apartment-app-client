// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { propertyService } from "@/api/property.api";
// import { useEffect, useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   amenities,
//   facilities,
//   pricingModels,
//   propertyTypes,
//   type IEditProperty,
//   type IProperty,
// } from "@/interfaces/property.interface";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import CustomMultiSelect from "@/components/custom/custom-multi-select";
// import { CalendarIcon, CircleAlert } from "lucide-react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import {
//   NIGERIAN_STATES,
//   NIGERIAN_STATE_CITIES,
// } from "@/constants/nigerian-states";
// import { FileUpdateInput } from "@/components/custom/file-update-input";
// import { formatDate } from "@/lib/utils";

// interface EditPropertyModalProps {
//   isOpen: boolean;
//   closeModal: () => void;
//   property: IProperty;
// }

// export default function EditPropertyModal({
//   isOpen,
//   closeModal,
//   property,
// }: EditPropertyModalProps) {
//   const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
//   const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
//   const [selectedRooms, setSelectedRooms] = useState<string | null>(null);
//   const [selectedBathrooms, setSelectedBathrooms] = useState<string | null>(
//     null
//   );
//   const [propertyType, setPropertyType] = useState<string | null>(null);

//   const [availabilityDate, setAvailabilityDate] = useState<Date | undefined>(
//     undefined
//   );

//   const queryClient = useQueryClient();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     setError,
//     clearErrors,
//     watch,
//     formState: { errors },
//   } = useForm<IEditProperty>({
//     defaultValues: {
//       title: property.title,
//       description: property.description,
//       type: property.type,
//       address: property.address,
//       state: property.state,
//       lga: property.lga,
//       availabilityDate: property.availabilityDate,
//       price: property.price,
//       pricingModel: property.pricingModel,
//       existingPictures: property.pictures,
//       numberOfBedRooms: String(property.numberOfBedrooms),
//       numberOfBathrooms: String(property.numberOfBathrooms),
//     },
//   });

//   // const newPictures = watch("newPictures") || [];
//   const selectedState = watch("state") || property.state || "Lagos";

//   useEffect(() => {
//     setSelectedAmenities(property.amenities || []);
//     setSelectedFacilities(property.facilities || []);
//     setSelectedRooms(String(property.numberOfBedrooms));
//     setSelectedBathrooms(String(property.numberOfBathrooms));
//     setAvailabilityDate(
//       property.availabilityDate
//         ? new Date(property.availabilityDate)
//         : undefined
//     );
//     setValue("existingPictures", property.pictures); // You might keep this empty or preload if handling existing images
//   }, [property, setValue]);

//   const updateMutation = useMutation({
//     mutationFn: (formData: FormData) =>
//       propertyService.updateProperty(property._id, formData),
//     onSuccess: () => {
//       toast.success("Property updated successfully!");
//       queryClient.invalidateQueries({ queryKey: ["landlord-properties"] });
//       closeModal();
//     },
//     onError: (error) => {
//       toast.error(error.message);
//       console.error(error);
//     },
//   });

//   const runCustomValidation = (data: IEditProperty) => {
//     let hasError = false;

//     if (!data.description || data.description.length < 10) {
//       setError("description", {
//         type: "manual",
//         message: "Description must be at least 10 characters",
//       });
//       hasError = true;
//     }

//     if (!data.address) {
//       setError("address", {
//         type: "manual",
//         message: "Please enter an address",
//       });
//       hasError = true;
//     }

//     if (!data.state) {
//       setError("state", {
//         type: "manual",
//         message: "Please select a state",
//       });
//       hasError = true;
//     }

//     if (!data.lga) {
//       setError("lga", {
//         type: "manual",
//         message: "Please select a local government",
//       });
//       hasError = true;
//     }

//     if (!data.availabilityDate) {
//       setError("availabilityDate", {
//         type: "manual",
//         message: "Please select an availability date",
//       });
//       hasError = true;
//     }

//     if (!data.price) {
//       setError("price", {
//         type: "manual",
//         message: "Please enter a price",
//       });
//       hasError = true;
//     }

//     if (!data.pricingModel) {
//       setError("pricingModel", {
//         type: "manual",
//         message: "Please select a pricing model",
//       });
//       hasError = true;
//     }

//     if (selectedAmenities.length === 0) {
//       setError("amenities", {
//         type: "manual",
//         message: "Please select at least one amenity",
//       });
//       hasError = true;
//     }

//     if (selectedFacilities.length === 0) {
//       setError("facilities", {
//         type: "manual",
//         message: "Please select at least one facility",
//       });
//       hasError = true;
//     }

//     if (!selectedRooms) {
//       setError("numberOfBedRooms", {
//         type: "manual",
//         message: "Please select number of bedrooms",
//       });
//       hasError = true;
//     }

//     if (!selectedBathrooms) {
//       setError("numberOfBathrooms", {
//         type: "manual",
//         message: "Please select number of bathrooms",
//       });
//       hasError = true;
//     }

//     return hasError;
//   };

//   const onSubmit = (data: IEditProperty) => {
//     const hasError = runCustomValidation(data);
//     if (hasError) return;

//     const formData = new FormData();
//     formData.append("description", data.description);
//     formData.append("address", data.address);
//     formData.append("state", data.state);
//     formData.append("lga", data.lga);
//     formData.append(
//       "availabilityDate",
//       data.availabilityDate ? data.availabilityDate.toLocaleString() : ""
//     );
//     formData.append(
//       "price",
//       data.price !== undefined ? String(data.price) : ""
//     );
//     formData.append("pricingModel", data.pricingModel.toLowerCase());
//     formData.append("amenities", JSON.stringify(selectedAmenities));
//     formData.append("facilities", JSON.stringify(selectedFacilities));
//     formData.append("numberOfBedrooms", String(selectedRooms));
//     formData.append("numberOfBathrooms", String(selectedBathrooms));
//     formData.append("type", property.type); // keep original type
//     for (let i = 0; i < data.newPictures?.length; i++) {
//       formData.append("newPictures", data.newPictures[i]);
//     }
//     formData.append("existingPictures", JSON.stringify(data.existingPictures));

//     console.log({ data });

//     updateMutation.mutateAsync(formData);
//   };

//   console.log({ property });

//   if (!isOpen) return null;

//   return (
//     <Dialog open={isOpen} onOpenChange={closeModal}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Edit Property</DialogTitle>
//           <DialogDescription>
//             Update your property details below
//           </DialogDescription>
//         </DialogHeader>

//         {/* You can now reuse the same layout/components as AddPropertyModal here */}
//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
//           {/* Title */}
//           <div className="flex flex-col gap-2">
//             <Label className="text-start font-bold" htmlFor="title">
//               Title
//             </Label>
//             <Input placeholder="Enter title" {...register("title")} />
//           </div>

//           {/* Description */}
//           <div className="flex flex-col gap-2">
//             <Label>Description</Label>
//             <Textarea {...register("description")} className="min-h-24" />
//             {errors.description && (
//               <p className="text-destructive text-sm">
//                 {errors.description.message}
//               </p>
//             )}
//           </div>

//           {/* Type */}
//           <div className=" flex flex-col gap-2">
//             <Label className="text-start font-bold" htmlFor="state">
//               Property Type
//             </Label>
//             <Input type="text" {...register("type")} className="hidden" />

//             <Select
//               onValueChange={(value) => {
//                 setPropertyType(value);
//                 setValue("type", value);
//                 clearErrors(["type"]);
//               }}
//               defaultValue={property.type}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="-select-" />
//               </SelectTrigger>
//               <SelectContent className="max-h-60">
//                 <SelectGroup>
//                   {propertyTypes.map((propertyType) => (
//                     <SelectItem
//                       key={propertyType}
//                       value={String(
//                         propertyType.replace(" ", "-").toLowerCase()
//                       )}
//                       className="capitalize"
//                     >
//                       {propertyType}
//                     </SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//             {errors?.state && (
//               <p className="text-destructive text-sm text-end">
//                 {errors.state.message}
//               </p>
//             )}
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             {/* Address */}
//             <div className="flex flex-col gap-2">
//               <Label>Address</Label>
//               <Input {...register("address")} />
//               {errors.address && (
//                 <p className="text-destructive text-sm">
//                   {errors.address.message}
//                 </p>
//               )}
//             </div>

//             {/* Price */}
//             <div className="flex flex-col gap-2">
//               <Label>Price</Label>
//               <Input type="number" {...register("price")} />
//               {errors.price && (
//                 <p className="text-destructive text-sm">
//                   {errors.price.message}
//                 </p>
//               )}
//             </div>

//             {/* State */}
//             <div className="flex flex-col gap-2">
//               <Label>State</Label>
//               <Input type="text" {...register("state")} className="hidden" />
//               <Select
//                 onValueChange={(value) => {
//                   setValue("state", value);
//                   clearErrors("state");
//                 }}
//                 defaultValue={property.state}
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select a state" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     {NIGERIAN_STATES.map((state) => (
//                       <SelectItem key={state} value={state}>
//                         {state}
//                       </SelectItem>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//               {errors.state && (
//                 <p className="text-destructive text-sm">
//                   {errors.state.message}
//                 </p>
//               )}
//             </div>

//             {/* LGA */}
//             <div className="flex flex-col gap-2">
//               <Label>LGA</Label>
//               <Input type="text" {...register("lga")} className="hidden" />
//               <Select
//                 onValueChange={(value) => {
//                   setValue("lga", value);
//                   clearErrors("lga");
//                 }}
//                 defaultValue={property.lga}
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="Select an LGA" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     {NIGERIAN_STATE_CITIES[selectedState]?.map((lga) => (
//                       <SelectItem key={lga} value={lga}>
//                         {lga}
//                       </SelectItem>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//               {errors.lga && (
//                 <p className="text-destructive text-sm">{errors.lga.message}</p>
//               )}
//             </div>

//             {/* Availability Date  */}
//             <div className=" flex flex-col gap-2">
//               <Label
//                 className="text-start font-bold"
//                 htmlFor="availabilityDate"
//               >
//                 Avalability Date
//               </Label>
//               <Input
//                 type="text"
//                 {...register("availabilityDate")}
//                 className="hidden"
//               />
//               <Popover modal={true}>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant={"outline"}
//                     className="w-full pl-3 text-left font-normal"
//                   >
//                     {availabilityDate
//                       ? formatDate(availabilityDate)
//                       : "Pick a date"}
//                     <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent
//                   className="w-auto p-0 flex justify-end"
//                   align="center"
//                 >
//                   <Calendar
//                     mode="single"
//                     selected={availabilityDate}
//                     onSelect={(date) => {
//                       console.log(date);
//                       if (!date) {
//                         return;
//                       }

//                       const newDate = date;

//                       setAvailabilityDate(newDate);
//                       setValue("availabilityDate", newDate.toISOString());

//                       clearErrors(["availabilityDate"]);
//                     }}
//                     disabled={(date) => date < new Date()}
//                     className="rounded-md border bg-white z-50"
//                   />
//                 </PopoverContent>
//               </Popover>

//               {errors?.availabilityDate && (
//                 <p className="text-destructive text-sm text-end">
//                   {errors.availabilityDate.message}
//                 </p>
//               )}
//             </div>

//             {/* Pricing Model  */}
//             <div className=" flex flex-col gap-2">
//               <Label className="text-start font-bold" htmlFor="pricingModel">
//                 Pricing Model
//               </Label>
//               <Input
//                 type="text"
//                 {...register("pricingModel")}
//                 className="hidden"
//               />

//               <Select
//                 defaultValue={property.pricingModel}
//                 onValueChange={(value) => {
//                   setSelectedRooms(value);
//                   setValue("pricingModel", value);
//                   clearErrors(["pricingModel"]);
//                 }}
//               >
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder="-select-" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     {pricingModels.map((pricingModel) => (
//                       <SelectItem
//                         key={pricingModel}
//                         value={String(pricingModel.toLowerCase())}
//                       >
//                         {pricingModel}
//                       </SelectItem>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//               {errors?.pricingModel && (
//                 <p className="text-destructive text-sm text-end">
//                   {errors.pricingModel.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Key Features */}
//           <div>
//             <p className="font-semibold tracking-wide">Key Features</p>
//             <div className="flex flex-col sm:flex-row gap-6 mt-2">
//               <div className="flex flex-col gap-2 w-full sm:w-1/2">
//                 <Label>No of bedrooms</Label>
//                 <Input
//                   type="string"
//                   {...register("numberOfBedRooms")}
//                   className="hidden"
//                 />
//                 <Select
//                   onValueChange={(value) => {
//                     setSelectedRooms(value);
//                     setValue("numberOfBedRooms", value);
//                     clearErrors(["numberOfBedRooms"]);
//                   }}
//                   defaultValue={property.numberOfBedrooms?.toString()}
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="-select-" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       {[1, 2, 3, 4, 5].map((num) => (
//                         <SelectItem key={num} value={String(num)}>
//                           {num}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//                 {errors?.numberOfBedRooms && (
//                   <p className="text-destructive text-sm text-end">
//                     {errors.numberOfBedRooms.message}
//                   </p>
//                 )}
//               </div>

//               <div className="flex flex-col gap-2 w-full sm:w-1/2">
//                 <Label>No of bathrooms</Label>
//                 <Input
//                   type="string"
//                   {...register("numberOfBathrooms")}
//                   className="hidden"
//                 />
//                 <Select
//                   onValueChange={(value) => {
//                     setSelectedBathrooms(value);
//                     setValue("numberOfBathrooms", value);
//                     clearErrors(["numberOfBathrooms"]);
//                   }}
//                   defaultValue={property.numberOfBathrooms?.toString()}
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="-select-" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectGroup>
//                       {[1, 2, 3, 4, 5].map((num) => (
//                         <SelectItem key={num} value={String(num)}>
//                           {num}
//                         </SelectItem>
//                       ))}
//                     </SelectGroup>
//                   </SelectContent>
//                 </Select>
//                 {errors?.numberOfBathrooms && (
//                   <p className="text-destructive text-sm text-end">
//                     {errors.numberOfBathrooms.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Amenities and Facilites */}
//           <div>
//             <p className="font-semibold tracking-wide">Amenities</p>
//             <div className="flex flex-col gap-2">
//               <div className="flex flex-col gap-2 mt-2">
//                 <span className="font-semibold text-sm flex gap-2 items-center">
//                   Add unit features
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <span>
//                         <CircleAlert className=" cursor-pointer" size={14} />
//                       </span>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>
//                         This includes only amenities available inside the unit
//                       </p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </span>
//                 <CustomMultiSelect
//                   options={amenities}
//                   selected={selectedAmenities}
//                   onSelect={(value) => {
//                     setSelectedAmenities(value);
//                     setValue("amenities", value);
//                     clearErrors(["amenities"]);
//                   }}
//                 />
//                 {errors?.amenities && (
//                   <p className="text-destructive text-sm text-end">
//                     {errors.amenities.message}
//                   </p>
//                 )}
//               </div>
//               <div className="flex flex-col gap-2 mt-2">
//                 <span className="font-semibold text-sm flex gap-2 items-center">
//                   Add facilities
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <span>
//                         <CircleAlert className=" cursor-pointer" size={14} />
//                       </span>
//                     </TooltipTrigger>
//                     <TooltipContent>
//                       <p>
//                         This includes only facilities available outside the unit
//                       </p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </span>
//                 <CustomMultiSelect
//                   options={facilities}
//                   selected={selectedFacilities}
//                   onSelect={(value) => {
//                     setSelectedFacilities(value);
//                     setValue("facilities", value);
//                     clearErrors(["facilities"]);
//                   }}
//                 />
//                 {errors?.facilities && (
//                   <p className="text-destructive text-sm text-end">
//                     {errors.facilities.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* File Upload */}
//           <div className="flex flex-col gap-2 mt-2">
//             <Label>Upload Images of your property</Label>
//             <FileUpdateInput
//               existingImages={property.pictures}
//               onChange={(existing, newFiles) => {
//                 setValue("existingPictures", existing); // new hidden field you'll add
//                 setValue("newPictures", newFiles); // form field
//               }}
//             />
//           </div>

//           {/* Pricing Model, Availability, Rooms/Baths, Amenities, Facilities, FileInput */}
//           {/* Reuse the same layout from AddPropertyModal or call a shared FormContent component if refactored */}

//           <div className="flex justify-end gap-4">
//             <Button type="button" variant="outline" onClick={closeModal}>
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               disabled={updateMutation.isPending}
//               className="btn-primary"
//             >
//               {updateMutation.isPending ? "Updating..." : "Update Property"}
//             </Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { useForm, useFieldArray } from "react-hook-form";
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
import { CalendarIcon, CircleAlert, Plus, Trash2 } from "lucide-react";
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
import { formatDate } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

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
    null,
  );
  const [availabilityDate, setAvailabilityDate] = useState<Date | undefined>(
    undefined,
  );

  const queryClient = useQueryClient();

  const form = useForm<IEditProperty>({
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
      numberOfBedRooms: String(property.numberOfBedrooms),
      numberOfBathrooms: String(property.numberOfBathrooms),
      isEnsuite: property.isEnsuite || false, // Default to false if missing
      otherFees: property.otherFees || [], // Default to empty array if missing
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "otherFees",
  });

  const selectedState = watch("state") || property.state || "Lagos";
  const propertyType = watch("type") || property.type;

  // Initialize form with property data when modal opens
  useEffect(() => {
    if (isOpen && property) {
      reset({
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
        numberOfBedRooms: String(property.numberOfBedrooms),
        numberOfBathrooms: String(property.numberOfBathrooms),
        isEnsuite: property.isEnsuite || false,
        otherFees: property.otherFees || [],
      });

      setSelectedAmenities(property.amenities || []);
      setSelectedFacilities(property.facilities || []);
      setSelectedRooms(String(property.numberOfBedrooms));
      setSelectedBathrooms(String(property.numberOfBathrooms));
      setAvailabilityDate(
        property.availabilityDate
          ? new Date(property.availabilityDate)
          : undefined,
      );
    }
  }, [property, isOpen, reset]);

  const updateMutation = useMutation({
    mutationFn: (formData: FormData) =>
      propertyService.updateProperty(property._id, formData),
    onSuccess: () => {
      toast.success("Property updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["landlord-properties"] });
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  const onSubmit = (data: IEditProperty) => {
    // --- CALCULATION LOGIC START ---
    const basePrice = Number(data.price) || 0;
    const feesSum =
      data.otherFees?.reduce(
        (acc, fee) => acc + (Number(fee.amount) || 0),
        0,
      ) || 0;
    const totalFees = basePrice + feesSum;
    // --- CALCULATION LOGIC END ---

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("state", data.state);
    formData.append("lga", data.lga);
    formData.append(
      "availabilityDate",
      data.availabilityDate
        ? new Date(data.availabilityDate).toISOString()
        : "",
    );
    formData.append(
      "price",
      data.price !== undefined ? String(data.price) : "",
    );
    formData.append("totalFees", String(totalFees));
    formData.append("pricingModel", data.pricingModel.toLowerCase());
    formData.append("amenities", JSON.stringify(selectedAmenities));
    formData.append("facilities", JSON.stringify(selectedFacilities));
    formData.append("numberOfBedRooms", String(selectedRooms));
    formData.append("numberOfBathrooms", String(selectedBathrooms));
    formData.append("type", data.type);
    formData.append("isEnsuite", String(data.isEnsuite));

    if (data.otherFees && data.otherFees.length > 0) {
      formData.append("otherFees", JSON.stringify(data.otherFees));
    } else {
      // Send empty array string if all fees removed to clear them on backend
      formData.append("otherFees", JSON.stringify([]));
    }

    for (let i = 0; i < data.newPictures?.length; i++) {
      formData.append("newPictures", data.newPictures[i]);
    }
    formData.append("existingPictures", JSON.stringify(data.existingPictures));

    updateMutation.mutateAsync(formData);
  };

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

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Title */}
            <FormField
              control={control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <Label className="font-bold">Title</Label>
                  <FormControl>
                    <Input placeholder="Enter title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={control}
              name="description"
              rules={{ required: "Description is required", minLength: 10 }}
              render={({ field }) => (
                <FormItem>
                  <Label>Description</Label>
                  <FormControl>
                    <Textarea {...field} className="min-h-24" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type */}
            <div className=" flex flex-col gap-2">
              <Label className="text-start font-bold">Property Type</Label>
              <FormField
                control={control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="-select-" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60">
                        <SelectGroup>
                          {propertyTypes.map((pt) => (
                            <SelectItem
                              key={pt}
                              value={String(pt.replace(" ", "-").toLowerCase())}
                              className="capitalize"
                            >
                              {pt}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Address */}
              <FormField
                control={control}
                name="address"
                rules={{ required: "Address is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label>Address</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price */}
              <FormField
                control={control}
                name="price"
                rules={{ required: "Price is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label>Price</Label>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* State */}
              <FormField
                control={control}
                name="state"
                rules={{ required: "State is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label>State</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a state" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* LGA */}
              <FormField
                control={control}
                name="lga"
                rules={{ required: "LGA is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label>LGA</Label>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select an LGA" />
                        </SelectTrigger>
                      </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Availability Date */}
              <div className=" flex flex-col gap-2">
                <Label className="text-start font-bold">Avalability Date</Label>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full pl-3 text-left font-normal"
                    >
                      {availabilityDate
                        ? formatDate(availabilityDate)
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
                        if (!date) return;
                        setAvailabilityDate(date);
                        setValue("availabilityDate", date.toISOString());
                      }}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border bg-white z-50"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Pricing Model */}
              <div className=" flex flex-col gap-2">
                <Label className="text-start font-bold">Pricing Model</Label>
                <FormField
                  control={control}
                  name="pricingModel"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="-select-" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {pricingModels.map((pm) => (
                              <SelectItem
                                key={pm}
                                value={String(pm.toLowerCase())}
                              >
                                {pm}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Other Fees Section (NEW) */}
            <div className="flex flex-col gap-4 border p-4 rounded-md bg-slate-50">
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
                <div className="grid grid-cols-1 gap-4">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="relative grid grid-cols-2 gap-4 p-4 border rounded-lg bg-white"
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
                        control={control}
                        name={`otherFees.${index}.name`}
                        rules={{ required: "Required" }}
                        render={({ field }) => (
                          <FormItem>
                            <Label className="text-xs">Fee Name</Label>
                            <FormControl>
                              <Input placeholder="e.g. Caution" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name={`otherFees.${index}.amount`}
                        rules={{ required: "Required" }}
                        render={({ field }) => (
                          <FormItem>
                            <Label className="text-xs">Amount</Label>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0.00"
                                {...field}
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

            {/* Key Features */}
            <div>
              <p className="font-semibold tracking-wide mb-2">Key Features</p>

              {propertyType?.toLowerCase().replace(" ", "-") ===
              "co-working-space" ? (
                /* ... Co-working logic if needed ... */
                <div className="flex flex-col gap-2">
                  {/* Add Seating Capacity Field Here if needed for edit */}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                      <Label>No of bedrooms</Label>
                      <Select
                        onValueChange={(value) => {
                          setSelectedRooms(value);
                          setValue("numberOfBedRooms", value);

                          // Helper Logic: If "Ensuite" is checked, we assume AT LEAST this many bathrooms
                          if (watch("isEnsuite")) {
                            const currentBathrooms = Number(
                              watch("numberOfBathrooms") || 0,
                            );
                            if (currentBathrooms < Number(value)) {
                              setValue("numberOfBathrooms", value);
                              setSelectedBathrooms(value);
                            }
                          }
                        }}
                        defaultValue={String(property.numberOfBedrooms)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="-select-" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem key={num} value={String(num)}>
                                {num}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-col gap-2 w-full sm:w-1/2">
                      <Label>No of bathrooms</Label>
                      <FormField
                        control={control}
                        name="numberOfBathrooms"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={(val) => {
                                field.onChange(val);
                                setSelectedBathrooms(val);
                              }}
                              value={field.value} // Controlled
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="-select-" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                    <SelectItem key={num} value={String(num)}>
                                      {num}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Ensuite Checkbox (NEW) */}
                  <FormField
                    control={control}
                    name="isEnsuite"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              if (checked && selectedRooms) {
                                setValue("numberOfBathrooms", selectedRooms);
                                setSelectedBathrooms(selectedRooms);
                              }
                            }}
                            className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary cursor-pointer mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <Label className="font-bold cursor-pointer">
                            All Rooms Ensuite?
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Checking this sets the <b>minimum</b> bathrooms
                            equal to bedrooms.
                          </p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>

            {/* Amenities and Facilites */}
            <div>
              <p className="font-semibold tracking-wide">Amenities</p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 mt-2">
                  <span className="font-semibold text-sm flex gap-2 items-center">
                    Add unit features
                    <CircleAlert className="cursor-pointer" size={14} />
                  </span>
                  <CustomMultiSelect
                    options={amenities}
                    selected={selectedAmenities}
                    onSelect={(value) => {
                      setSelectedAmenities(value);
                      setValue("amenities", value);
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                  <span className="font-semibold text-sm flex gap-2 items-center">
                    Add facilities
                    <CircleAlert className="cursor-pointer" size={14} />
                  </span>
                  <CustomMultiSelect
                    options={facilities}
                    selected={selectedFacilities}
                    onSelect={(value) => {
                      setSelectedFacilities(value);
                      setValue("facilities", value);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="flex flex-col gap-2 mt-2">
              <Label>Upload Images of your property</Label>
              <FileUpdateInput
                existingImages={property.pictures}
                onChange={(existing, newFiles) => {
                  setValue("existingPictures", existing);
                  setValue("newPictures", newFiles);
                }}
              />
            </div>

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
        </Form>
      </DialogContent>
    </Dialog>
  );
}
