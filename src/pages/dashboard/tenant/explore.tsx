import { propertyService } from "@/api/property.api";
import { PublicPropertyCard } from "@/components/shared/propertyCard";
import { Button } from "@/components/ui/button";
import type { IProperty } from "@/interfaces/property.interface";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "react-router";

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { data, isLoading } = useQuery({
    queryKey: ["landlord-properties", { page, limit }],
    queryFn: () =>
      propertyService.getProperties({
        page: 1,
        limit: 10,
      }),
  });

  return (
    <div>
      <div className="flex justify-end">
        <Button className="px-6">
          <SearchIcon /> Filter
        </Button>
      </div>

      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.properties.map((property: IProperty) => {
              return (
                <PublicPropertyCard property={property} key={property._id} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
