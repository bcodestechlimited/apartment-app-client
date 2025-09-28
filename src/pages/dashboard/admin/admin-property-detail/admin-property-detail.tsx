import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router";
import {
  Loader,
  MapPin,
  Bed,
  Bath,
  ArrowLeft,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { adminPropertyService } from "@/api/admin/admin-property.api";
import { Badge } from "@/components/ui/badge";

export default function AdminPropertyDetail() {
  const { propertyId } = useParams();
  const navigate = useNavigate();

  const { data: property, isLoading } = useQuery({
    queryKey: ["admin-property", propertyId],
    queryFn: () => adminPropertyService.getPropertyById(propertyId!),
    enabled: !!propertyId,
  });

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
    <div className="space-y-6">
      {/* Back Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Property Images */}
        <div className="space-y-4">
          <img
            src={property.pictures?.[0]}
            alt={property.title}
            className="w-full h-80 rounded-xl object-cover"
          />
          <div className="grid grid-cols-4 gap-3">
            {property.pictures?.slice(1).map((pic: string, index: number) => (
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
        <Card className="border rounded-xl shadow-sm">
          <CardContent className="space-y-4 p-6">
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
      <Card className="border rounded-xl shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Landlord Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-semibold">Name: </span>
              {property.landlord?.firstName} {property.landlord?.lastName}
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              {property.landlord?.email}
            </p>
            <p>
              <span className="font-semibold">Phone: </span>
              {property.landlord?.phone || "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Verification Actions */}
      {!property.isVerified && (
        <div className="flex gap-4 justify-end mt-6">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            onClick={() => {
              // handle verify property
            }}
          >
            <CheckCircle className="w-5 h-5" />
            Verify Property
          </Button>
          <Button
            variant="destructive"
            className="flex items-center gap-2"
            onClick={() => {
              // handle reject property
            }}
          >
            <XCircle className="w-5 h-5" />
            Reject Property
          </Button>
        </div>
      )}
    </div>
  );
}
