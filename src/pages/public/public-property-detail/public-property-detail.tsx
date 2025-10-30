import { propertyService } from "@/api/property.api";
import { Loader } from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import type { IProperty } from "@/interfaces/property.interface";
import { formatDate } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import {
  Bath,
  Calendar,
  Calendar1,
  ExternalLink,
  Heart,
  Home,
  LocateIcon,
  LucideShare2,
  Share,
  Share2,
  Utensils,
  Wifi,
  Wind,
} from "lucide-react";
import { useState, type JSX } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ConfirmBooking from "./_modals/confirm-booking";
import { toast } from "sonner";

const getAmenityIcon = (amenity: string) => {
  const icons: Record<string, JSX.Element> = {
    "air-conditioner": <Wind size={20} color="#555" />,
    kitchen: <Utensils size={20} color="#555" />,
    "wi-fi": <Wifi size={20} color="#555" />,
    "private-bath": <Bath size={20} color="#555" />,
  };

  // default icon if not found
  return icons[amenity.toLowerCase()] || <Home size={20} color="#555" />;
};

export default function PublicPropertyDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUserAgreed, setHasUserAgreed] = useState(false);
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuthStore();

  const isLandlord = user && user?.roles?.includes("landlord") ? true : false;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["property", propertyId],
    queryFn: () => propertyService.getProperty(propertyId!),
    retry: !!propertyId,
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleBooking = () => {
    if (!user) {
      toast.error("Please sign in to book a property");
      navigate("/auth/sign-in");
      return;
    }

    openModal();
  };

  if (isLoading) return <Loader />;

  if (isError) return <div>Something went wrong</div>;

  if (!data)
    return (
      <div>
        <p>Property not found</p>
        <Link to="/">Go back to home</Link>
      </div>
    );

  const property = (data?.property as IProperty) || {};

  console.log(property);

  return (
    <div className="max-w-custom py-4">
      <div className="flex gap-2 h-[400px]">
        <div className="w-1/2">
          <img
            src={property?.pictures[0]}
            alt=""
            className="h-full w-full object-cover rounded"
          />
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-2 w-1/2 h-full">
          {property?.pictures
            .slice(1, 5)
            .map((picture: string, index: number) => (
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
        <div className="flex items-center gap-2">
          <Button>Shared Apartment</Button>
          <Button>Rent</Button>
        </div>
        <div className="flex gap-2 w-1/4 justify-end">
          <span className="flex items-center gap-1">
            <Heart /> Save
          </span>
          <span className="flex items-center gap-1">
            <LucideShare2 /> Share
          </span>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-5">
        <div className="col-span-3 flex flex-col gap-4">
          <div className="text-start">
            <p className="text-xl font-medium">{property.title}</p>
            <p className="text-lg text-muted-foreground">{property.address}</p>

            <div>
              <span>{property?.numberOfBedrooms} bed(s)</span> | <span></span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xl font-medium text-start">
              Availability & Booking
            </p>
            <div className="flex items-center gap-1">
              <Calendar1 />
              <p>Available From:</p>
              <p>{formatDate(property?.availabilityDate)}</p>
            </div>
            <div className="flex items-center gap-1">
              <LocateIcon />
              <p>Location:</p>
              <p>{property?.address}</p>
            </div>
          </div>

          <Separator />
          <div className="text-start">
            <p className="font-medium text-lg">Description</p>
            <p>{property.description}</p>
          </div>

          <Separator />
          <div className="text-start">
            <p className="font-medium text-lg">Amenities</p>
            <div className="grid grid-cols-2 w-fit gap-x-8 gap-y-2">
              {property.amenities.map((amenity: string) => (
                <div className="flex items-center gap-2">
                  {getAmenityIcon(amenity.toLowerCase())}
                  <p key={amenity} className="text-muted-foreground">
                    {amenity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= */}

        <div className=" flex flex-col gap-4 shadow-xl rounded-2xl text-start p-4 col-span-2">
          <p>Price</p>
          <p>185,000 per month</p>

          <Separator />

          <div className="flex flex-col gap-2">
            <p>Booking Duration</p>

            <Select>
              <SelectTrigger className="w-full rounded-full">
                <SelectValue placeholder="-select-" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">Rent</p>
              <p>{property.price}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Service Charge</p>
              <p>{10000}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Caution fee (Refundable)</p>
              <p>{10000}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Legal</p>
              <p>{property.price}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">Agent Fee</p>
              <p>{property.price}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium">VAT</p>
              <p>{property.price}</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <p className="font-medium">Total</p>
            <p>{property.price}</p>
          </div>

          <div className="flex items-center gap-2 my-2 px-2 ">
            <Checkbox
              id="terms"
              className="w-4 h-4"
              checked={hasUserAgreed}
              onCheckedChange={() => {
                setHasUserAgreed(!hasUserAgreed);
              }}
            />
            <p className="text-sm text-start">
              By continuing, i agree to the{" "}
              <Link to="#" className="text-custom-primary hover:underline">
                Terms & Conditions
              </Link>
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={() => handleBooking()}
              disabled={isLandlord || !hasUserAgreed}
              className="btn-primary w-full rounded-full"
            >
              Book Now
            </Button>
            <Button className="w-full rounded-full">Book an Inspection</Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 py-6">
        <div className="text-start">
          <p className="text-xl font-medium">Location</p>
          <p>Coming Soon</p>
        </div>

        <Separator />

        <div className="text-start">
          <p className="text-xl font-medium">Reviews</p>
          <p>Coming Soon</p>
        </div>

        <Separator />

        <div className="text-start">
          <p className="text-xl font-medium">Other apartments you may like</p>
          <p>Coming Soon</p>
        </div>
      </div>

      <ConfirmBooking
        isOpen={isOpen}
        closeModal={closeModal}
        setOpen={setIsOpen}
        property={property}
      />
    </div>
  );
}
