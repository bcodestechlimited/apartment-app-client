import { propertyService } from "@/api/property.api";
import { PublicPropertyCard } from "@/components/shared/propertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { IProperty } from "@/interfaces/property.interface";
import { useQuery } from "@tanstack/react-query";

export default function CoWorkingSpaces() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["properties"],
    queryFn: () =>
      propertyService.getProperties({
        page: 1,
        limit: 4,
      }),
  });

  return (
    <section className="py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Find co-working spaces around you
        </h2>
        <a href="#" className="text-sm hover:underline">
          View more →
        </a>
      </div>
      <PropertyGrid
        properties={data?.properties}
        isLoading={isLoading}
        isError={isError}
      />
    </section>
  );
}

function PropertyGrid({ properties, isLoading, isError }: any) {
  if (isLoading) return <PropertySkeletonGrid />;

  if (isError)
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );

  if (!properties || properties.length < 1) {
    return (
      <div className="col-span-4 py-6">
        <p className="text-center">No properties found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {properties.map((property: IProperty) => (
        <PublicPropertyCard
          property={property}
          key={property._id}
          label="New Listing"
        />
      ))}
    </div>
  );
}

function PropertySkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-lg border space-y-2 bg-white">
          <Skeleton className="h-40 w-full rounded-none" />
          <div className="space-y-2 p-4">
            <Skeleton className="h-4 w-2/4" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
