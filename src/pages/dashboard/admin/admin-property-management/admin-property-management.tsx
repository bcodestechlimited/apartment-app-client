import { Loader } from "lucide-react";
import { AdminPropertyCard } from "./_components/admin-property-card";
import type { IProperty } from "@/interfaces/property.interface";
import { useQuery } from "@tanstack/react-query";
import { adminPropertyService } from "@/api/admin/admin-property.api";
import { useSearchParams } from "react-router";
import PropertyFilters from "./_components/property-filters";
import { Pagination } from "../../../../components/custom/pagination";

export default function AdminPropertyManagement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 12);
  const isVerified = searchParams.get("isVerified");
  const propertyType = searchParams.get("propertyType");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-properties", [page, limit, isVerified, propertyType]],
    queryFn: () =>
      adminPropertyService.getProperties({
        page,
        limit,
        isVerified: isVerified === null ? undefined : isVerified === "true",
        propertyType: propertyType || undefined,
      }),
  });

  const pagination = data?.pagination;
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
    // Optional: scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  console.log({ data });

  return (
    <div>
      <PropertyFilters />
      <PropertiesGrid
        properties={data?.properties || []}
        isLoading={isLoading}
      />
      {/* CLEAN PAGINATION COMPONENT */}
      <div className="">
        {pagination && (
          <Pagination
            currentPage={page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6">
      {properties?.map((property: IProperty) => (
        <AdminPropertyCard
          property={property}
          key={property._id}
          link={`/dashboard/admin/properties/${property._id}`}
        />
      ))}
    </div>
  );
}
