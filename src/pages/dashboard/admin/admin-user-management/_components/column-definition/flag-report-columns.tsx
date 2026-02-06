// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import type { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";
// import type { Report } from "../../types";
// import { styles } from "../users/tenant/styles";
// import { formatPrettyDate } from "@/lib/utils";

// const statusStyles = {
//   Pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
//   Resolved: "bg-green-100 text-green-700 hover:bg-green-100",
//   Reached: "bg-blue-100 text-blue-700 hover:bg-blue-100",
// };

// export const flagsReportsColumns: ColumnDef<Report>[] = [
//   {
//     accessorKey: "date",
//     header: () => <div className="text-center">Date</div>,
//     cell: ({ row }) => (
//       <div className="text-center">
//         {formatPrettyDate(row.original.createdAt)}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "issue",
//     header: () => <div className="text-center">Issue</div>,
//     cell: ({ row }) => <div className="text-center">{row.original.reason}</div>,
//   },
//   {
//     accessorKey: "reportedBy",
//     header: () => <div className="text-center">Reported By</div>,
//     cell: ({ row }) => {
//       const firstName = row.original.reporter?.firstName;
//       const lastName = row.original.reporter?.lastName;
//       return (
//         <div className="text-center">
//           {firstName} {lastName}
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "status",
//     header: () => <div className="text-center">Status</div>,
//     cell: ({ row }) => {
//       const status = row.getValue("status");
//       // Apply coloring/styling while keeping content centered
//       let classes;
//       if (status === "Pending") classes = styles.pending;
//       if (status === "Reached") classes = styles.verified;

//       return (
//         <div className={`${classes}  text-center`}>{status as string}</div>
//       );
//     },
//   },
//   {
//     id: "action",
//     header: () => <div className="text-center">Action</div>,
//     cell: () => (
//       // Apply flex justify-center to center the button element in the cell
//       <div className="flex justify-center">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           {/* Add DropdownMenuContent here for actions */}
//         </DropdownMenu>
//       </div>
//     ),
//   },
// ];

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatPrettyDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Report } from "../../types";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  Resolved: "bg-green-100 text-green-700 hover:bg-green-100",
  Reached: "bg-blue-100 text-blue-700 hover:bg-blue-100", // Matches your logic
};

export const flagsReportsColumns: ColumnDef<Report>[] = [
  {
    accessorKey: "date",
    header: () => <div className="text-left">Date</div>,
    cell: ({ row }) => (
      <div className="text-left">
        {formatPrettyDate(row.original.createdAt)}
      </div>
    ),
  },
  {
    accessorKey: "issue",
    header: () => <div className="text-left">Issue</div>,
    cell: ({ row }) => <div className="text-left">{row.original.reason}</div>,
  },
  {
    accessorKey: "reportedBy",
    header: () => <div className="text-left">Reported By</div>,
    cell: ({ row }) => (
      <div className="text-left">
        {row.original.reporter?.firstName} {row.original.reporter?.lastName}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof statusStyles;
      return (
        <div className="text-left">
          <Badge className={statusStyles[status] || ""}>{status}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-left">Action</div>,
    cell: ({ row, table }) => {
      const { _id, status } = row.original;
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
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => meta?.onResolve(_id)}
                disabled={status === "Reached"}
              >
                Mark as Resolved
              </DropdownMenuItem>
              {/* <DropdownMenuItem
                className="text-destructive cursor-pointer"
                onClick={() => meta?.onDelete(_id)}
              >
                Delete Report
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
