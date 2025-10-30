import { Button } from "@/components/ui/button";
import type { IProperty } from "@/interfaces/property.interface";
import { formatCurrency, formatPrettyDate } from "@/lib/utils";
import { Bath, Bed, Calendar1, Sparkle, Timer } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router";
import BookingModal from "../tenant/_components/booking-modal";
import { useAuthStore } from "@/store/useAuthStore";

type PropertyDetailProps = {
  property: IProperty;
};

export default function PropertyOverview() {
  const { property }: PropertyDetailProps = useOutletContext();
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuthStore();

  const isLandlord = user && user?.roles?.includes("landlord") ? true : false;

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 text-start">
        {/* <h1>{property?.title}</h1> */}
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
          {/* <div className="my-2">
            <span className="flex items-center gap-1">
              <Calendar1 size={18} /> Booking duration {property?.availability}
            </span>
          </div> */}
        </div>

        <div className="bg-gray-50 border p-4 rounded w-full flex gap-4 flex-col justify-between">
          <div className="flex items-center gap-4">
            <p className="font-semibold text-xl">
              {/* Total: {formatCurrency(Number(property?.price) + 10000)} */}
              Total: {formatCurrency(Number(property?.price))} +{" "}
              {formatCurrency(10000)}
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
              onClick={openModal}
              className="w-fit px-6 btn-primary"
            >
              {property.requestedBy.includes(user?._id as string) ? (
                <span className="flex items-center gap-1">
                  <Timer className="" /> Pending
                </span>
              ) : (
                "Request to book"
              )}
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 border p-4 rounded w-full flex gap-4 flex-col justify-between">
          <h2 className="text-2xl font-medium">Reviews & Ratings</h2>
          <div className="flex gap-2 text-lg">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <Sparkle size={18} />
                </div>
              ))}
            </div>
            <p className=" border-r-2 pr-2 border-gray-600">(4.5)</p>
            <p>18 reviews</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <img
                className="w-6 h-6 rounded-full"
                src="https://github.com/shadcn.png"
                alt=""
              />
              <span className="text-lg">
                "This place is amazing" - Tolu, feb 2025
              </span>
            </div>
            <div className="flex items-center gap-2">
              <img
                className="w-6 h-6 rounded-full"
                src="https://github.com/shadcn.png"
                alt=""
              />
              <span className="text-lg">
                "This place is amazing" - Tolu, feb 2025
              </span>
            </div>
          </div>
          <Button className="w-fit px-6 bg-white text-black border cursor-pointer hover:bg-custom-primary hover:text-white">
            View 16 reviews
          </Button>
        </div>
      </div>
      <BookingModal
        isOpen={isOpen}
        closeModal={closeModal}
        setOpen={setIsOpen}
        property={property}
      />
    </div>
  );
}
