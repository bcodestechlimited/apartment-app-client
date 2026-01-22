import { propertyService } from "@/api/property.api";
import { Loader } from "@/components/custom/loader";
import { PublicPropertyCard } from "@/components/shared/propertyCard";
import { Button } from "@/components/ui/button";
import type { IProperty } from "@/interfaces/property.interface";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "react-router";
import AddFilterModal from "./_components/add-filter-modal";
import { useState } from "react";
import { getQueryFilters } from "@/lib/helpers";
import { systemSettingsService } from "@/api/admin/system-settings.api";

type FilterData = Record<string, string | number | undefined | null>;

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const filters = getQueryFilters(searchParams);

  const handleApplyFilters = (filters: FilterData) => {
    console.log(filters);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          params.set(key, JSON.stringify(value));
        } else {
          params.set(key, String(value));
        }
      }
    });
    setSearchParams(params);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["properties", filters],
    queryFn: () =>
      propertyService.getProperties({
        page,
        limit,
        ...filters,
      }),
  });

  const { data: settings } = useQuery({
    queryKey: ["system-settings"],
    queryFn: () => systemSettingsService.getSettings(),
  });

  console.log("explore", data);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end">
        <Button onClick={openModal} className="px-6 btn-primary">
          <SearchIcon /> Filter
        </Button>
        <AddFilterModal
          // propertyType="co-working space" // example value
          isOpen={isModalOpen}
          closeModal={closeModal}
          onApplyFilters={handleApplyFilters}
        />
      </div>

      <PropertiesGrid
        isLoading={isLoading}
        properties={data?.properties || []}
        settings={settings}
      />
    </div>
  );
}

interface PropertiesGridProps {
  properties: IProperty[];
  isLoading: boolean;
  settings: { platformFeePercentage: number };
}

export function PropertiesGrid({
  properties,
  isLoading,
  settings,
}: PropertiesGridProps) {
  if (isLoading) return <Loader />;

  if (!properties.length || properties.length < 1) {
    return (
      <div className="flex justify-center">
        <p>No properties found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {properties.map((property: IProperty) => (
        <PublicPropertyCard
          property={property}
          key={property._id}
          link={`/dashboard/properties/${property._id}`}
          settings={settings}
        />
      ))}
    </div>
  );
}
