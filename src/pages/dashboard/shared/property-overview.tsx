import { Button } from "@/components/ui/button";
import type { IProperty } from "@/interfaces/property.interface";
import { formatCurrency, formatPrettyDate } from "@/lib/utils";
import { Bath, Bed, Calendar1, RockingChair, Timer } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router";
import BookingModal from "../tenant/_components/booking-modal";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { propertyRatingService } from "@/api/property-rating.api";
import PropertyRatings from "@/components/shared/PropertyRating";
import { systemSettingsService } from "@/api/admin/system-settings.api";

type PropertyDetailProps = {
  property: IProperty;
};

export default function PropertyOverview() {
  const { property }: PropertyDetailProps = useOutletContext();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuthStore();
  const isLandlord = user?.roles?.includes("landlord");

  const { data } = useQuery({
    queryKey: ["system-settings"],
    queryFn: () => systemSettingsService.getSettings(),
  });

  const platformFee =
    ((data?.platformFeePercentage || 5) / 100) * (property?.price || 0);
  const grandTotal = (property?.totalFees || 0) + platformFee;

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 text-start">
        <p className="text-xl font-semibold flex gap-5  items-center">
          {property?.description}{" "}
          {property?.isAvailable ? (
            <p className="font-medium text-sm line-clamp-2 bg-custom-primary text-white px-1  rounded-sm w-fit">
              Available
            </p>
          ) : (
            <p className="font-medium text-sm line-clamp-2 bg-red-600 text-white px-2 py-1 rounded-r w-fit">
              Unavailable
            </p>
          )}
        </p>
        <p>Address: {property?.address}</p>
        <p className="font-semibold text-sm line-clamp-2 text-gray-600 flex gap-3">
          {property?.state}, {property?.lga} lga{" "}
        </p>

        <Button className="w-fit capitalize my-2">
          {property?.type.replace("-", " ")}
        </Button>

        <div className="bg-gray-50 border p-4 rounded w-fit flex gap-10 sm:gap-34 items-center justify-between">
          <p className="font-semibold text-2xl">
            {formatCurrency(property?.price)} {property?.pricingModel}
          </p>

          <div className="flex gap-8">
            {property && Number(property?.seatingCapacity) > 1 ? (
              <div className="flex flex-col items-center">
                <RockingChair size={32} />
                <p>{property?.seatingCapacity} seat</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Bed size={32} />
                <p>{property?.numberOfBedrooms} bed</p>
              </div>
            )}

            <div className="flex flex-col items-center">
              <Bath size={32} />
              {/* 2. Conditionally show Ensuite */}
              <p>
                {property?.numberOfBathrooms} bath
                {property?.isEnsuite && (
                  <span className="text-green-600 font-medium text-xs ml-1">
                    (Ensuite)
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="my-4">
          <h2 className="text-2xl font-medium">Availability & Booking</h2>

          <div className="my-2">
            <span className="flex items-center gap-1">
              <Calendar1 size={18} /> Available from:{" "}
              {formatPrettyDate(property?.availabilityDate ?? "")}
            </span>
          </div>
        </div>

        <div className="bg-gray-50 border p-4 rounded w-full flex gap-4 flex-col justify-between">
          {/* 3. Breakdown of Rent + Fees */}
          <div className="flex flex-col gap-2 w-full max-w-md">
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Base Rent:</span>
              <span>{formatCurrency(property?.price)}</span>
            </div>

            {/* List Other Fees Dynamically */}
            {property?.otherFees?.map((fee, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-sm text-gray-600  pb-1"
              >
                <span className="capitalize">{fee.name}:</span>
                <span>{formatCurrency(fee.amount)}</span>
              </div>
            ))}

            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>Platform Fee:</span>
              <span>{formatCurrency(platformFee)}</span>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-300">
              <p className="font-semibold text-xl">
                Total: {formatCurrency(grandTotal)}
              </p>
              {/* Optional: Badge indicating extra fees exist */}
              {property?.otherFees?.length > 0 && (
                <span className="font-semibold bg-green-100 px-2 py-1 rounded text-xs text-custom-primary">
                  Includes fees
                </span>
              )}
            </div>
          </div>

          <div>
            <Button
              disabled={
                isLandlord ||
                property.requestedBy?.includes(user?._id as string) ||
                !property.isAvailable
              }
              onClick={() => setIsOpen(true)}
              className={`w-fit px-6 btn-primary `}
            >
              {property.requestedBy?.includes(user?._id as string) ? (
                <span className="flex items-center gap-1">
                  <Timer /> Pending
                </span>
              ) : (
                "Request to book"
              )}
            </Button>
          </div>
        </div>

        {/* Reviews */}
        <PropertyRatings />
      </div>

      <BookingModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        setOpen={setIsOpen}
        property={property}
      />
    </div>
  );
}
