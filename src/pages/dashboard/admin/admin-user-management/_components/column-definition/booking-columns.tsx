import type { ColumnDef } from "@tanstack/react-table";
import type { Booking } from "../../types";
import { renderStatusBadge } from "../users/tenant/styles";
import { formatPrettyDate } from "@/lib/utils";

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: "property",
    header: () => <div className="text-left">Property Name</div>,
    cell: ({ row }) => {
      const property = row.original.property as any;
      return (
        <div className="text-left font-medium">{property?.title || "N/A"}</div>
      );
    },
  },
  {
    id: "location",
    header: () => <div className="text-left">Location</div>,
    cell: ({ row }) => {
      const property = row.original.property as any;
      return (
        <div className="text-left text-sm">
          {property?.lga ? `${property.lga}, ${property.state}` : "N/A"}
        </div>
      );
    },
  },
  {
    id: "duration",
    header: () => <div className="text-left">Stay Period</div>,
    cell: ({ row }) => {
      const { moveInDate, moveOutDate } = row.original;
      return (
        <div className="text-left text-xs">
          {formatPrettyDate(moveInDate)} - {formatPrettyDate(moveOutDate)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-start">
        {renderStatusBadge(row.getValue("status"), "status")}
      </div>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: () => <div className="text-left">Payment Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-start">
        {renderStatusBadge(row.getValue("paymentStatus"), "payment")}
      </div>
    ),
  },
  {
    accessorKey: "landlord",
    header: () => <div className="text-left">Landlord/Agent</div>,
    cell: ({ row }) => {
      const landlord = row.original.landlord as any;
      return (
        <div className="text-left">
          {landlord?.firstName
            ? `${landlord.firstName} ${landlord.lastName}`
            : "N/A"}
        </div>
      );
    },
  },
];
