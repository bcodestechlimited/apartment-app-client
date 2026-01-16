// import { useQuery } from "@tanstack/react-query";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Loader2, Search, ChevronLeft, ChevronRight } from "lucide-react";
// import { useSearchParams } from "react-router";
// import { propertyService } from "@/api/property.api";
// import type { IProperty } from "@/interfaces/property.interface";
// import { PublicPropertyCard } from "@/components/shared/propertyCard";
// import { useAuthStore } from "@/store/useAuthStore";

// export default function PropertySearch() {
//   const [searchParams, setSearchParams] = useSearchParams();

//   // Extracting pagination and filters from URL
//   const currentPage = Number(searchParams.get("page")) || 1;
//   const propertyType = searchParams.get("propertyType") || "";
//   const city = searchParams.get("city") || "";
//   const state = searchParams.get("state") || "";
//   const priceRange = searchParams.get("priceRange") || "";
//   const numberOfBedrooms = searchParams.get("bedrooms") || "";
//   const numberOfBathrooms = searchParams.get("bathrooms") || "";
//   const search = searchParams.get("search") || "";
//   const pricingModel = searchParams.get("pricingModel") || "";

//   const { user } = useAuthStore();
//   const isLandlord = user?.roles?.includes("landlord");
//   const isTenant = user?.roles?.includes("tenant");
//   const isAdmin = user?.roles?.includes("admin");

//   let minPrice = "";
//   let maxPrice = "";

