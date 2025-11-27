// import { authService } from "@/api/auth.api";
// import { favouriteService } from "@/api/favourite.api";
// import { propertyService } from "@/api/property.api";
// import { Loader } from "@/components/custom/loader";
// import type { IProperty } from "@/interfaces/property.interface";
// import { useAuthStore } from "@/store/useAuthStore";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { ExternalLink, Heart } from "lucide-react";
// import { Link, Outlet, useParams } from "react-router";
// import { toast } from "sonner";

// function PropertyDetailLayout() {
//   const { user } = useAuthStore();
//   console.log("property detail layout user", user);
//   const { propertyId } = useParams();

//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["property", propertyId],
//     queryFn: () => propertyService.getProperty(propertyId!),
//     retry: !!propertyId,
//   });

//   const saveFavouriteMutation = useMutation({
//     mutationFn: (propertyId: string) =>
//       favouriteService.createFavourite(propertyId),
//     onSuccess: (res: any) => {
//       toast.success("Property saved to favourites");
//     },
//     onError: (error: any) =>
//       toast.error(error?.message || "Failed to save property"),
//   });

//   const isPropertySaved = user?.savedProperties?.some(
//     (savedProperty: string) => savedProperty === propertyId
//   );
//   const propertyDetailLinks = [
//     {
//       name: "Overview",
//       href: ``,
//     },
//     {
//       name: "Description",
//       href: `description`,
//     },
//     // {
//     //   name: "Details",
//     //   href: `details`,
//     // },
//     {
//       name: "Amenities",
//       href: `amenities`,
//     },
//     {
//       name: "Location",
//       href: `location`,
//     },
//   ];

//   if (isLoading) return <Loader />;

//   if (isError) return <div>Something went wrong</div>;

//   if (!data)
//     return (
//       <div>
//         <p>Property not found</p>
//         <Link to="/">Go back to home</Link>
//       </div>
//     );

//   console.log({ data });

//   const property = (data?.property as IProperty) || {};

//   return (
//     <div>
//       <div className="flex gap-2 h-[400px]">
//         <div className="w-1/2">
//           <img
//             src={property ? property?.pictures[0] : ""}
//             alt=""
//             className="h-full w-full object-cover rounded"
//           />
//         </div>

//         <div className="grid grid-cols-2 grid-rows-2 gap-2 w-1/2 h-full">
//           {property?.pictures
//             ?.slice(1, 5)
//             .map((picture: string, index: number) => (
//               <img
//                 key={index}
//                 className="w-full h-full object-cover rounded"
//                 src={picture}
//                 alt={`Image ${index + 1}`}
//               />
//             ))}
//         </div>
//       </div>

//       <div className="flex justify-between py-4">
//         <div className="w-3/4 flex gap-4 justify-start font-semibold border-b max-w-fit">
//           {propertyDetailLinks?.map((link) => (
//             <Link
//               key={link.name}
//               to={link.href}
//               className="border-b-2 border-red-40 py-2 px-4"
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>
//         <div className="flex gap-2 w-1/4 justify-end">
//           <span
//             className="flex items-center gap-1"
//             onClick={() => saveFavouriteMutation.mutate(property._id!)}
//           >
//             {/* <Heart /> Save */}
//             {isPropertySaved ? <Heart color="red" /> : <Heart />}
//           </span>
//           <span className="flex items-center gap-1">
//             <ExternalLink /> Share
//           </span>
//         </div>
//       </div>
//       <div>
//         <Outlet context={{ property: property }} />
//       </div>
//     </div>
//   );
// }

// export default PropertyDetailLayout;

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

function PropertyDetailLayout() {
  const { user } = useAuthStore();
  const { propertyId } = useParams();
  const queryClient = useQueryClient();

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
          {property?.pictures?.slice(1, 5).map((picture, idx) => (
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
            className="flex items-center gap-1 cursor-pointer"
            onClick={toggleFavourite}
          >
            {isPropertySaved ? <Heart color="red" /> : <Heart />}
          </span>
          <span className="flex items-center gap-1">
            <ExternalLink /> Share
          </span>
        </div>
      </div>

      <Outlet context={{ property }} />
    </div>
  );
}

export default PropertyDetailLayout;
