import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import type { Report } from "../../types";
import { styles } from "../users/tenant/styles";
import { formatPrettyDate } from "@/lib/utils";

export const flagsReportsColumns: ColumnDef<Report>[] = [
  {
    accessorKey: "date",
    header: () => <div className="text-center">Date</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {formatPrettyDate(row.original.createdAt)}
      </div>
    ),
  },
  {
    accessorKey: "issue",
    header: () => <div className="text-center">Issue</div>,
    cell: ({ row }) => <div className="text-center">{row.original.reason}</div>,
  },
  {
    accessorKey: "reportedBy",
    header: () => <div className="text-center">Reported By</div>,
    cell: ({ row }) => {
      const firstName = row.original.reporter?.firstName;
      const lastName = row.original.reporter?.lastName;
      return (
        <div className="text-center">
          {firstName} {lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      // Apply coloring/styling while keeping content centered
      let classes;
      if (status === "Pending") classes = styles.pending;
      if (status === "Reached") classes = styles.verified;

      return (
        <div className={`${classes}  text-center`}>{status as string}</div>
      );
    },
  },
  {
    id: "action",
    header: () => <div className="text-center">Action</div>,
    cell: () => (
      // Apply flex justify-center to center the button element in the cell
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          {/* Add DropdownMenuContent here for actions */}
        </DropdownMenu>
      </div>
    ),
  },
];
