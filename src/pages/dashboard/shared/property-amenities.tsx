import type { IProperty } from "@/interfaces/property.interface";
import { formatCurrency } from "@/lib/utils";
import { Bath, Bed, CircleCheck } from "lucide-react";
import { useOutletContext } from "react-router";

type PropertyDetailProps = {
  property: IProperty;
};

export default function PropertyAmenities() {
  const { property }: PropertyDetailProps = useOutletContext();

  console.log({ property });

  return (
    <div>
      <div className="text-start p-4">
        <h2 className="text-2xl font-medium">Features</h2>

        <div className="flex gap-4">
          <div className="bg-gray-50 border p-4 rounded-lg w-fit flex flex-col gap-8 items-start justify-between my-6">
            <p className="font-semibold text-xl">Unit Features</p>

            <div className="grid grid-cols-2 gap-4">
              {property?.amenities?.map((amenity) => (
                <div key={amenity} className="flex gap-2 items-center">
                  <CircleCheck size={24} />
                  <p className="">{amenity}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border p-4 rounded-lg w-fit flex flex-col gap-8 items-start justify-between my-6">
            <p className="font-semibold text-xl">Facilities</p>

            <div className="grid grid-cols-2 gap-4">
              {property?.facilities?.map((facility: string) => (
                <div key={facility} className="flex gap-2 items-center">
                  <CircleCheck size={24} />
                  <p className="">{facility}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
