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
  phoneNumber: string;
  paymentStatus: "Cleared" | "Outstanding" | "Overdue";
  activeBookingsCount: number;
  isDocumentVerified: boolean;
  isActive: boolean;
  updatedAt: string;
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
    header: () => <div className="text-left">Verification Status</div>,
    cell: ({ row }) => {
      // Logic: Convert boolean to Status string
      const isVerified = row.original.isDocumentVerified;
      const statusLabel = isVerified ? "Verified" : "Unverified";

      return (
        <div className="text-left">
          <Badge className={statusStyles[statusLabel]}>{statusLabel}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "activeBookingsCount",
    header: () => <div className="text-left">Active Bookings</div>,
    cell: ({ row }) => (
      <div className="text-left font-mono">
        {row.original.activeBookingsCount ?? 0}
      </div>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: () => <div className="text-left">Payment Status</div>,
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      return (
        <div className="text-left">
          <Badge className={statusStyles[status]}>{status}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-left">Last Activity</div>,
    cell: ({ row }) => (
      <div className="text-left text-sm text-muted-foreground">
        {new Date(row.original.updatedAt).toLocaleDateString()}
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-left">Action</div>,
    cell: ({ row, table }) => {
      const { _id, isDocumentVerified, isActive } = row.original;
      const meta = table.options.meta as any;
      return (
        <div className="text-left">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/admin/users/tenants/${_id}`}>View details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={
                  isDocumentVerified ? "text-purple-600" : "text-green-600"
                }
                onClick={() => meta?.onVerify(_id, isDocumentVerified)}
              >
                {isDocumentVerified ? "UnVerify" : "verify"}
              </DropdownMenuItem>
              <DropdownMenuItem
                className={isActive ? "text-destructive" : "text-green-600"}
                onClick={() => meta?.onSuspend(_id, isActive)}
              >
                {isActive ? "Suspend" : "Activate"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
