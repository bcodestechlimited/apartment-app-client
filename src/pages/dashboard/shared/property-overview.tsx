/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import type { IProperty } from "@/interfaces/property.interface";
import { formatCurrency, formatPrettyDate } from "@/lib/utils";
import { Bath, Bed, Calendar1, Sparkle, Timer } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router";
import BookingModal from "../tenant/_components/booking-modal";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { propertyRatingService } from "@/api/property-rating.api";

type PropertyDetailProps = {
  property: IProperty;
};

export default function PropertyOverview() {
  const { property }: PropertyDetailProps = useOutletContext();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuthStore();
  const isLandlord = user?.roles?.includes("landlord");

  const { data: propertyRating, isLoading: isLoadingPropertyRating } = useQuery(
    {
      queryKey: ["tenant-bookings"],
      queryFn: () => propertyRatingService.getPropertyRatingById(property?._id),
    }
  );

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 text-start">
        <p className="text-xl font-semibold">{property?.description}</p>
        <p>Address: {property?.address}</p>

        <Button className="w-fit capitalize my-2">
          {property?.type.replace("-", " ")}
        </Button>

        <div className="bg-gray-50 border p-4 rounded w-fit flex gap-34 items-center justify-between">
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
          <div className="flex items-center gap-4">
            <p className="font-semibold text-xl">
              Total: {formatCurrency(property?.price)} + {formatCurrency(10000)}
            </p>
            <span className="font-semibold bg-green-100 px-2 py-1 rounded text-custom-primary">
              Service charge
            </span>
          </div>

          <div>
            <Button
              disabled={
                isLandlord || property.requestedBy.includes(user?._id as string)
              }
              onClick={() => setIsOpen(true)}
              className="w-fit px-6 btn-primary"
            >
              {property.requestedBy.includes(user?._id as string) ? (
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
        <div className="bg-gray-50 border p-4 rounded w-full flex gap-4 flex-col justify-between">
          <h2 className="text-2xl font-medium">Reviews & Ratings</h2>

          {!isLoadingPropertyRating && propertyRating && (
            <div className="flex gap-2 text-lg items-center">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Sparkle
                    key={star}
                    size={18}
                    className={
                      star <= Math.round(property?.averageRating)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }
                  />
                ))}
              </div>

              <p className="border-r-2 pr-2 border-gray-600">
                ({property?.averageRating?.toFixed(1)})
              </p>
              <p>{property?.totalRatings} reviews</p>
            </div>
          )}

          <div className="flex flex-col gap-3">
            {propertyRating?.length > 0 ? (
              propertyRating.map((rating: any) => (
                <div
                  key={rating._id}
                  className="flex items-start gap-2 border-b border-gray-200 pb-2"
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={rating?.tenantId?.avatar}
                    alt={rating?.tenantId?.firstName || "User"}
                  />

                  <div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Sparkle
                          key={star}
                          size={16}
                          className={
                            star <= rating.rating
                              ? "text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    <p className="text-base italic text-gray-700">
                      "{rating.comment}"
                    </p>

                    <p className="text-sm text-gray-500">
                      {rating.tenantId?.firstName},
                      {new Date(rating.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No reviews yet.</p>
            )}
          </div>
        </div>
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
