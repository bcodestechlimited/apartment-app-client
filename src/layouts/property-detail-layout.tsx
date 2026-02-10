import { favouriteService } from "@/api/favourite.api";
import { propertyService } from "@/api/property.api";
import { Loader } from "@/components/custom/loader";
import type { IProperty } from "@/interfaces/property.interface";
import { useAuthStore } from "@/store/useAuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Heart, Maximize2 } from "lucide-react";
import { Link, Outlet, useParams, useLocation } from "react-router";
import { toast } from "sonner";
import { useShare } from "../hooks/useShare";
import { getUniversalPropertyUrl, cn } from "@/lib/utils";
import { useState } from "react";
import ImageLightbox from "@/components/custom/image-lightbox";
import { Spinner } from "@/components/ui/spinner";

function PropertyDetailLayout() {
  const [useShareModal, setUseShareModal] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setShowLightbox(true);
  };
  const { user } = useAuthStore();
  const { propertyId } = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { handleShare } = useShare();

  const canFavourite = user?.roles?.includes("tenant");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => propertyService.getProperty(propertyId!),
    enabled: !!propertyId,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    },
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

  const onShareClick = async () => {
    if (!propertyId || !data?.property) return;
    setUseShareModal(true);

    const universalUrl = getUniversalPropertyUrl(propertyId);

    await handleShare({
      title: data.property.title,
      text: `Check out ${data.property.title} on our platform!`,
      url: universalUrl,
    });

    setUseShareModal(false);
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="py-10 text-center">
        <p className="text-lg font-semibold">Failed to load property</p>
      </div>
    );

  if (!data)
    return (
      <div className="p-10 text-center">
        <p>Property not found</p>
        <Link to="/">Go Home</Link>
      </div>
    );

  const property = (data?.property as IProperty) || {};

  const isActive = (path: string) => {
    const currentPath = location.pathname.split("/").pop();
    if (
      path === "" &&
      (currentPath === propertyId || currentPath === "overview")
    )
      return true;
    return currentPath === path;
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="relative group px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-2 h-auto md:h-[400px] lg:h-[500px]">
          <div className="w-full md:w-1/2 relative h-62.5 sm:h-75 md:h-full">
            <img
              src={property?.pictures?.[0]}
              alt={property?.title}
              className="h-full w-full object-cover rounded-xl cursor-pointer"
              onClick={() => openLightbox(0)}
            />

            <button
              onClick={() => openLightbox(0)}
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer text-xs sm:text-sm md:text-base"
            >
              <Maximize2 size={16} />
              <span className="hidden sm:inline">View All Photos</span>
              <span className="sm:hidden">Photos</span>
            </button>
          </div>

          <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 w-1/2 h-full">
            {property?.pictures?.slice(1, 5)?.map((picture, idx) => (
              <img
                key={idx}
                className="w-full h-full object-cover rounded-xl cursor-pointer transition-opacity hover:opacity-90"
                src={picture}
                alt={`Property view ${idx + 1}`}
                onClick={() => openLightbox(idx + 1)}
              />
            ))}
          </div>
        </div>

        <ImageLightbox
          isOpen={showLightbox}
          onClose={() => setShowLightbox(false)}
          images={property?.pictures || []}
          initialIndex={activeImageIndex}
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 gap-4 border-b px-4 md:px-0">
        <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
          <div className="flex gap-2 sm:gap-4 font-semibold text-sm sm:text-base whitespace-nowrap">
            <Link
              className={cn(
                "border-b-2 py-2 px-2 sm:px-4 transition-colors",
                isActive("")
                  ? "border-primary text-primary"
                  : "border-transparent hover:border-gray-300",
              )}
              to=""
            >
              Overview
            </Link>
            <Link
              className={cn(
                "border-b-2 py-2 px-2 sm:px-4 transition-colors",
                isActive("description")
                  ? "border-primary text-primary"
                  : "border-transparent hover:border-gray-300",
              )}
              to="description"
            >
              Description
            </Link>
            <Link
              className={cn(
                "border-b-2 py-2 px-2 sm:px-4 transition-colors",
                isActive("amenities")
                  ? "border-primary text-primary"
                  : "border-transparent hover:border-gray-300",
              )}
              to="amenities"
            >
              Amenities
            </Link>
            <Link
              className={cn(
                "border-b-2 py-2 px-2 sm:px-4 transition-colors",
                isActive("location")
                  ? "border-primary text-primary"
                  : "border-transparent hover:border-gray-300",
              )}
              to="location"
            >
              Location
            </Link>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto justify-between md:justify-end items-center border-t md:border-t-0 pt-3 md:pt-0">
          <span
            className={cn(
              "items-center gap-2 cursor-pointer select-none",
              canFavourite ? "flex" : "hidden",
            )}
            onClick={toggleFavourite}
          >
            {isPropertySaved ? (
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            ) : (
              <Heart className="w-5 h-5" />
            )}
            <span className="md:hidden text-sm">Save</span>
          </span>

          <span
            className={cn(
              "flex items-center gap-2 cursor-pointer hover:text-primary transition-colors select-none",
              useShareModal && "opacity-60 pointer-events-none",
            )}
            onClick={() => onShareClick()}
          >
            {useShareModal ? (
              <>
                <Spinner className="w-4 h-4" />
                <span className="text-sm">Sharing...</span>
              </>
            ) : (
              <>
                <ExternalLink size={18} />
                <span className="text-sm sm:text-base">Share</span>
              </>
            )}
          </span>
        </div>
      </div>

      <div className="mt-6 px-4 md:px-0">
        <Outlet context={{ property }} />
      </div>
    </div>
  );
}

export default PropertyDetailLayout;
