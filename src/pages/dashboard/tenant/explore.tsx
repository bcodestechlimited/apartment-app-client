import { propertyService } from "@/api/property.api";
import { Loader } from "@/components/custom/loader";
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

      <PropertiesGrid
        isLoading={isLoading}
        properties={data?.properties || []}
      />
    </div>
  );
}

interface PropertiesGridProps {
  properties: IProperty[];
  isLoading: boolean;
}

export function PropertiesGrid({ properties, isLoading }: PropertiesGridProps) {
  if (isLoading) return <Loader />;

  if (!properties.length)
    return (
      <div className="flex justify-center">
        <p>No properties found.</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {properties.map((property: IProperty) => (
        <PublicPropertyCard
          property={property}
          key={property._id}
          link={`/dashboard/property/${property._id}`}
        />
      ))}
    </div>
  );
}
