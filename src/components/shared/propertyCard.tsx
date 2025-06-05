import type { IProperty } from "@/interfaces/property.interface";

interface PropertyCardProps {
  property: IProperty;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { pictures, amenities } = property;

  return (
    <div className="bg-white rounded shadow w-72 overflow-hidden">
      <img
        src={pictures[0]}
        // alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 text-left">
        {/* <h3 className="font-semibold">{property.title}</h3>
        <p className="text-gray-600">{property.type}</p>
        <p className="font-bold text-lg">{property.price}</p>
        <p className="text-sm text-gray-500">{property.description}</p> */}
        <ul>
          {amenities.map((amenity) => (
            <li>{amenity}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
