import type { IProperty } from "@/interfaces/property.interface";
import { formatCurrency } from "@/lib/utils";
import { Bath, Bed, Ellipsis, RockingChair } from "lucide-react";
import { Link } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import EditPropertyModal from "@/pages/dashboard/landlord/_components/edit-property-modal";
import MarkPropertyModal from "@/pages/dashboard/landlord/_components/mark-property-modal";
import DeletePropertyModal from "@/pages/dashboard/landlord/_components/delete-property-modal";

interface PropertyCardProps {
  property: IProperty;
  link?: string;
  label?: string;
  settings?: {
    platformFeePercentage: number;
  };
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const {
    title,
    type,
    totalFees,
    pictures,
    numberOfBedrooms,
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
          {typeof numberOfBedrooms === "number" && (
            <span>
              {numberOfBedrooms === 1
                ? "1 Bedroom"
                : `${numberOfBedrooms} Bedrooms`}
            </span>
          )}
        </span>
        <h3 className="font-semibold">{title}</h3>
        {/* <p className="text-gray-600">{type}</p> */}
        <p className="font-bold text-lg">
          {totalFees ? formatCurrency(totalFees) : ""}
        </p>

        <div className="flex gap-4 flex-wrap mt-2">
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
          <Ellipsis size={44} />
        </div>
      </div>
    </div>
  );
};

export const PublicPropertyCard = ({
  property,
  link,
  label,
  settings,
}: PropertyCardProps) => {
  const {
    title,
    description,
    type,
    totalFees,
    price,
    pictures,
    numberOfBedrooms,
    numberOfBathrooms,
    seatingCapacity,
    state,
    lga,
  } = property;

  if (!property) return null;

  const href = link || `/properties/${property._id}`;

  const grandTotal =
    totalFees + ((settings?.platformFeePercentage || 0) / 100) * price;

  return (
    <Link to={href} className="h-full block">
      <div className="relative bg-white rounded-lg overflow-hidden w-full border border-gray-200 h-full flex flex-col">
        <img src={pictures?.[0]} alt="" className="w-full h-48 object-cover" />

        <span className="bg-custom-primary text-white text-xs px-2 py-1 absolute top-4 left-0 capitalize rounded-r z-10">
          {label || type}
        </span>

        <div className="p-4 text-start flex flex-col flex-1 gap-1">
          <span>
            {Number(seatingCapacity) != 1 ? (
              <small className="text-gray-500">
                {Number(seatingCapacity) === 1
                  ? "1 Seating Capacity"
                  : `${seatingCapacity} Seating Capacity`}
              </small>
            ) : (
              <small className="text-gray-500">
                {Number(numberOfBedrooms) === 1
                  ? "1 Bedroom"
                  : `${numberOfBedrooms} Bedrooms`}
              </small>
            )}
          </span>

          <p className="font-medium text-xl line-clamp-1" title={title}>
            {title}
          </p>

          <p className="font-semibold text-sm line-clamp-2 text-gray-600">
            {description}
          </p>
          <p className="font-semibold text-sm line-clamp-2 text-gray-600">
            {state}, {lga}
          </p>

          <div className="mt-auto pt-2">
            <p className="font-bold text-lg">
              {totalFees ? formatCurrency(grandTotal) : ""}
            </p>

            <div className="flex gap-4 flex-wrap mt-2">
              {Number(seatingCapacity) != 1 ? (
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <RockingChair size={18} />
                  {seatingCapacity}
                </p>
              ) : (
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Bed size={18} />
                  {numberOfBedrooms}
                </p>
              )}
              {numberOfBathrooms ? (
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Bath size={18} />
                  {numberOfBathrooms}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const LandLordPropertyCard = ({
  property,
  link,
  settings,
}: PropertyCardProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [unavailableOpen, setUnavailableOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!property) return null;

  const {
    title,
    description,
    type,
    totalFees,
    price,
    pictures,
    numberOfBedrooms,
    numberOfBathrooms,
    seatingCapacity,
    state,
    lga,
    isAvailable,
  } = property;

  const grandTotal =
    totalFees + ((settings?.platformFeePercentage || 0) / 100) * price;

  const href = link || `/properties/${property._id}`;

  return (
    <>
      <Link to={href} className="h-full block">
        <div className="relative bg-white rounded-lg overflow-hidden w-full border border-gray-200 h-full flex flex-col">
          <img src={pictures[0]} alt="" className="w-full h-48 object-cover" />

          <span className="bg-custom-primary text-white text-xs px-2 py-1 absolute top-4 left-0 capitalize rounded-r z-10">
            {type}
          </span>
          <span className="absolute top-12 left-0">
            {isAvailable ? (
              <p className="font-medium text-sm line-clamp-2 bg-custom-primary text-white px-2 py-1 rounded-r w-fit">
                Available
              </p>
            ) : (
              <p className="font-medium text-sm line-clamp-2 bg-red-600 text-white px-2 py-1 rounded-r w-fit">
                Unavailable
              </p>
            )}
          </span>

          <div className="p-4 text-start flex flex-col flex-1 gap-1">
            <span>
              {Number(seatingCapacity) != 1 ? (
                <small className="text-gray-500">
                  {Number(seatingCapacity) === 1
                    ? "1 Seating Capacity"
                    : `${seatingCapacity} Seating Capacity`}
                </small>
              ) : (
                <small className="text-gray-500">
                  {Number(numberOfBedrooms) === 1
                    ? "1 Bedroom"
                    : `${numberOfBedrooms} Bedrooms`}
                </small>
              )}
            </span>

            <p className="font-medium text-xl line-clamp-1" title={title}>
              {title}
            </p>

            <p className="font-semibold text-sm line-clamp-2 text-gray-600">
              {description}
            </p>
            <p className="font-semibold text-sm line-clamp-2 text-gray-600">
              {state}, {lga}
            </p>

            <div className="mt-auto pt-2">
              <p className="font-bold text-lg">
                {totalFees ? formatCurrency(grandTotal) : "-"}
              </p>

              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-4 flex-wrap">
                  {Number(seatingCapacity) != 1 ? (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <RockingChair size={18} />
                      {seatingCapacity}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Bed size={18} />
                      {numberOfBedrooms}
                    </p>
                  )}
                  {numberOfBathrooms ? (
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Bath size={18} />
                      {numberOfBathrooms}
                    </p>
                  ) : null}
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-18">
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-100 font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditOpen(true);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-100 font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setUnavailableOpen(true);
                      }}
                    >
                      Mark as{" "}
                      {property.isAvailable ? "unavailable" : "available"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-500 cursor-pointer hover:bg-gray-100 font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteOpen(true);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <EditPropertyModal
        isOpen={editOpen}
        closeModal={() => setEditOpen(false)}
        property={property}
      />

      <MarkPropertyModal
        open={unavailableOpen}
        setOpen={setUnavailableOpen}
        closeModal={() => setUnavailableOpen(false)}
        property={property}
      />

      <DeletePropertyModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        closeModal={() => setDeleteOpen(false)}
        property={property}
      />
    </>
  );
};
