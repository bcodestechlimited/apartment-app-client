import { Loader } from "lucide-react";
import { AdminPropertyCard } from "./_components/admin-property-card";
import type { IProperty } from "@/interfaces/property.interface";
import { useQuery } from "@tanstack/react-query";
import { adminPropertyService } from "@/api/admin/admin-property.api";
import { useSearchParams } from "react-router";
import PropertyFilters from "./_components/property-filters";

export default function AdminPropertyManagement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);
  const isVerified = searchParams.get("isVerified");
  const type = searchParams.get("type");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-properties", [page, limit, isVerified, type]],
    queryFn: () =>
      adminPropertyService.getProperties({
        page,
        limit,
        isVerified: isVerified === null ? undefined : isVerified === "true",
        type: type || undefined,
      }),
  });

  console.log({ data });

  return (
    <div>
      <PropertyFilters />
      <PropertiesGrid
        properties={data?.properties || []}
        isLoading={isLoading}
      />
    </div>
  );
}

interface PropertiesGridProps {
  properties: IProperty[];
  isLoading: boolean;
}
function PropertiesGrid({ properties, isLoading }: PropertiesGridProps) {
  if (isLoading)
    return (
      <div className="flex justify-center animate-spin">
        <Loader />
      </div>
    );

  if (!properties.length || properties.length < 1) {
    return (
      <div className="flex justify-center">
        <p>No properties found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {properties.map((property: IProperty) => (
        <AdminPropertyCard
          property={property}
          key={property._id}
          link={`/admin/properties/${property._id}`}
        />
      ))}
    </div>
  );
}
