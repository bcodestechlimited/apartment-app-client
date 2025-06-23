import type { IProperty } from "@/interfaces/property.interface";
import { formatCurrency } from "@/lib/utils";
import { Bath, Bed, Ellipsis } from "lucide-react";
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
          <Ellipsis size={44} />
        </div>
      </div>
    </div>
  );
};

export const PublicPropertyCard = ({ property, link }: PropertyCardProps) => {
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

  if (!property) return null;

  const href = link || `/property/${property._id}`;

  return (
    <Link to={href}>
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

        <div className="p-4 text-start flex flex-col gap-1">
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
    </Link>
  );
};

export const LandLordPropertyCard = ({ property, link }: PropertyCardProps) => {
  if (!property) return null;

  const {
    title,
    description,
    type,
    price,
    pictures,
    numberOfBedRooms,
    numberOfBathrooms,
    // isVerified,
  } = property;

  console.log({ property });

  const href = link || `/property/${property._id}`;

  const [editOpen, setEditOpen] = useState(false);
  const [unavailableOpen, setUnavailableOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      {/* <Link to={isVerified ? href : undefined}> */}
      <Link to={href}>
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

            <div className="flex items-center justify-between">
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
                    Mark as {property.isAvailable ? "unavailable" : "available"}
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
