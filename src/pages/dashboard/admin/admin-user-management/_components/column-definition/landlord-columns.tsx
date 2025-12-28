// // LandlordColumns.tsx
// import type { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Badge } from "@/components/ui/badge";

// // --- Define Landlord Data Type ---
// export interface Landlord {
//   id: string;
//   name: string;
//   email: string;
//   phone: string;
//   propertiesListed: number;
//   earnings: number; // Stored as number for sorting
//   agentsAssigned: number;
//   status: "Verified" | "Pending" | "Failed";
// }

// // Helper function to format currency (assuming NGN)
// const formatCurrency = (value: number) => {
//   return new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 0,
//   }).format(value);
// };

// // Map status to badge style
// const statusStyles = {
//   Verified: "bg-green-100 text-green-700",
//   Pending: "bg-yellow-100 text-yellow-700",
//   Failed: "bg-red-100 text-red-700",
// };

// export const landlordColumns: ColumnDef<Landlord>[] = [
//   {
//     accessorKey: "name",
//     header: () => <div className="text-center">Landlord Name</div>,
//     cell: ({ row }) => (
//       <div className="text-center">{row.getValue("name") as string}</div>
//     ),
//   },
//   {
//     accessorKey: "email",
//     header: () => <div className="text-center">Email/Phone</div>,
//     cell: ({ row }) => (
//       <div className="text-sm text-center">
//         <div>{row.original.email}</div>
//         <div className="text-muted-foreground">{row.original.phone}</div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "propertiesListed",
//     header: () => <div className="text-center">Properties Listed</div>,
//     cell: ({ row }) => (
//       <div className="text-center">
//         {row.getValue("propertiesListed") as number}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "earnings",
//     header: () => <div className="text-center">Earnings (₦)</div>,
//     cell: ({ row }) => {
//       const earnings = row.getValue("earnings") as number;
//       return (
//         <div className="font-medium text-center">
//           {formatCurrency(earnings)}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "agentsAssigned",
//     header: () => <div className="text-center">Agents Assigned</div>,
//     cell: ({ row }) => (
//       <div className="text-center">
//         {row.getValue("agentsAssigned") as number}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: () => <div className="text-center">Status</div>,
//     cell: ({ row }) => {
//       const status = row.getValue("status") as keyof typeof statusStyles;
//       return <Badge className={statusStyles[status]}>{status}</Badge>;
//     },
//   },
//   {
//     id: "actions",
//     header: () => <div className="text-center"> Action</div>,
//     cell: ({ row }) => {
//       // Define navigation function based on your router setup
//       const handleViewDetails = () => {
//         // Example: router.push(`/user-management/landlords/${row.original.id}`);
//         console.log(
//           `Navigating to details for landlord ID: ${row.original.id}`
//         );
//       };

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem onClick={handleViewDetails}>
//               View details
//             </DropdownMenuItem>
//             <DropdownMenuItem>Verify</DropdownMenuItem>
//             <DropdownMenuItem>Suspend</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

// src/pages/admin/user-management/column-definition/landlord-columns.tsx

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Eye, CheckCircle, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Helper function to format currency (NGN)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(value);
};

export const landlordColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-left">Landlord Name</div>,
    cell: ({ row }) => (
      <div className="text-left font-medium">
        {row.original.firstName} {row.original.lastName}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-left">Email/Phone</div>,
    cell: ({ row }) => (
      <div className="text-sm text-left">
        <div>{row.original.email}</div>
        <div className="text-muted-foreground">{row.original.phoneNumber}</div>
      </div>
    ),
  },
  {
    accessorKey: "propertiesCount",
    header: () => <div className="text-center">Properties Listed</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.propertiesCount || 0}</div>
    ),
  },
  {
    accessorKey: "totalEarnings",
    header: () => <div className="text-center">Earnings (₦)</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {formatCurrency(row.original.totalEarnings || 0)}
      </div>
    ),
  },
  {
    accessorKey: "isDocumentVerified",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const isVerified = row.original.isDocumentVerified;
      return (
        <div className="flex justify-center">
          <Badge
            className={
              isVerified
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }
          >
            {isVerified ? "Verified" : "Unverified"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const id = row.original._id;

      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() =>
                  (window.location.href = `/admin/users/landlords/${id}`)
                }
              >
                <Eye className="mr-2 h-4 w-4" /> View details
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-green-600">
                <CheckCircle className="mr-2 h-4 w-4" /> Verify
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600">
                <Ban className="mr-2 h-4 w-4" /> Suspend
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
