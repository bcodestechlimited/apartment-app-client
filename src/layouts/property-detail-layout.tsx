import { propertyService } from "@/api/property.api";
import { Loader } from "@/components/custom/loader";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Heart } from "lucide-react";
import { Link, Outlet, useParams } from "react-router";

function PropertyDetailLayout() {
  const { propertyId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => propertyService.getProperty(propertyId!),
    retry: !!propertyId,
  });

  const propertyDetailLinks = [
    {
      name: "Overview",
      href: ``,
    },
    {
      name: "Description",
      href: `description`,
    },
    {
      name: "Details",
      href: `details`,
    },
    {
      name: "Amenities",
      href: `amenities`,
    },
    {
      name: "Location",
      href: `location`,
    },
  ];

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex gap-2 h-[400px]">
        <div className="w-1/2">
          <img
            src={data?.pictures[0]}
            alt=""
            className="h-full w-full object-cover rounded"
          />
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-2 w-1/2 h-full">
          {data?.pictures.slice(1, 5).map((picture: string, index: number) => (
            <img
              key={index}
              className="w-full h-full object-cover rounded"
              src={picture}
              alt={`Image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-between py-4">
        <div className="w-3/4 flex gap-4 justify-start font-semibold border-b max-w-fit">
          {propertyDetailLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="border-b-2 border-red-40 py-2 px-4"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex gap-2 w-1/4 justify-end">
          <span className="flex items-center gap-1">
            <Heart /> Save
          </span>
          <span className="flex items-center gap-1">
            <ExternalLink /> Share
          </span>
        </div>
      </div>
      <div>
        <Outlet context={{ property: data }} />
      </div>
    </div>
  );
}

export default PropertyDetailLayout;
