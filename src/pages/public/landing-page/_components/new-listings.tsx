import { propertyService } from "@/api/property.api";
import { PublicPropertyCard } from "@/components/shared/propertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { IProperty } from "@/interfaces/property.interface";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { Layers } from "lucide-react";
import { Link } from "react-router";

export default function NewListings() {
  const { user } = useAuthStore();

  const isLandord =
    user && user?.roles?.includes("landlord")
      ? "/dashboard/landlord/"
      : "/dashboard";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["properties"],
    queryFn: () =>
      propertyService.getProperties({
        page: 1,
        limit: 4,
      }),
  });

  return (
    <div className="">
      <div className="max-w-custom">
        <section className="py-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">New Listings</h2>
            <Link to="/properties" className="text-sm hover:underline">
              View more →
            </Link>
          </div>
          <PropertyGrid
            properties={data?.properties}
            isLoading={isLoading}
            isError={isError}
          />
        </section>
      </div>
    </div>
  );
}

function PropertyGrid({ properties, isLoading, isError }: any) {
  const { user } = useAuthStore();

  const isLandlord = user?.roles?.includes("landlord");
  const isTenant = user?.roles?.includes("tenant");
  const isAuthenticated = !!user;

  const getPropertyLink = (propertyId: string) => {
    console.log({
      isAuthenticated: !isAuthenticated,
      isLandlord,
      isTenant,
    });

    if (!isAuthenticated) return `/property/${propertyId}`;
    if (isLandlord) return `/dashboard/landlord/property/${propertyId}`;
    if (isTenant) return `/dashboard/property/${propertyId}`;
    return `/property/${propertyId}`;
  };

  if (isLoading) return <PropertySkeletonGrid />;

  if (isError) {
    return (
      <div>
        <p>Something went wrong</p>
      </div>
    );
  }

  if (!properties || properties.length < 1) {
    return (
      <div className="col-span-4 py-8 flex flex-col gap-1 items-center">
        <Layers className="w-16 h-16 text-custom-primary" />
        <p className="text-center text-lg text-custom-primary">
          No properties found.
        </p>
        <p className="text-center text-sm text-custom-primary/70">
          Please check back later.
        </p>
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
          link={getPropertyLink(property._id)}
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
