import { authService } from "@/api/auth.api";
import { favouriteService } from "@/api/favourite.api";
import { propertyService } from "@/api/property.api";
import { Loader } from "@/components/custom/loader";
import type { IProperty } from "@/interfaces/property.interface";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Heart } from "lucide-react";
import { Link, Outlet, useParams } from "react-router";
import { toast } from "sonner";
import { useShare } from "../hooks/useShare";
import { getUniversalPropertyUrl } from "@/lib/utils";
function PropertyDetailLayout() {
  const { user } = useAuthStore();
  // console.log("property detail layout user", user);
  const { propertyId } = useParams();
  const queryClient = useQueryClient();
  const { handleShare } = useShare();

  const canFavourite = user?.roles?.includes("tenant");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => propertyService.getProperty(propertyId!),
    retry: !!propertyId,
  });

  const isPropertySaved = user?.savedProperties?.includes(propertyId!);

  const saveFavouriteMutation = useMutation({
    mutationFn: (propertyId: string) =>
      favouriteService.createFavourite(propertyId),
    onSuccess: () => {
      toast.success("Property added to favourites");
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
  });

  const removeFavouriteMutation = useMutation({
    mutationFn: (propertyId: string) =>
      favouriteService.deleteFavourite(propertyId),
    onSuccess: () => {
      toast.success("Property removed from favourites");
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
  });

  const toggleFavourite = () => {
    if (!user) return toast.error("You must be logged in");
    if (isPropertySaved) {
      removeFavouriteMutation.mutate(propertyId!);
    } else {
      saveFavouriteMutation.mutate(propertyId!);
    }
  };

  const onShareClick = () => {
    if (!propertyId) return;

    const universalUrl = getUniversalPropertyUrl(propertyId);

    handleShare({
      title: property.title,
      text: `Check out ${property.title} on our platform!`,
      url: universalUrl,
    });
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Something went wrong</div>;
  if (!data)
    return (
      <div>
        <p>Property not found</p>
        <Link to="/">Go Home</Link>
      </div>
    );

  const property = (data?.property as IProperty) || {};

  return (
    <div>
      <div className="flex gap-2 h-[400px]">
        <div className="w-1/2">
          <img
            src={property?.pictures?.[0]}
            alt=""
            className="h-full w-full object-cover rounded"
          />
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-2 w-1/2 h-full">
          {property?.pictures?.slice(1, 5)?.map((picture, idx) => (
            <img
              key={idx}
              className="w-full h-full object-cover rounded"
              src={picture}
              alt={`Image ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between py-4">
        <div className="w-3/4 flex gap-4 justify-start font-semibold border-b max-w-fit">
          <Link className="border-b-2 py-2 px-4" to="">
            Overview
          </Link>
          <Link className="border-b-2 py-2 px-4" to="description">
            Description
          </Link>
          <Link className="border-b-2 py-2 px-4" to="amenities">
            Amenities
          </Link>
          <Link className="border-b-2 py-2 px-4" to="location">
            Location
          </Link>
        </div>

        <div className="flex gap-2 w-1/4 justify-end">
          <span
            className={`flex items-center gap-1 ${
              canFavourite ? "cursor-pointer" : "hidden"
            }`}
            onClick={toggleFavourite}
          >
            {isPropertySaved ? <Heart color="red" fill="red" /> : <Heart />}
          </span>
          <span
            className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors"
            onClick={() => onShareClick()}
          >
            <ExternalLink size={18} /> Share
          </span>
        </div>
      </div>

      <Outlet context={{ property }} />
    </div>
  );
}

export default PropertyDetailLayout;
