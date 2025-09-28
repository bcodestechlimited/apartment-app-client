import { Button } from "@/components/ui/button";
import type { IProperty } from "@/interfaces/property.interface";
import { cn, formatCurrency } from "@/lib/utils";
import { Bath, Bed, Ellipsis, Eye } from "lucide-react";
import { Link } from "react-router";

interface PropertyCardProps {
  property: IProperty;
  link: string;
  label?: string;
}

export const AdminPropertyCard = ({ property, link }: PropertyCardProps) => {
  const {
    title,
    type,
    price,
    pictures,
    numberOfBedrooms,
    numberOfBathrooms,
    isVerified,
  } = property;

  return (
    <div
      className={cn(
        `relative bg-white rounded-lg overflow-hidden w-full border border-gray-200 flex flex-col` // <-- flex column layout
        // {
        //   "border-yellow-500": !isVerified,
        //   "border-green-500": isVerified,
        // }
      )}
    >
      {/* Image */}
      <div className="relative">
        <img
          src={pictures[0]}
          alt={title}
          className="w-full h-48 object-cover"
        />

        {/* Type Badge (Top-Left) */}
        <span className="bg-custom-primary text-white text-xs px-2 py-1 absolute top-4 left-0 capitalize rounded-r z-10">
          {type}
        </span>

        {/* Verification Badge (Top-Right) */}
        <span
          className={cn(
            "absolute top-4 right-0 text-xs px-2 py-1 rounded-l font-medium z-10",
            isVerified ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
          )}
        >
          {isVerified ? <span>Verified</span> : "Pending"}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 text-start flex-1 flex flex-col gap-1">
        <span>
          {typeof numberOfBedrooms === "number" && (
            <span>
              {numberOfBedrooms === 1
                ? "1 Bedroom"
                : `${numberOfBedrooms} Bedrooms`}
            </span>
          )}
        </span>

        <h3 className="font-semibold mt-1">{title}</h3>

        <p className="font-bold text-lg">
          {price ? formatCurrency(price) : ""}
        </p>

        <div className="flex justify-between flex-wrap mt-2">
          <div className="flex gap-4">
            {numberOfBedrooms ? (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Bed size={18} />
                {numberOfBedrooms}
              </p>
            ) : null}
            {numberOfBathrooms ? (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Bath size={18} />
                {numberOfBathrooms}
              </p>
            ) : null}
          </div>
          <Button
            asChild
            className="px-4 border-2 bg-custom-primary text-white hover:bg-white hover:border-custom-primary hover:text-custom-primary cursor-pointer"
          >
            <Link to={link}>View</Link>
          </Button>
        </div>
      </div>

      {/* Footer pinned to bottom */}
      {/* <div className="mt-auto px-4 pb-4">
        {!isVerified && (
          <p className="text-red-500 text-sm text-start">
            Property needs verification
          </p>
        )}
      </div> */}
    </div>
  );
};
