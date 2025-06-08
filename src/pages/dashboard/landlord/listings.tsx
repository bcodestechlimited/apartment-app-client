import { propertyService } from "@/api/property.api";
import { PropertyCard } from "@/components/shared/propertyCard";
import { Button } from "@/components/ui/button";
import type { IProperty } from "@/interfaces/property.interface";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router";
import AddPropertyModal from "./_components/add-property-modal";

export default function Listings() {
  const [selected, setSelected] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["All", "Shared", "Serviced", "Standard", "Short let"];

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { data, isLoading } = useQuery({
    queryKey: ["landlord-properties", { page, limit }],
    queryFn: () =>
      propertyService.getLandLordProperties({
        page: 1,
        limit: 10,
      }),
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-custom-primary/10 w-fit rounded-full mb-4">
          <ul className="flex gap-8 items-center font-semibold text-xl">
            {categories.map((category) => (
              <li
                key={category}
                className={cn("cursor-pointer", {
                  "bg-custom-primary px-12 rounded-full py-2":
                    selected === category,
                })}
                onClick={() => setSelected(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <Button onClick={openModal} className="text-lg p-6 cursor-pointer">
          + Add new property
        </Button>
        <AddPropertyModal
          // propertyType="co-working space" // example value
          isOpen={isModalOpen}
          closeModal={closeModal}
        />
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.properties.map((property: IProperty) => {
              return <PropertyCard property={property} key={property._id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
