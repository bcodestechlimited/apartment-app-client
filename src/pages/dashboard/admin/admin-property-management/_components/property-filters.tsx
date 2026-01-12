import { useSearchParams } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function PropertyFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (!value || value === "all") {
      params.delete(key); // Remove the filter if empty
    } else {
      params.set(key, value);
    }

    params.set("page", "1"); // Reset to first page on filter change
    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchParams({});
  };

  return (
    <div className="flex gap-2 flex-wrap items-center justify-end mb-6">
      {/* Filter by Verification Status */}
      <div className="">
        <Select
          value={searchParams.get("isVerified") || ""}
          onValueChange={(value) => handleChange("isVerified", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Verification Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Verified</SelectItem>
            <SelectItem value="false">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Filter by Property Type */}
      <div className="">
        <Select
          value={searchParams.get("propertyType") || ""}
          onValueChange={(value) => handleChange("propertyType", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="standard-rental">Standard Rental</SelectItem>
            <SelectItem value="serviced-apartment">
              Serviced Apartment
            </SelectItem>
            <SelectItem value="shared-apartment">Shared Apartment</SelectItem>
            <SelectItem value="co-working-space">Co-working Space</SelectItem>
            <SelectItem value="short-let">Short Let</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="outline"
        onClick={handleReset}
        className="bg-custom-primary text-white hover:bg-custom-primary/90 hover:text-white cursor-pointer"
      >
        Reset Filters
      </Button>
    </div>
  );
}
