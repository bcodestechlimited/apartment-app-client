import type { IProperty } from "@/interfaces/property.interface";
import { formatCurrency } from "@/lib/utils";
import { Bath, Bed } from "lucide-react";
import { Link } from "react-router";

interface PropertyCardProps {
  property: IProperty;
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const {
    title,
    type,
    price,
    pictures,
    numberOfBedRooms,
    numberOfBathrooms,
    isVerified,
  } = property;

  return (
    <div className="relative bg-white rounded-lg overflow-hidden w-full border border-gray-200">
      <img src={pictures[0]} alt="" className="w-full h-48 object-cover" />
      <span className="bg-custom-primary text-white text-xs px-2 py-1 absolute top-4 left-0 capitalize rounded-r z-10">
        {type}
      </span>

      {/* Overlay if not verified */}
      {!isVerified && (
        <div className="absolute inset-0 bg-dark/70 backdrop-blur-xs flex items-center justify-center z-10">
          <p className="text-center text-gray-100 font-medium text-sm">
            Property verification is in progress
          </p>
        </div>
      )}

      <div className="p-4 text-start">
        <span>
          {typeof numberOfBedRooms === "number" && (
            <span>
              {numberOfBedRooms === 1
                ? "1 Bedroom"
                : `${numberOfBedRooms} Bedrooms`}
            </span>
          )}
        </span>
        <h3 className="font-semibold">{title}</h3>
        {/* <p className="text-gray-600">{type}</p> */}
        <p className="font-bold text-lg">
          {price ? formatCurrency(price) : ""}
        </p>

        <div className="flex gap-4 flex-wrap mt-2">
          {numberOfBedRooms ? (
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Bed size={18} />
              {numberOfBedRooms}
            </p>
          ) : null}

          {numberOfBathrooms ? (
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <Bath size={18} />
              {numberOfBathrooms}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const PublicPropertyCard = ({ property }: PropertyCardProps) => {
  const {
    title,
    description,
    type,
    price,
    pictures,
    numberOfBedRooms,
    numberOfBathrooms,
  } = property;

  console.log({ property });

  return (
    <Link to={`/dashboard/property/${property._id}`}>
      <div className="relative bg-white rounded-lg overflow-hidden w-full border border-gray-200">
        <img src={pictures[0]} alt="" className="w-full h-48 object-cover" />
        <span className="bg-custom-primary text-white text-xs px-2 py-1 absolute top-4 left-0 capitalize rounded-r z-10">
          {type}
        </span>

        {/* Overlay if not verified */}
        {/* {!isVerified && (
        <div className="absolute inset-0 bg-dark/70 backdrop-blur-xs flex items-center justify-center z-10">
          <p className="text-center text-gray-100 font-medium text-sm">
            Property verification is in progress
          </p>
        </div>
      )} */}

        <div className="p-4 text-start">
          <span>
            <small className="text-gray-500">
              {Number(numberOfBedRooms) === 1
                ? "1 Bedroom"
                : `${numberOfBedRooms} Bedrooms`}
            </small>
          </span>
          <p className="font-medium">{title}</p>
          <p className="font-semibold">{description}</p>

          <p className="font-bold text-lg">
            {price ? formatCurrency(price) : ""}
          </p>

          <div className="flex gap-4 flex-wrap mt-2">
            {numberOfBedRooms ? (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Bed size={16} />
                <span>{numberOfBedRooms}</span>
              </p>
            ) : null}

            {numberOfBathrooms ? (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Bath size={18} />
                <span>{numberOfBathrooms}</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};
