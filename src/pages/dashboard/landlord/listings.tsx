import { propertyService } from "@/api/property.api";
import { LandLordPropertyCard } from "@/components/shared/propertyCard";
import { Button } from "@/components/ui/button";
import type { IProperty } from "@/interfaces/property.interface";
import { cn, getActualTypeFromParam } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router";
import AddPropertyModal from "./_components/add-property-modal";
import { motion } from "motion/react";
import { Loader } from "@/components/custom/loader";
import { Plus } from "lucide-react";

export default function Listings() {
  const [selected, setSelected] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    "All",
    "Shared",
    "Serviced",
    "Standard",
    "Co-working space",
    "Short let",
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const type = searchParams.get("type") || "All";

  const { data, isLoading } = useQuery({
    queryKey: ["landlord-properties", { page, limit, type }],
    queryFn: () =>
      propertyService.getLandLordProperties({
        page: 1,
        limit: 10,
        type,
      }),
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  console.log({ data, type });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-custom-primary/10 w-fit rounded-full p-2">
          <ul className="relative flex items-center font-semibold text-sm gap-2">
            {categories.map((category) => {
              const isActive = selected === category;

              return (
                <motion.div
                  key={category}
                  className="relative cursor-pointer"
                  onClick={() => {
                    setSelected(category);
                    setSearchParams({
                      type: category.replace(" ", "-").toLowerCase(),
                    });
                  }}
                >
                  {/* Animated background */}
                  {isActive && (
                    <motion.div
                      layoutId="categoryHighlight"
                      className="absolute inset-0 bg-custom-primary rounded-full z-0"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Label */}
                  <li
                    className={cn(
                      "relative z-10 px-6 py-2 font-medium",
                      isActive ? "text-white" : "text-custom-primary"
                    )}
                    data-category={category}
                  >
                    {category}
                  </li>
                </motion.div>
              );
            })}
          </ul>
        </div>
        <Button
          onClick={openModal}
          className="text-lg px-6 py-5 font-medium cursor-pointer bg-custom-primary hover:bg-custom-primary/90"
        >
          <Plus /> Add new property
        </Button>
        <AddPropertyModal
          // propertyType="co-working space" // example value
          isOpen={isModalOpen}
          closeModal={closeModal}
        />
      </div>
      <div>
        <PropertiesGrid
          isLoading={isLoading}
          properties={data?.properties || []}
          type={type || "all"}
        />
      </div>
    </div>
  );
}

interface PropertiesGridProps {
  properties: IProperty[];
  isLoading: boolean;
  type: string;
}

export function PropertiesGrid({
  properties,
  isLoading,
  type,
}: PropertiesGridProps) {
  if (isLoading) return <Loader />;

  if (properties.length < 1 && type?.toLowerCase() === "all") {
    return (
      <div className="col-span-4 py-6">
        <p className="text-center">No properties found</p>
      </div>
    );
  }

  if (properties.length < 1 && type?.toLowerCase() !== "all") {
    return (
      <div className="col-span-4 py-6">
        <p className="text-center">
          No properties found for{" "}
          <span className="capitalize font-semibold">
            {getActualTypeFromParam(type)}
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {properties.map((property: IProperty) => {
        console.log({ property });

        return (
          <LandLordPropertyCard
            property={property}
            key={property._id}
            link={`/dashboard/landlord/properties/${property._id}`}
          />
        );
      })}
    </div>
  );
}
