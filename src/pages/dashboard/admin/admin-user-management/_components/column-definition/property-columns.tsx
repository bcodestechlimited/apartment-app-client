import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

// Helper function to format currency (NGN)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(value);
};

// Helper function to format percentage
const formatPercentage = (value: number) => {
  return `${(value * 100).toFixed(0)}%`;
};

export const propertyColumns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: () => <div className="text-left">Property Name</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium text-gray-900">
        {row.original.title}
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: () => <div className="text-left">Location</div>,
    cell: ({ row }) => (
      <div className="text-left text-gray-500">
        {row.original.lga}, {row.original.state}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: () => <div className="text-left">Category</div>,
    cell: ({ row }) => {
      const type = row.original.type || "N/A";
      // Format 'serviced-apartment' to 'Serviced apartment'
      const formattedType =
        type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, " ");
      return <div className="text-left text-gray-600">{formattedType}</div>;
    },
  },
  //   {
  //     accessorKey: "occupancyRate",
  //     header: () => <div className="text-left">Occupancy Rate</div>,
  //     cell: ({ row }) => {
  //       // Access the value from your aggregation or default to 0
  //       const rate = row.original.occupancyRate || 0;
  //       return <div className="text-left">{formatPercentage(rate)}</div>;
  //     },
  //   },
  {
    accessorKey: "revenue",
    header: () => <div className="text-left">Revenue (₦)</div>,
    cell: ({ row }) => {
      const revenue = row.original.totalRevenue || 0;
      return (
        <div className="text-left font-semibold">{formatCurrency(revenue)}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      const isActive = row.original.isAvailable && !row.original.isDeleted;
      return (
        <div className="flex justify-start">
          <Badge
            variant="outline"
            className={
              isActive
                ? "bg-green-50 text-green-600 border-green-200"
                : "bg-gray-50 text-gray-600 border-gray-200"
            }
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
  },
];