//   if (priceRange) {
//     if (priceRange.includes("+")) {
//       // Handle "200000+"
//       minPrice = priceRange.replace("+", "");
//     } else if (priceRange.includes("-")) {
//       // Handle "100000-200000"
//       const [min, max] = priceRange.split("-");
//       minPrice = min;
//       maxPrice = max;
//     }
//   }

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: [
//       "properties",
//       {
//         page: currentPage,
//         propertyType,
//         city,
//         state,
//         priceRange,
//         numberOfBedrooms,
//         numberOfBathrooms,
//         search,
//         pricingModel,
//       },
//     ],
//     queryFn: () =>
//       propertyService.getProperties({
//         page: currentPage,
//         limit: 10,
//         propertyType,
//         city,
//         state,
//         priceRange,
//         numberOfBedrooms,
//         numberOfBathrooms,
//         search,
//         pricingModel,
//         minPrice,
//         maxPrice,
//       }),
//   });

//   // Extract from response based on your shared API JSON structure
//   const properties = data?.properties || [];
//   const pagination = data?.pagination;

//   const handlePageChange = (newPage: number) => {
//     const params = new URLSearchParams(searchParams);
//     params.set("page", newPage.toString());
//     setSearchParams(params);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleFilterChange = (key: string, value: string) => {
//     const params = new URLSearchParams(searchParams);
//     if (value) {
//       params.set(key, value);
//     } else {
//       params.delete(key);
//     }
//     params.set("page", "1"); // Always reset to page 1 when filtering
//     setSearchParams(params);
//   };

//   const handleGetLink = (propertyId: string) => {
//     if (isTenant) return `/dashboard/properties/${propertyId}`;
//     if (isLandlord) return `/dashboard/landlord/properties/${propertyId}`;
//     if (isAdmin) return `/admin/properties/${propertyId}`;
//     return `/property/${propertyId}`;
//   };

//   return (
//     <div className="max-w-custom py-10 px-4 md:px-0">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <h2 className="text-2xl font-semibold">Property Search Results</h2>
//         <div className="relative w-full md:w-72">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
//           <Input
//             value={search}
//             onChange={(e) => handleFilterChange("search", e.target.value)}
//             placeholder="Search by name..."
//             className="pl-9 rounded-sm"
//           />
//         </div>
//       </div>

//       <p className="text-lg text-gray-500 mb-4 text-start">
//         {pagination?.filteredCount || 0} properties found
//       </p>

//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Filters Sidebar */}
//         <div className="md:w-1/4 border p-4 rounded-2xl shadow-sm h-fit md:sticky md:top-8 bg-white">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-medium">Filters</h3>
//             <Button
//               className="cursor-pointer text-primary"
//               variant="ghost"
//               size="sm"
//               onClick={() => setSearchParams({})}
//             >
//               Clear all
//             </Button>
//           </div>

//           <div className="space-y-4">
//             <Select
//               value={propertyType}
//               onValueChange={(val) => handleFilterChange("propertyType", val)}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Property Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="standard-rental">Standard Rental</SelectItem>
//                 <SelectItem value="serviced-apartment">
//                   Serviced Apartment
//                 </SelectItem>
//                 <SelectItem value="shared-apartment">
//                   Shared Apartment
//                 </SelectItem>
//                 <SelectItem value="co-working-space">
//                   Co-working Space
//                 </SelectItem>
//                 <SelectItem value="short-let">Short Let</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select
//               value={pricingModel}
//               onValueChange={(val) => handleFilterChange("pricingModel", val)}
//             >
//               <SelectTrigger className="w-full">
//                 <SelectValue placeholder="Pricing Model" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="hourly">Hourly</SelectItem>
//                 <SelectItem value="daily">Daily</SelectItem>
//                 <SelectItem value="weekly">Weekly</SelectItem>
//                 <SelectItem value="monthly">Monthly</SelectItem>
//                 <SelectItem value="yearly">Yearly</SelectItem>
//               </SelectContent>
//             </Select>

//             <Input
//               placeholder="State (e.g. Lagos)"
//               value={state}
//               onChange={(e) => handleFilterChange("state", e.target.value)}
//             />

//             <Input
//               placeholder="City"
//               value={city}
//               onChange={(e) => handleFilterChange("city", e.target.value)}
//             />

//             <Select
//               value={priceRange}
//               onValueChange={(val) => handleFilterChange("priceRange", val)}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Price Range" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="0-100000">₦0 - ₦100,000</SelectItem>
//                 <SelectItem value="100000-200000">
//                   ₦100,000 - ₦200,000
//                 </SelectItem>
//                 <SelectItem value="200000+">₦200,000+</SelectItem>
//               </SelectContent>
//             </Select>

//             <Input
//               type="number"
//               placeholder="No. of bedrooms"
//               value={numberOfBedrooms}
//               onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
//             />

//             <Button
//               onClick={() => refetch()}
//               className="w-full btn-primary mt-2"
//             >
//               Apply Filters
//             </Button>
//           </div>
//         </div>

//         {/* Property List & Pagination */}
//         <div className="md:w-3/4">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <Loader2 className="animate-spin text-primary" size={32} />
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {properties.map((property: IProperty) => (
//                   <PublicPropertyCard
//                     property={property}
//                     key={property._id}
//                     link={handleGetLink(property._id)}
//                   />
//                 ))}
//               </div>

//               {/* Numeric Pagination Controls */}
//               {pagination && pagination.totalPages > 1 && (
//                 <div className="flex flex-col items-center justify-center gap-4 mt-12 pb-10">
//                   <div className="flex items-center gap-2">
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-9 w-9"
//                       disabled={currentPage <= 1}
//                       onClick={() => handlePageChange(currentPage - 1)}
//                     >
//                       <ChevronLeft size={18} />
//                     </Button>

//                     <div className="flex items-center gap-1">
//                       {Array.from(
//                         { length: pagination.totalPages },
//                         (_, i) => i + 1
//                       ).map((page) => {
//                         // Display logic: First, Last, and neighbors of current
//                         if (
//                           page === 1 ||
//                           page === pagination.totalPages ||
//                           (page >= currentPage - 1 && page <= currentPage + 1)
//                         ) {
//                           return (
//                             <Button
//                               key={page}
//                               variant={
//                                 currentPage === page ? "default" : "outline"
//                               }
//                               size="sm"
//                               className="h-9 w-9"
//                               onClick={() => handlePageChange(page)}
//                             >
//                               {page}
//                             </Button>
//                           );
//                         }

//                         // Ellipses
//                         if (
//                           page === currentPage - 2 ||
//                           page === currentPage + 2
//                         ) {
//                           return (
//                             <span key={page} className="px-1 text-gray-400">
//                               ...
//                             </span>
//                           );
//                         }
//                         return null;
//                       })}
//                     </div>

//                     <Button
//                       variant="outline"
//                       size="icon"
//                       className="h-9 w-9"
//                       disabled={currentPage >= pagination.totalPages}
//                       onClick={() => handlePageChange(currentPage + 1)}
//                     >
//                       <ChevronRight size={18} />
//                     </Button>
//                   </div>

//                   <span className="text-xs text-gray-500">
//                     Page {pagination.page} of {pagination.totalPages}
//                   </span>
//                 </div>
//               )}

//               {properties.length === 0 && (
//                 <div className="text-center py-20">
//                   <p className="text-gray-500 text-lg">
//                     No properties found matching your criteria.
//                   </p>
//                   <Button
//                     variant="link"
//                     onClick={() => setSearchParams({})}
//                     className="mt-2 text-primary"
//                   >
//                     Reset all filters
//                   </Button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Search } from "lucide-react";
import { useSearchParams } from "react-router";
import { propertyService } from "@/api/property.api";
import type { IProperty } from "@/interfaces/property.interface";
import { PublicPropertyCard } from "@/components/shared/propertyCard";
import { useAuthStore } from "@/store/useAuthStore";
import { Pagination } from "@/pages/dashboard/shared/_components/pagination";

export default function PropertySearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract values from URL
  const currentPage = Number(searchParams.get("page")) || 1;
  const propertyType = searchParams.get("propertyType") || "";
  const city = searchParams.get("city") || "";
  const state = searchParams.get("state") || "";
  const priceRange = searchParams.get("priceRange") || "";
  const numberOfBedrooms = searchParams.get("bedrooms") || "";
  const numberOfBathrooms = searchParams.get("bathrooms") || "";
  const search = searchParams.get("search") || "";
  const pricingModel = searchParams.get("pricingModel") || "";

  const { user } = useAuthStore();
  const isLandlord = user?.roles?.includes("landlord");
  const isTenant = user?.roles?.includes("tenant");
  const isAdmin = user?.roles?.includes("admin");

  // Price parsing logic
  let minPrice = "";
  let maxPrice = "";
  if (priceRange) {
    if (priceRange.includes("+")) {
      minPrice = priceRange.replace("+", "");
    } else if (priceRange.includes("-")) {
      const [min, max] = priceRange.split("-");
      minPrice = min;
      maxPrice = max;
    }
  }

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "properties",
      {
        page: currentPage,
        propertyType,
        city,
        state,
        priceRange,
        numberOfBedrooms,
        numberOfBathrooms,
        search,
        pricingModel,
      },
    ],
    queryFn: () =>
      propertyService.getProperties({
        page: currentPage,
        limit: 12,
        propertyType,
        city,
        state,
        priceRange,
        numberOfBedrooms,
        numberOfBathrooms,
        search,
        pricingModel,
        minPrice,
        maxPrice,
      }),
  });

  const properties = data?.properties || [];
  const pagination = data?.pagination;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set(key, value) : params.delete(key);
    params.set("page", "1"); // Reset to page 1 on filter change
    setSearchParams(params);
  };

  const handleGetLink = (propertyId: string) => {
    if (isTenant) return `/dashboard/properties/${propertyId}`;
    if (isLandlord) return `/dashboard/landlord/properties/${propertyId}`;
    if (isAdmin) return `/admin/properties/${propertyId}`;
    return `/property/${propertyId}`;
  };

  return (
    <div className="max-w-custom py-10 px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-semibold">Property Search Results</h2>
        {/* CLEAN PAGINATION COMPONENT
        {pagination && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )} */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <Input
            value={search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            placeholder="Search by name..."
            className="pl-9 rounded-sm"
          />
        </div>
      </div>

      {/* <p className="text-lg text-gray-500 mb-4">
        {!isLoading && (pagination?.filteredCount || 0) + " properties  found"}
      </p> */}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="md:w-1/4 border p-4 rounded-2xl shadow-sm h-fit md:sticky md:top-8 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filters</h3>
            <Button
              className="cursor-pointer text-primary"
              variant="ghost"
              size="sm"
              onClick={() => setSearchParams({})}
            >
              Clear all
            </Button>
          </div>

          <div className="space-y-4">
            <Select
              value={propertyType}
              onValueChange={(val) => handleFilterChange("propertyType", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard-rental">Standard Rental</SelectItem>
                <SelectItem value="serviced-apartment">
                  Serviced Apartment
                </SelectItem>
                <SelectItem value="shared-apartment">
                  Shared Apartment
                </SelectItem>
                <SelectItem value="co-working-space">
                  Co-working Space
                </SelectItem>
                <SelectItem value="short-let">Short Let</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={pricingModel}
              onValueChange={(val) => handleFilterChange("pricingModel", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pricing Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="State (e.g. Lagos)"
              value={state}
              onChange={(e) => handleFilterChange("state", e.target.value)}
            />

            <Input
              placeholder="City"
              value={city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
            />

            <Select
              value={priceRange}
              onValueChange={(val) => handleFilterChange("priceRange", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-100000">₦0 - ₦100,000</SelectItem>
                <SelectItem value="100000-200000">
                  ₦100,000 - ₦200,000
                </SelectItem>
                <SelectItem value="200000+">₦200,000+</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="No. of bedrooms"
              value={numberOfBedrooms}
              onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
            />

            <Button
              onClick={() => refetch()}
              className="w-full btn-primary mt-2"
            >
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property: IProperty) => (
                  <PublicPropertyCard
                    property={property}
                    key={property._id}
                    link={handleGetLink(property._id)}
                  />
                ))}
              </div>

              {/* CLEAN PAGINATION COMPONENT */}
              <div className="">
                {pagination && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>

              {properties.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No properties found.</p>
                  <Button
                    variant="link"
                    onClick={() => setSearchParams({})}
                    className="text-primary"
                  >
                    Reset all filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
