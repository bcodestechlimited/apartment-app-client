// import CustomMultiSelect from "@/components/custom/custom-multi-select";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import React, { useState } from "react";
// import { propertyTypes } from "@/interfaces/property.interface";
// import { amenities } from "@/interfaces/property.interface";
// import { duration } from "@/interfaces/property.interface";

// interface AddFilterModalProps {
//   //   propertyType: string; // <-- added back this comment
//   isOpen: boolean;
//   closeModal: () => void;
// }
// const AddFilterModal = ({ isOpen, closeModal }: AddFilterModalProps) => {
//   const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

//   return (
//     <Dialog open={isOpen} onOpenChange={closeModal}>
//       <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
//         <p>Filters</p>
//         <hr />
//         <p>Property type</p>

//         <CustomMultiSelect
//           options={propertyTypes}
//           selected={selectedAmenities}
//           onSelect={(value) => {
//             setSelectedAmenities(value);
//             setValue("amenities", value);
//             clearErrors(["amenities"]);
//           }}
//         />
//         <h2>Price range</h2>
//         <div className=" flex   justify-between">
//           <div>
//             <p>Min</p>
//             <button className=" border border-gray-400 rounded-lg  px-8 py-2">
//               #50,000
//             </button>
//           </div>
//           <div className="flex flex-col items-end">
//             <p>Max</p>
//             <button className=" border border-gray-400 rounded-lg  px-8 py-2">
//               #100,000
//             </button>
//           </div>
//         </div>
//         <hr />
//         <div>
//           <h2>Beds and Bathrooms</h2>
//           <p>Beds</p>
//           <p>Bathrooms</p>
//         </div>
//         <hr />
//         <div className="flex flex-col gap-4">
//           <h2>Unit essentials</h2>
//           <CustomMultiSelect
//             options={amenities}
//             selected={selectedAmenities}
//             onSelect={(value) => {
//               setSelectedAmenities(value);
//               setValue("amenities", value);
//               clearErrors(["amenities"]);
//             }}
//           />
//           <p>show more</p>
//         </div>
//         <hr />
//         <div>
//           <h2 className="pb-3">Duration</h2>
//           <CustomMultiSelect
//             options={duration}
//             selected={selectedAmenities}
//             onSelect={(value) => {
//               setSelectedAmenities(value);
//               setValue("amenities", value);
//               clearErrors(["amenities"]);
//             }}
//           />
//         </div>
//         <hr />
//         <div>
//           <h2 className="pb-3">Availability time</h2>
//           <CustomMultiSelect
//             options={amenities}
//             selected={selectedAmenities}
//             onSelect={(value) => {
//               setSelectedAmenities(value);
//               setValue("amenities", value);
//               clearErrors(["amenities"]);
//             }}
//           />
//           <p>show more</p>
//         </div>
//   </DialogContent>
// </Dialog>
//   );
// };

// export default AddFilterModal;

// second snippet
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AddFilterModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

interface FilterState {
  propertyType: string[];
  priceRange: { min: number; max: number };
  beds: number | null;
  bathrooms: number | null;
  essentials: string[];
  duration: string;
  availabilityTime: string;
}

