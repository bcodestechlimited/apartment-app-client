import { useState } from "react";
import { CalendarIcon, CircleAlert } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  amenities,
  facilities,
  numberOfBathroomsArray,
  numberOfBedRoomsArray,
  pricingModels,
  propertyTypes,
} from "@/interfaces/property.interface";
import { Separator } from "@/components/ui/separator";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NIGERIAN_STATE_CITIES,
  NIGERIAN_STATES,
} from "@/constants/nigerian-states";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import CurrencyInput from "@/components/custom/currencyInput";
import { formatDate } from "@/lib/utils";

interface FilterState {
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  numberOfBedrooms: string | null;
  numberOfBathrooms: string | null;
  pricingModel: string;
  facilities: string[];
  amenities: string[];
  availableFrom: Date | undefined;
  state: string;
  lga: string | null;
}

interface AddFilterModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onApplyFilters: (data: Record<string, any>) => void;
}

const AddFilterModal = ({
  isOpen,
  closeModal,
  onApplyFilters,
}: AddFilterModalProps) => {
  const [filters, setFilters] = useState<FilterState>({
    propertyType: "",
    minPrice: "",
    maxPrice: "",
    numberOfBedrooms: null,
    numberOfBathrooms: null,
    facilities: [],
    amenities: [],
    pricingModel: "",
    availableFrom: undefined,
    state: "",
    lga: null,
  });

  const handleApplyFilters = () => {
    const updatedFilters = Object.fromEntries(
      Object.entries(filters)
        .map(([key, value]) => {
          if (value === null || value === "" || value === undefined) {
            return [key, undefined];
          }

          if (Array.isArray(value) && value.length === 0) {
            return [key, undefined];
          }

          // if (excludedKeys.includes(key)) {
          //   return [key, undefined];
          // }

          if (key === "availableFrom" && filters.availableFrom) {
            return ["availableFrom", formatDate(filters.availableFrom)];
          }

          return [key, value];
        })
        .filter(([_, value]) => value !== undefined),
    );

    console.log({ updatedFilters });

    onApplyFilters(updatedFilters);
    closeModal();
  };

  const handleClearFilters = () => {
    setFilters({
      propertyType: "",
      minPrice: "",
      maxPrice: "",
      numberOfBedrooms: null,
      numberOfBathrooms: null,
      facilities: [],
      amenities: [],
      pricingModel: "",
      availableFrom: undefined,
      state: "",
      lga: null,
    });

    onApplyFilters({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto ">
        <DialogTitle className="text-2xl font-semibold">Filters</DialogTitle>
        <Separator />
        <DialogDescription aria-describedby="modal-description">
          Please select one or more filters to apply to your search results. You
          can always clear the filters by clicking the <strong>Clear</strong>{" "}
          button.
        </DialogDescription>
        <div className="flex flex-col gap-4">
          {/* Type */}
          <div className=" flex flex-col gap-2">
            <Label className="text-start font-bold" htmlFor="state">
              Property Type
            </Label>
            <Input type="text" className="hidden" />

            <Select
              onValueChange={(value) => {
                setFilters((prev) => ({
                  ...prev,
                  propertyType: value,
                }));
              }}
              value={filters.propertyType}
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
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-2">
            <Label className="text-start font-bold" htmlFor="priceRange">
              Basic Rent Price Range
            </Label>
            <div className="flex gap-4">
              <CurrencyInput
                type="number"
                className="w-full"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: e.target.value,
                  }))
                }
              />
              <CurrencyInput
                type="number"
                className="w-full"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxPrice: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* State */}
            <div className=" flex flex-col gap-2">
              <Label className="text-start font-bold" htmlFor="state">
                State
              </Label>
              <Input type="text" className="hidden" />

              <Select
                onValueChange={(value) => {
                  setFilters((prev) => ({
                    ...prev,
                    state: value,
                    lga: null,
                  }));
                }}
                value={filters.state}
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
            </div>

            {/* Local Government Area */}
            <div className=" flex flex-col gap-2">
              <Label className="text-start font-bold" htmlFor="lga">
                LGA
              </Label>
              <Input type="text" className="hidden" />

              <Select
                onValueChange={(value) => {
                  setFilters((prev) => ({
                    ...prev,
                    lga: value,
                  }));
                }}
                value={filters.lga || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="-select-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filters.state ? (
                      NIGERIAN_STATE_CITIES[filters.state].map((lga) => (
                        <SelectItem key={lga} value={String(lga)}>
                          {lga}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value={"select"} disabled>
                        Select a state first
                      </SelectItem>
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Availability Date  */}
            {/* <div className=" flex flex-col gap-2">
              <Label
                className="text-start font-bold"
                htmlFor="availabilityDate"
              >
                Avalability Date
              </Label>
              <Input type="text" className="hidden" />

              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full pl-3 text-left font-normal"
                  >
                    {filters.availableFrom
                      ? formatDate(filters.availableFrom)
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
                    selected={filters.availableFrom}
                    onSelect={(date: Date) => {
                      if (!date) {
                        return;
                      }

                      setFilters((prev) => ({
                        ...prev,
                        availableFrom: date,
                      }));
                    }}
                    disabled={(date: Date) => date < new Date()}
                    className="rounded-md border bg-white z-50"
                  />
                </PopoverContent>
              </Popover>
            </div> */}

            {/* Pricing Model  */}
            <div className=" flex flex-col gap-2">
              <Label className="text-start font-bold" htmlFor="pricingModel">
                Pricing Model
              </Label>
              <Input type="text" className="hidden" />

              <Select
                onValueChange={(value) => {
                  setFilters((prev) => ({
                    ...prev,
                    pricingModel: value,
                  }));
                }}
                value={filters.pricingModel}
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
            </div>
          </div>

          {/* Key Features */}
          {/* <div>
            <div className="flex flex-col sm:flex-row gap-6 mt-2">
              <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <Label>No of bedrooms</Label>
                <Input type="string" className="hidden" />
                <Select
                  onValueChange={(value) => {
                    setFilters((prev) => ({
                      ...prev,
                      numberOfBedrooms: value,
                    }));
                  }}
                  value={filters.numberOfBedrooms || ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-select-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {numberOfBedRoomsArray.map((num) => (
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
                <Input type="string" className="hidden" />
                <Select
                  onValueChange={(value) => {
                    setFilters((prev) => ({
                      ...prev,
                      numberOfBathrooms: value,
                    }));
                  }}
                  value={filters.numberOfBathrooms || ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="-select-" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {numberOfBathroomsArray.map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div> */}

          {/* Amenities and Facilites */}
          {/* <div>
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
                  selected={filters.amenities}
                  onSelect={(value) => {
                    setFilters((prev) => ({
                      ...prev,
                      amenities: value,
                    }));
                  }}
                />
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
                  selected={filters.facilities}
                  onSelect={(value) => {
                    setFilters((prev) => ({
                      ...prev,
                      facilities: value,
                    }));
                  }}
                />
              </div>
            </div>
          </div> */}

          <div className="flex gap-4 justify-end items-center pt-2 ">
            <Button onClick={handleClearFilters} className="btn-danger">
              Clear Filters
            </Button>
            <Button
              className="btn-primary"
              onClick={() => {
                handleApplyFilters();
              }}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFilterModal;
