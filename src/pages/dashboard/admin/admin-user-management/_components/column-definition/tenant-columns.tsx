// // TenantColumns.tsx
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
// import { Link } from "react-router";

// // Assume your Tenant type from your data source
// export type Tenant = {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   verificationStatus: "Verified" | "Pending" | "Failed";
//   activeBookings: number;
//   paymentStatus: "Cleared" | "Outstanding" | "Overdue";
//   lastLogin: string;
//   activeBookingsCount: number;
//   isDocumentVerified: boolean;
// };

// // Map status to badge style
// const statusStyles = {
//   Verified: "bg-green-100 text-green-700",
//   Pending: "bg-yellow-100 text-yellow-700",
//   Failed: "bg-red-100 text-red-700",
//   Cleared: "bg-green-100 text-green-700",
//   Outstanding: "bg-yellow-100 text-yellow-700",
//   Overdue: "bg-red-100 text-red-700",
// };

// export const tenantColumns: ColumnDef<Tenant>[] = [
//   {
//     accessorKey: "name",
//     header: () => <div className="text-left">Tenant Name</div>,
//     cell: ({ row }) => (
//       <div className="text-left">
//         {row.original.firstName} {row.original.lastName}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "email",
//     header: () => <div className="text-left">Email/Phone</div>,
//     cell: ({ row }) => (
//       // Add text-left class to ensure alignment
//       <div className="text-sm text-left">
//         <div>{row.original.email}</div>
//         <div className="text-muted-foreground">{row.original.phone}</div>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "verificationStatus",
//     header: () => <div className="text-center ">Verification Status</div>,
//     cell: ({ row }) => {
//       const status = row.original.isDocumentVerified;
//       // Wrap badge in a div with text-left or flex-start
//       return (
//         <div className="text-center">
//           <Badge className={statusStyles[status]}>{status}</Badge>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "activeBookings",
//     header: () => <div className="text-center ">Active Bookings</div>, // Keep numerical data right-aligned
//     cell: ({ row }) => (
//       <div className="text-center ">{row.original.activeBookingsCount}</div>
//     ),
//   },
//   {
//     accessorKey: "paymentStatus",
//     header: () => <div className="text-center"> Payment Status</div>,
//     cell: ({ row }) => {
//       const status = row.getValue("paymentStatus") as keyof typeof statusStyles;
//       return (
//         <div className="text-center">
//           <Badge className={statusStyles[status]}>{status}</Badge>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "lastLogin",
//     header: () => <div className="text-center"> Last Login</div>,
//     cell: ({ row }) => (
//       <div className="text-center">{row.getValue("lastLogin") as string}</div>
//     ),
//   },
//   {
//     id: "actions",
//     header: () => <div className="text-center"> Action</div>,
//     cell: ({ row }) => {
//       const id = row.original.id;
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuItem>
//               <Link to={`/admin/users/tenants/${id}`}>View details</Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem>Verify</DropdownMenuItem>
//             <DropdownMenuItem>Suspend</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

// TenantColumns.tsx
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

export type Tenant = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string; // Changed from 'phone' to match your API response
  paymentStatus: "Cleared" | "Outstanding" | "Overdue";
  activeBookingsCount: number;
  isDocumentVerified: boolean;
  updatedAt: string; // We'll use this for 'Last Login' since it's in your JSON
};

const statusStyles = {
  Verified: "bg-green-100 text-green-700 hover:bg-green-100",
  Pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  Failed: "bg-red-100 text-red-700 hover:bg-red-100",
  Cleared: "bg-green-100 text-green-700 hover:bg-green-100",
  Outstanding: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  Overdue: "bg-red-100 text-red-700 hover:bg-red-100",
  Unverified: "bg-red-100 text-red-700 hover:bg-red-100",
};

export const tenantColumns: ColumnDef<Tenant>[] = [
  {
    accessorKey: "firstName", // Accessor for the main column
    header: () => <div className="text-left">Tenant Name</div>,
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
        <div className="text-muted-foreground">
          {row.original.phoneNumber || "N/A"}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "isDocumentVerified", // Bind to the boolean field
    header: () => <div className="text-center">Verification Status</div>,
    cell: ({ row }) => {
      // Logic: Convert boolean to Status string
      const isVerified = row.original.isDocumentVerified;
      const statusLabel = isVerified ? "Verified" : "Unverified";

      return (
        <div className="text-center">
          <Badge className={statusStyles[statusLabel]}>{statusLabel}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "activeBookingsCount",
    header: () => <div className="text-center">Active Bookings</div>,
    cell: ({ row }) => (
      <div className="text-center font-mono">
        {row.original.activeBookingsCount ?? 0}
      </div>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: () => <div className="text-center">Payment Status</div>,
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      return (
        <div className="text-center">
          <Badge className={statusStyles[status]}>{status}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-center">Last Activity</div>,
    cell: ({ row }) => (
      <div className="text-center text-sm text-muted-foreground">
        {new Date(row.original.updatedAt).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const id = row.original._id;
      return (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/admin/users/tenants/${id}`}>View details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Verify User</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Suspend
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
