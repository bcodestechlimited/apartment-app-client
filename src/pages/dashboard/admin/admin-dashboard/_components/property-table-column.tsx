// src/components/admin/property-table-column.tsx
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const typeStyles: Record<string, string> = {
  "serviced-apartment": "bg-indigo-100 text-indigo-700",
  "shared-apartment": "bg-pink-100 text-pink-700",
  "short-let": "bg-teal-100 text-teal-700",
  "co-working-space": "bg-orange-100 text-orange-700",
};

export const propertyColumns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: () => <div className="font-medium text-left">Property Name</div>,
    cell: ({ row }) => (
      <div className="font-medium text-left">{row.original.title}</div>
    ),
  },
  {
    accessorKey: "address",
    header: () => <div className="font-medium text-left">Location</div>,
    cell: ({ row }) => (
      <div className="text-sm text-left">
        {row.original.lga}, {row.original.state}
      </div>
    ),
  },
  {
    accessorKey: "totalFees",
    header: () => <div className="text-center">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalFees"));
      return (
        <div className="text-center font-medium">{formatCurrency(amount)}</div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Platform Fee</div>,
    cell: ({ row, table }) => {
      const meta = table.options.meta as any;

      const settings = meta.settings;
      const platformFee = settings?.platformFeePercentage;
      console.log({ platformFee });
      const amount = parseFloat(row.getValue("price")) * (platformFee / 100);
      return (
        <div className="text-center font-medium">{formatCurrency(amount)}</div>
      );
    },
  },
  {
    accessorKey: "type",
    header: () => <div className="text-center">Type</div>,
    cell: ({ row }) => {
      const type = row.original.type;
      const style = typeStyles[type] || "bg-gray-100 text-gray-700";
      return (
        <Badge className={`capitalize ${style}`}>
          {type.replace(/-/g, " ")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          className={`capitalize ${
            status === "available"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          } `}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isVerified",
    header: () => <div className="text-center">Verification</div>,
    cell: ({ row }) => (
      <Badge
        className={
          row.original.isVerified
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }
      >
        {row.original.isVerified ? "Verified" : "Unverified"}
      </Badge>
    ),
  },
];
