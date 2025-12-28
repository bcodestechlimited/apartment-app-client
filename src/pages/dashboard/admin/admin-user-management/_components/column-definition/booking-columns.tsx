// import type { ColumnDef } from "@tanstack/react-table";
// import type { Booking } from "../../../types";
// import { renderStatusBadge } from "./styles";
// // import { renderStatusBadge } from "../../../pages/tenant-detail-page";

// export const bookingColumns: ColumnDef<Booking>[] = [
//   {
//     accessorKey: "property",
//     header: () => <div className="text-center">Property Name</div>, // Text left-aligned
//     cell: ({ row }) => (
//       <div className="text-center">{row.getValue("property") as string}</div>
//     ),
//   },
//   {
//     accessorKey: "location",
//     header: () => <div className="text-center">Location</div>, // Text left-aligned
//     cell: ({ row }) => (
//       <div className="text-center">{row.getValue("location") as string}</div>
//     ),
//   },
//   {
//     accessorKey: "duration",
//     header: () => <div className="text-center">Duration</div>, // Text left-aligned
//     cell: ({ row }) => (
//       <div className="text-center">{row.getValue("duration") as string}</div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: () => <div className="text-center">Status</div>, // Center header for badge/status column
//     cell: ({ row }) => (
//       <div className="flex justify-center">
//         {renderStatusBadge(row.getValue("status"), "status")}
//       </div>
//     ), // Center cell content
//   },
//   {
//     accessorKey: "paymentStatus",
//     header: () => <div className="text-center">Payment Status</div>, // Center header
//     cell: ({ row }) => (
//       <div className="flex justify-center">
//         {renderStatusBadge(row.getValue("paymentStatus"), "payment")}
//       </div>
//     ), // Center cell content
//   },
//   {
//     accessorKey: "landlord",
//     header: () => <div className="text-center">Landlord/Agent</div>, // Text left-aligned
//     cell: ({ row }) => (
//       <div className="text-center">{row.getValue("landlord") as string}</div>
//     ),
//   },
// ];

import type { ColumnDef } from "@tanstack/react-table";
import type { Booking } from "../../types";
import { renderStatusBadge } from "../users/tenant/styles";
import { formatPrettyDate } from "@/lib/utils";

export const bookingColumns: ColumnDef<Booking>[] = [
  {
    // Access the 'title' inside the 'property' object
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
    // Access location details from the 'property' object
    id: "location",
    header: () => <div className="text-center">Location</div>,
    cell: ({ row }) => {
      const property = row.original.property as any;
      return (
        <div className="text-center text-sm">
          {property?.lga ? `${property.lga}, ${property.state}` : "N/A"}
        </div>
      );
    },
  },
  {
    // Calculate duration or show stay dates from moveInDate/moveOutDate
    id: "duration",
    header: () => <div className="text-center">Stay Period</div>,
    cell: ({ row }) => {
      const { moveInDate, moveOutDate } = row.original;
      return (
        <div className="text-center text-xs">
          {formatPrettyDate(moveInDate)} - {formatPrettyDate(moveOutDate)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        {renderStatusBadge(row.getValue("status"), "status")}
      </div>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: () => <div className="text-center">Payment Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        {renderStatusBadge(row.getValue("paymentStatus"), "payment")}
      </div>
    ),
  },
  {
    // Access the name inside the 'landlord' object
    accessorKey: "landlord",
    header: () => <div className="text-center">Landlord/Agent</div>,
    cell: ({ row }) => {
      const landlord = row.original.landlord as any;
      return (
        <div className="text-center">
          {landlord?.firstName
            ? `${landlord.firstName} ${landlord.lastName}`
            : "N/A"}
        </div>
      );
    },
  },
];
