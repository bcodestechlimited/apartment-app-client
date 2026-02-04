/* eslint-disable @typescript-eslint/no-explicit-any */
import { propertyRatingService } from "@/api/property-rating.api";
import { propertyService } from "@/api/property.api";
import { Loader } from "@/components/custom/loader"; // Ensure you have this or use a simple div
import { formatDate, formatPrettyDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Sparkle, Star } from "lucide-react";
import { useParams } from "react-router";

export default function PropertyRatings() {
  const { propertyId } = useParams();

  // 1. Fetch Property Info (For Average Rating & Count)
  const { data: propertyData, isLoading: isLoadingProperty } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => propertyService.getProperty(propertyId!),
    enabled: !!propertyId,
  });

  const property = propertyData?.property;

  // 2. Fetch The Reviews List
  const { data: propertyRating, isLoading: isLoadingRatings } = useQuery({
    queryKey: ["property-ratings", propertyId],
    queryFn: () => propertyRatingService.getPropertyRatingById(propertyId!),
    enabled: !!propertyId,
  });

  // Optional: Handle loading gracefully inside the box
  if (isLoadingProperty || isLoadingRatings) {
    return (
      <div className="bg-gray-50 border p-4 rounded w-full flex justify-center">
        <Loader />
      </div>
    );
  }

  // If data isn't ready or property doesn't exist, you might want to return null
  if (!property) return null;

  return (
    <div className="bg-gray-50 border p-4 rounded w-full flex gap-4 flex-col justify-between">
      <h2 className="text-2xl font-medium">Reviews & Ratings</h2>

      {!isLoadingProperty && propertyRating && (
        <div className="flex gap-2 text-lg items-center">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={
                  star <= Math.round(property?.averageRating || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
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
              className={`flex items-start gap-2 ${
                propertyRating?.length > 1 && "border-b"
              }  border-gray-200 pb-2`}
            >
              <img
                className="w-14 h-14 rounded-full"
                src={rating?.tenantId?.avatar || ""}
                alt={rating?.tenantId?.firstName || "User"}
              />

              <div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={12}
                      className={
                        star <= rating.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                <p className="text-base italic text-gray-700">
                  {rating.comment}
                </p>

                <p className="text-sm text-gray-500">
                  {formatDate(rating.createdAt)} by {rating.tenantId?.firstName}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
