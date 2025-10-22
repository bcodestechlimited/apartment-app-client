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

export default function PropertySearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  const propertyType = searchParams.get("propertyType") || "";
  const city = searchParams.get("city") || "";
  const priceRange = searchParams.get("priceRange") || "";
  const bedrooms = searchParams.get("bedrooms") || "";
  const bathrooms = searchParams.get("bathrooms") || "";

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "properties",
      {
        propertyType,
        city,
        priceRange,
        bedrooms,
        bathrooms,
      },
    ],
    queryFn: () =>
      propertyService.getProperties({
        page: 1,
        limit: 10,
        propertyType,
        city,
        priceRange,
        bedrooms,
        bathrooms,
      }),
  });

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, value);
    setSearchParams(params);
  };

  return (
    <div className="max-w-custom py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Property Search Results</h2>
        <div className="relative w-72">
          <Search className="absolute left-3 top-2 text-gray-400" size={18} />
          <Input placeholder="Search by name..." className="pl-9 rounded-sm" />
        </div>
      </div>

      <p className="text-lg text-gray-500 mb-4 text-start">
        {data?.properties?.length || 0} properties found
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className="md:w-1/4 border p-5 rounded-2xl shadow-sm h-fit sticky top-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filters</h3>
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="sm"
              onClick={() =>
                setSearchParams({
                  propertyType: "",
                  city: "",
                  priceRange: "",
                  bedrooms: "",
                  bathrooms: "",
                })
              }
            >
              Clear all
            </Button>
          </div>

          <div className="space-y-4">
            <Select
              onValueChange={(val) => handleFilterChange("propertyType", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-bedroom">1 Bedroom</SelectItem>
                <SelectItem value="2-bedroom">2 Bedroom</SelectItem>
                <SelectItem value="shared">Shared Apartment</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="City"
              value={city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
            />

            <Select
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
              value={bedrooms}
              onChange={(e) => handleFilterChange("bedrooms", e.target.value)}
            />

            <Input
              type="number"
              placeholder="No. of bathrooms"
              value={bathrooms}
              onChange={(e) => handleFilterChange("bathrooms", e.target.value)}
            />

            <Button onClick={() => refetch()} className="w-full btn-primary">
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Property List */}
        <div className="md:w-3/4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-gray-400" size={28} />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data?.properties?.map((property: IProperty) => (
                  <PublicPropertyCard
                    property={property}
                    key={property._id}
                    link={`/property/${property._id}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
