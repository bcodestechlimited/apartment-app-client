import type { IProperty } from "@/interfaces/property.interface";
import { formatCurrency } from "@/lib/utils";
import { Bath, Bed } from "lucide-react";
import { useOutletContext } from "react-router";

type PropertyDetailProps = {
  property: IProperty;
};

export default function PropertyDescription() {
  const { property }: PropertyDetailProps = useOutletContext();

  return (
    <div className="text-start p-1 md:p-2">
      <h2 className="text-2xl font-medium">Description</h2>
      <p className="mt-2 text-gray-700 leading-relaxed">
        {property?.description}
      </p>

      <div className="bg-gray-50 border p-4 md:p-6 rounded-lg w-full md:w-fit flex flex-wrap gap-6 md:gap-20 items-center justify-between my-6">
        <p className="font-semibold text-xl md:text-2xl whitespace-nowrap">
          {formatCurrency(property?.price)} {property?.pricingModel}
        </p>

        <div className="flex gap-6 md:gap-8">
          <div className="flex flex-col items-center">
            <Bed size={32} className="text-gray-700" />
            <p className="text-sm md:text-base whitespace-nowrap">
              {property?.numberOfBedrooms} bed
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Bath size={32} className="text-gray-700" />
            <p className="text-sm md:text-base whitespace-nowrap">
              {property?.numberOfBathrooms} bath en-suite
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
