import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button"; // Re-import Button for use
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Document, VerificationStatus } from "../../data";
import { formatPrettyDate } from "@/lib/utils";

// --- Helper Functions and Styles ---

const statusStyles: Record<VerificationStatus, string> = {
  pending: "bg-purple-100 text-purple-700 border border-purple-300",
  approved: "bg-blue-100 text-blue-700 border border-blue-300",
  rejected: "bg-red-100 text-red-700 border border-red-300",
};

export interface VerificationActions {
  onViewDocument: (document: Document) => void;
  onVerifyDocument: (documentId: string) => void;
  onRejectDocument: (documentId: string) => void;
}

const renderStatus = (status: VerificationStatus) => (
  <Badge className={statusStyles[status]}>{status}</Badge>
);

// --- Column Definitions Function ---
export const createVerificationColumns = (
  actions: VerificationActions
): ColumnDef<Document>[] => [
  {
    accessorKey: "name",
    header: () => <div className="text-center">Document Name</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original?.name || "N/A"}</div>
    ),
  },
  {
    accessorKey: "user",
    header: () => <div className="text-center">User</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original?.user?.firstName + " " + row.original?.user?.lastName}
      </div>
    ),
  },
  {
    accessorKey: "userType",
    header: () => <div className="text-center">User Type</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original?.user?.roles}</div>
    ),
  },
  {
    accessorKey: "dateUploaded",
    header: () => <div className="text-center">Date Uploaded</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {formatPrettyDate(row.original.uploadedAt)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="text-center">{renderStatus(row.original.status)}</div>
    ),
  },

  {
    id: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const handleVerify = () => actions.onVerifyDocument(row.original._id);
      const handleReject = () => actions.onRejectDocument(row.original._id);
      const handleView = () => {
        actions.onViewDocument(row.original);
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* Standard Shadcn Button usage. This is the source of the error 
                   but MUST be used if the environment is correct. */}
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleView}>
              View Document
            </DropdownMenuItem>
            {row.original.status !== "approved" && (
              <DropdownMenuItem onClick={handleVerify}>Verify</DropdownMenuItem>
            )}
            {row.original.status !== "rejected" && (
              <DropdownMenuItem onClick={handleReject}>Reject</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
