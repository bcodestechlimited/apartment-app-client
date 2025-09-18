import landlordBlurImage from "@/assets/images/landlord-blur.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function GetStarted() {
  return (
    <div className=" flex items-center">
      {/* Left Content */}
      <div className="w-1/2 p-10 text-start">
        <h2 className="text-2xl font-bold mb-6">Get Started with HavenLease</h2>

        <ol className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">
              1. Tell us about your property
            </h2>
            <p className="text-sm text-gray-600">
              Share some basic info, like where it is and how many guests can
              stay
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">2. Detailing is essential</h2>
            <p className="text-sm text-gray-600">
              Add 5 or more photos of your property plus a title and description
            </p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              3. Finish up & publish your listing
            </h2>
            <p className="text-sm text-gray-600">
              Choose a starting price, verify a few details, then publish your
              listing.
            </p>
          </div>
        </ol>

        <Link to="/onboarding/landlord/property-onboarding">
          <Button className="mt-8 bg-green-900 text-white py-2 px-6 rounded-md w-full cursor-pointer">
            Continue
          </Button>
        </Link>
      </div>

      <img
        src={landlordBlurImage}
        alt="Man holding house"
        className="w-1/2 h-full object-cover rounded-r-md"
      />
    </div>
  );
}