const AddFilterModal = ({ isOpen, closeModal }: AddFilterModalProps) => {
  //   const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    propertyType: ["Standard rental"],
    priceRange: { min: 50000, max: 100000 },
    beds: null,
    bathrooms: null,
    essentials: ["Wi-Fi", "Kitchen", "Private bath"],
    duration: "Short term",
    availabilityTime: "All day",
  });

  const [showMoreEssentials, setShowMoreEssentials] = useState(false);

  const propertyTypes = [
    "Standard rental",
    "Short let",
    "Serviced apartment",
    "Shared apartment",
  ];

  const essentialsList = [
    "Wi-Fi",
    "Kitchen",
    "Gym",
    "Air Conditioner",
    "Washer",
    "Private bath",
    "Wi-Fi",
    "Kitchen",
    "Wi-Fi",
  ];

  const togglePropertyType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter((t) => t !== type)
        : [...prev.propertyType, type],
    }));
  };

  const toggleEssential = (essential: string) => {
    setFilters((prev) => ({
      ...prev,
      essentials: prev.essentials.includes(essential)
        ? prev.essentials.filter((e) => e !== essential)
        : [...prev.essentials, essential],
    }));
  };

  const handlePriceChange = (type: "min" | "max", value: number) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value,
      },
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      propertyType: [],
      priceRange: { min: 0, max: 200000 },
      beds: null,
      bathrooms: null,
      essentials: [],
      duration: "",
      availabilityTime: "All day",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Filters</h2>
        <hr />
        {/* Property Type */}
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Property type
          </h3>
          <div className="flex flex-wrap gap-3">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => togglePropertyType(type)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                  filters.propertyType.includes(type)
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <hr />
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Price range
          </h3>

          {/* Price Range Slider */}
          <div className="relative mb-6">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-teal-600 rounded-full relative"
                style={{
                  width: `${
                    ((filters.priceRange.max - filters.priceRange.min) /
                      200000) *
                    100
                  }%`,
                  marginLeft: `${(filters.priceRange.min / 200000) * 100}%`,
                }}
              >
                <div className="absolute -right-2 -top-1 w-4 h-4 bg-teal-600 rounded-full border-2 border-white shadow-md cursor-pointer"></div>
                <div className="absolute -left-2 -top-1 w-4 h-4 bg-teal-600 rounded-full border-2 border-white shadow-md cursor-pointer"></div>
              </div>
            </div>
          </div>

          {/* Price Inputs */}

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-[14px] font-medium text-gray-700 mb-2">
                Min
              </label>
              <input
                type="text"
                value={`₦${filters.priceRange.min.toLocaleString()}`}
                onChange={(e) => {
                  const value =
                    parseInt(e.target.value.replace(/[₦,]/g, "")) || 0;
                  handlePriceChange("min", value);
                }}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max
              </label>
              <input
                type="text"
                value={`₦${filters.priceRange.max.toLocaleString()}`}
                onChange={(e) => {
                  const value =
                    parseInt(e.target.value.replace(/[₦,]/g, "")) || 0;
                  handlePriceChange("max", value);
                }}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Beds and Bathrooms */}
        <hr />
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Beds and Bathrooms
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beds
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white"
                value={filters.beds || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    beds: e.target.value ? parseInt(e.target.value) : null,
                  }))
                }
              >
                <option value="">Any</option>
                <option value="1">1 bed</option>
                <option value="2">2 beds</option>
                <option value="3">3 beds</option>
                <option value="4">4+ beds</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bathrooms
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-600 bg-white"
                value={filters.bathrooms || ""}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    bathrooms: e.target.value ? parseInt(e.target.value) : null,
                  }))
                }
              >
                <option value="">Any</option>
                <option value="1">1 bathroom</option>
                <option value="2">2 bathrooms</option>
                <option value="3">3+ bathrooms</option>
              </select>
            </div>
          </div>
        </div>

        {/* Unit Essentials */}
        <hr />
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Unit essentials
          </h3>
          <div className="flex flex-wrap gap-3">
            {essentialsList
              .slice(0, showMoreEssentials ? essentialsList.length : 9)
              .map((essential, index) => (
                <button
                  key={`${essential}-${index}`}
                  onClick={() => toggleEssential(essential)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                    filters.essentials.includes(essential)
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {essential}
                </button>
              ))}
          </div>

          {!showMoreEssentials && (
            <button
              onClick={() => setShowMoreEssentials(true)}
              className="mt-3 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              Show more
              <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Duration */}
        <hr />
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Duration</h3>
          <div className="flex gap-3">
            {["Short term", "Long term"].map((duration) => (
              <button
                key={duration}
                onClick={() => setFilters((prev) => ({ ...prev, duration }))}
                className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                  filters.duration === duration
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                }`}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>

        {/* Availability Time */}
        <hr />
        <div className="mb-8 ">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Availability time
          </h3>
          <div className="flex justify-between items-center">
            <div className="mb-4 bg-[#FAFAFA] p-3 rounded-lg">
              <label className="block text-sm text-gray-600 mb-3">
                Select time:
              </label>
              <div className="flex bg-white rounded-lg p-1">
                {["All day", "Time", "Range"].map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      setFilters((prev) => ({
                        ...prev,
                        availabilityTime: option,
                      }))
                    }
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                      filters.availabilityTime === option
                        ? "bg-[#0045421A] text-[#004542] shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end pt-4 ">
              <button
                onClick={clearAllFilters}
                className="border border-[#0045424D] rounded-md px-4 py-2 text-sm font-medium text-[#004542] hover:text-teal-700 transition-colors"
              >
                CLEAR ALL
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFilterModal;
