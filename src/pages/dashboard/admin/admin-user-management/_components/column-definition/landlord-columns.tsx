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
import { Link } from "react-router";

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
    header: () => <div className="text-left">Properties Listed</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.original.propertiesCount || 0}</div>
    ),
  },
  {
    accessorKey: "totalEarnings",
    header: () => <div className="text-left">Earnings (₦)</div>,
    cell: ({ row }) => (
      <div className="text-left">
        {formatCurrency(row.original.totalEarnings || 0)}
      </div>
    ),
  },
  {
    accessorKey: "isDocumentVerified",
    header: () => <div className="text-left">Verification Status</div>,
    cell: ({ row }) => {
      const isVerified = row.original.isDocumentVerified;
      return (
        <div className="flex justify-left">
          <Badge
            className={
              isVerified
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          >
            {isVerified ? "Verified" : "Unverified"}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: () => <div className="text-left">Account Status</div>,
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <div className="flex justify-left">
          <Badge
            className={
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-left">Action</div>,
    cell: ({ row, table }) => {
      const { _id, isDocumentVerified, isActive } = row.original;
      const meta = table.options.meta as any;
      return (
        <div className="flex justify-left">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0  cursor-pointer">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`${_id}`} className="cursor-pointer">
                  View details
                </Link>
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
