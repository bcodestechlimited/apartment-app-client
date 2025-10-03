import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import {
  Loader,
  MapPin,
  Bed,
  Bath,
  ArrowLeft,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { adminPropertyService } from "@/api/admin/admin-property.api";
import { Badge } from "@/components/ui/badge";
import { propertyService } from "@/api/property.api";
import { useState } from "react";
import { CustomAlert } from "@/components/custom/custom-alert";

export default function AdminPropertyDetail() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: property, isLoading } = useQuery({
    queryKey: ["admin-property", propertyId],
    queryFn: () => adminPropertyService.getPropertyById(propertyId!),
    enabled: !!propertyId,
  });

  console.log({ property });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      propertyService.adminUpdateProperty(propertyId!, { isVerified: true }),
    onSuccess: (response) => {
      console.log({ response });
      queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
      queryClient.invalidateQueries({ queryKey: ["admin-property"] });
      setSuccess("Property verified successfully!");
    },
    onError: (error) => {
      setError(error.message || "Failed to verify property");
    },
  });

  const handleSubmit = async () => {
    setError(null);
    mutateAsync();
  };

  const btnText = isPending ? (
    <span className="flex items-center gap-2">
      <Loader2 /> Verifying...
    </span>
  ) : (
    <span className="flex items-center gap-2">
      <CheckCircle className="w-5 h-5" /> Verify Property
    </span>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader size={40} className="animate-spin text-custom-primary" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p>Property not found.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        {/* Verification Badge */}
        <Badge
          className={`text-sm px-3 py-1 rounded-full ${
            property.isVerified
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {property.isVerified ? "Verified" : "Pending Verification"}
        </Badge>
      </div>

      {/* Top Section: Images + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Property Images */}
        <div className="space-y-4">
          <img
            src={property.pictures?.[0]}
            alt={property.title}
            className="w-full h-80 rounded-xl object-cover"
          />
          <div className="grid grid-cols-4 gap-3">
            {property.pictures
              ?.slice(1, 5)
              .map((pic: string, index: number) => (
                <img
                  key={index}
                  src={pic}
                  alt={`Property image ${index + 1}`}
                  className="w-full h-20 rounded-lg object-cover"
                />
              ))}
          </div>
        </div>

        {/* Property Info */}
        <Card className="border rounded-xl shadow-none text-start">
          <CardContent className="space-y-4 p-4 py-0">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{property.title}</h2>
                <p className="text-gray-500 text-sm capitalize">
                  {property.type}
                </p>
              </div>
              <p className="text-xl font-semibold text-custom-primary">
                {formatCurrency(property.price)}
              </p>
            </div>

            <div className="flex items-center gap-4 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{property.address}</span>
              </div>
              {property.city && <span>• {property.city}</span>}
            </div>

            <div className="flex gap-6 mt-4">
              {property.numberOfBedrooms && (
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-gray-500" />
                  <span>{property.numberOfBedrooms} Bedrooms</span>
                </div>
              )}
              {property.numberOfBathrooms && (
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5 text-gray-500" />
                  <span>{property.numberOfBathrooms} Bathrooms</span>
                </div>
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {property.description || "No description provided."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Landlord Information */}
      <Card className="border rounded-xl shadow-none text-start">
        <CardContent className="p-4 py-0">
          <h3 className="text-lg font-semibold mb-4">Landlord Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-semibold">Name: </span>
              {property.user?.firstName} {property.user?.lastName}
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              {property.user?.email}
            </p>
            <p>
              <span className="font-semibold">Phone: </span>
              {property.landlord?.phone || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Email Verified: </span>
              {property.landlord?.isVerified ? "Yes" : "No"}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className=" flex justify-end">
        {error && (
          <CustomAlert
            variant="destructive"
            message={error}
            className="w-fit"
          />
        )}
        {success && (
          <CustomAlert variant="success" message={success} className="w-fit" />
        )}
      </div>

      {/* Verification Actions */}
      {!property.isVerified && (
        <div className="flex gap-4 justify-end">
          <Button
            className="bg-custom-primary hover:bg-custom-primary/80 text-white flex items-center gap-2 cursor-pointer"
            onClick={() => handleSubmit()}
          >
            {btnText}{" "}
          </Button>
        </div>
      )}

      {property.isVerified && (
        <div className="flex gap-4 justify-end">
          <Button
            disabled={property.isVerified}
            className="bg-custom-primary hover:bg-custom-primary/80 text-white flex items-center gap-2"
          >
            Property Verified
            <CheckCircle className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
