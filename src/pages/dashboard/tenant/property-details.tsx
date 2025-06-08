import { Link, useParams } from "react-router";
import { propertyService } from "@/api/property.api";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function PropertyDetails() {
  const { propertyId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => propertyService.getProperty(propertyId!),
    retry: !!propertyId,
  });


  

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {data?.pictures.map((picture: string, index: number) => (
          <img
            className={cn("w-full h-full row-span-1 max-h-96", {
              "row-span-2": index === 0,
              //   "row-span-1": index !== 0,
            })}
            src={picture}
            alt=""
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 text-start">
        <h1>{data?.title}</h1>
        <p>{data?.description}</p>
        <p>
          Price: {data?.price} per {data?.pricingModel}
        </p>
        <p>Address: {data?.address}</p>
        <p>Number of rooms: {data?.numberOfRooms}</p>
        <p>Amenities: {data?.amenities}</p>
        <Button className="w-fit px-6">Request to book</Button>

        {/* <Button className="w-fit px-6">
          <Link to={`/dashboard/property/${propertyId}/pay`}>
            Request to book
          </Link>
        </Button> */}
      </div>
    </div>
  );
}
