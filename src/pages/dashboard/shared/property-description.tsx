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
    <div className="text-start p-4">
      <h2 className="text-2xl font-medium">Description</h2>
      <p>{property?.description}</p>

      <div className="bg-gray-50 border p-4 rounded w-fit flex gap-34 items-center justify-between my-6">
        <p className="font-semibold text-2xl">
          {formatCurrency(property?.price)} {property?.pricingModel}
        </p>

        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <Bed size={32} />
            <p>{property?.numberOfBedrooms} bed</p>
          </div>
          <div className="flex flex-col items-center">
            <Bath size={32} />
            <p>{property?.numberOfBathrooms} bath en-suite</p>
          </div>
        </div>
      </div>
    </div>
  );
}
