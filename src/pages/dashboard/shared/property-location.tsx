import type { IProperty } from "@/interfaces/property.interface";
import { formatCurrency } from "@/lib/utils";
import { useOutletContext } from "react-router";

type PropertyDetailProps = {
  property: IProperty;
};

export default function PropertyLocation() {
  const { property }: PropertyDetailProps = useOutletContext();

  console.log({ property });

  return (
    <div className="text-start p-4">
      <h2 className="text-2xl font-medium">Locations & Map</h2>
      <p>Coming Soon</p>
    </div>
  );
}
