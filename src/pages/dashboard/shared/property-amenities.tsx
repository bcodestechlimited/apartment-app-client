import type { IProperty } from "@/interfaces/property.interface";
import { CircleCheck } from "lucide-react";
import { useOutletContext } from "react-router";

type PropertyDetailProps = {
  property: IProperty;
};

export default function PropertyAmenities() {
  const { property }: PropertyDetailProps = useOutletContext();

  return (
    <div className="w-full">
      <div className="text-start p-1 md:p-2">
        <h2 className="text-2xl font-medium">Features</h2>

        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* Unit Features Box */}
          <div className="bg-gray-50 border p-4 md:p-6 rounded-lg w-full lg:w-1/2 flex flex-col gap-6 my-4 md:my-6">
            <p className="font-semibold text-xl">Unit Features</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property?.amenities?.map((amenity) => (
                <div key={amenity} className="flex gap-2 items-start">
                  <CircleCheck
                    size={20}
                    className="text-custom-primary mt-1 shrink-0"
                  />
                  <p className="text-gray-700">{amenity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Facilities Box */}
          <div className="bg-gray-50 border p-4 md:p-6 rounded-lg w-full lg:w-1/2 flex flex-col gap-6 my-4 md:my-6">
            <p className="font-semibold text-xl">Facilities</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {property?.facilities?.map((facility: string) => (
                <div key={facility} className="flex gap-2 items-start">
                  <CircleCheck
                    size={20}
                    className="text-custom-primary mt-1 shrink-0"
                  />
                  <p className="text-gray-700">{facility}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
