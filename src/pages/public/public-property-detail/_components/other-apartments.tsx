import { propertyService } from "@/api/property.api";
import { PublicPropertyCard } from "@/components/shared/propertyCard";
import type { IProperty } from "@/interfaces/property.interface";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface OtherApartmentsProps {
  currentPropertyId?: string;
}
export default function OtherApartments({
  currentPropertyId,
}: OtherApartmentsProps) {
  const { user } = useAuthStore();

  const isLandlord = user?.roles?.includes("landlord");
  const isTenant = user?.roles?.includes("tenant");
  const isAdmin = user?.roles?.includes("admin");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: () =>
      propertyService.getProperties({
        page: 1,
        limit: 4,
      }),
  });

  const handleGetLink = (propertyId: string) => {
    if (isTenant) return `/dashboard/properties/${propertyId}`;
    if (isLandlord) return `/dashboard/landlord/properties/${propertyId}`;
    if (isAdmin) return `/admin/properties/${propertyId}`;
    return `/properties/${propertyId}`;
  };

  return (
    <div className="w-full">
      <div className="">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-gray-400" size={28} />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {data?.properties
                ?.filter(
                  (property: IProperty) => property._id !== currentPropertyId
                )
                .slice(0, 3)
                .map((property: IProperty) => (
                  <PublicPropertyCard
                    property={property}
                    key={property._id}
                    link={handleGetLink(property._id)}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
