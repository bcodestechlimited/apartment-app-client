import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Check, ChevronsUpDown } from "lucide-react";
import { useSearchParams } from "react-router";
import { propertyService } from "@/api/property.api";
import type { IProperty } from "@/interfaces/property.interface";
import { PublicPropertyCard } from "@/components/shared/propertyCard";
import { useAuthStore } from "@/store/useAuthStore";
import { Pagination } from "@/pages/dashboard/shared/_components/pagination";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  NIGERIAN_STATES,
  NIGERIAN_STATE_CITIES,
} from "@/constants/nigerian-states";
import { useDebounce } from "@/hooks/use-debounce";

export default function PropertySearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const propertyType = searchParams.get("propertyType") || "";
  const city = searchParams.get("city") || "";
  const state = searchParams.get("state") || "";
  const priceRange = searchParams.get("priceRange") || "";
  const numberOfBedrooms = searchParams.get("bedrooms") || "";
  const numberOfBathrooms = searchParams.get("bathrooms") || "";
  const searchFromUrl = searchParams.get("search") || "";
  const pricingModel = searchParams.get("pricingModel") || "";
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const { user } = useAuthStore();
  const isLandlord = user?.roles?.includes("landlord");
  const isTenant = user?.roles?.includes("tenant");
  const isAdmin = user?.roles?.includes("admin");
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
        search: searchFromUrl, // Ensure query uses URL param, not local state
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
        search: searchFromUrl,
        pricingModel,
        minPrice,
        maxPrice,
      }),
  });

  const properties = data?.properties || [];
  const pagination = data?.pagination;
  useEffect(() => {
    if (debouncedSearch !== searchFromUrl) {
      const params = new URLSearchParams(searchParams);
      if (debouncedSearch) {
        params.set("search", debouncedSearch);
      } else {
        params.delete("search");
      }
      params.set("page", "1"); // Always reset to page 1 on new search
      setSearchParams(params);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    if (searchFromUrl !== searchQuery) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchFromUrl]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    value ? params.set(key, value) : params.delete(key);
    params.set("page", "1");
    setSearchParams(params);
  };

  const handleGetLink = (propertyId: string) => {
    if (isTenant) return `/dashboard/properties/${propertyId}`;
    if (isLandlord) return `/dashboard/landlord/properties/${propertyId}`;
    if (isAdmin) return `/admin/properties/${propertyId}`;
    return `/properties/${propertyId}`;
  };

  return (
    <div className="max-w-custom py-10 px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-semibold">Property Search Results</h2>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name..."
            className="pl-9 rounded-sm"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="md:w-1/4 border p-4 rounded-2xl shadow-sm h-fit md:sticky md:top-8 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filters</h3>
            <Button
              className="cursor-pointer text-primary"
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchParams({});
                setSearchQuery(""); // Explicitly clear local search state too
              }}
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

            {/* --- STATE COMBOBOX --- */}
            <Popover open={openState} onOpenChange={setOpenState}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openState}
                  className="w-full justify-between font-normal text-muted-foreground data-[state=open]:text-foreground"
                >
                  {state ? (
                    <span className="text-foreground">{state}</span>
                  ) : (
                    "Select state"
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Search state..." />
                  <CommandList>
                    <CommandEmpty>No state found.</CommandEmpty>
                    <CommandGroup>
                      {NIGERIAN_STATES.map((stateItem) => (
                        <CommandItem
                          key={stateItem}
                          value={stateItem}
                          onSelect={() => {
                            // Update both params at once to prevent overwriting
                            const params = new URLSearchParams(searchParams);
                            params.set("state", stateItem);
                            params.delete("city"); // Always reset city when state changes
                            params.set("page", "1");
                            setSearchParams(params);
                            setOpenState(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              state === stateItem ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {stateItem}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* --- CITY COMBOBOX --- */}
            <Popover open={openCity} onOpenChange={setOpenCity}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCity}
                  disabled={!state}
                  className="w-full justify-between font-normal text-muted-foreground data-[state=open]:text-foreground"
                >
                  {city ? (
                    <span className="text-foreground">{city}</span>
                  ) : (
                    "Select city"
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Search city..." />
                  <CommandList>
                    <CommandEmpty>No city found.</CommandEmpty>
                    <CommandGroup>
                      {state &&
                        NIGERIAN_STATE_CITIES[state]?.map((cityItem) => (
                          <CommandItem
                            key={cityItem}
                            value={cityItem}
                            onSelect={() => {
                              handleFilterChange("city", cityItem);
                              setOpenCity(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                city === cityItem ? "opacity-100" : "opacity-0",
                              )}
                            />
                            {cityItem}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

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
                    onClick={() => {
                      setSearchParams({});
                      setSearchQuery("");
                    }}
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
