import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatPrettyDate } from "@/lib/utils";
import type { ColumnDef } from "@tanstack/react-table";

export const paymentColumns: ColumnDef<any>[] = [
  {
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-mono text-xs uppercase font-bold text-slate-700">
          {row.original.reference || "N/A"}
        </span>
        <span className="text-[10px] text-muted-foreground uppercase">
          via {row.original.provider || "System"}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: "User/Entity",
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex flex-col">
          <p className="font-medium capitalize text-sm">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{user?.email}</p>
          <div className="flex gap-1 mt-1">
            {user?.roles?.map((role: string) => (
              <span
                key={role}
                className="text-[10px] bg-slate-100 px-1.5 rounded-full border"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "transactionType",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize text-[11px] font-normal">
        {row.original.transactionType}
      </Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-bold text-slate-900">
        {formatCurrency(row.original.amount)}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const variants: Record<string, string> = {
        success: "bg-green-100 text-green-700 border-green-200",
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        failed: "bg-red-100 text-red-700 border-red-200",
      };
      return (
        <Badge
          className={`${
            variants[status] || "bg-slate-100"
          } capitalize shadow-none`}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "adminApproval",
    header: "Admin Approval",
    cell: ({ row }) => {
      const approval = row.original.adminApproval;
      const variants: Record<string, string> = {
        approved: "text-green-600",
        pending: "text-amber-600",
        rejected: "text-red-600",
      };
      return (
        <div className="flex flex-col">
          <span
            className={`text-xs font-semibold capitalize ${variants[approval]}`}
          >
            {approval}
          </span>
          {row.original.approvalDate && (
            <span className="text-[10px] text-muted-foreground">
              {formatPrettyDate(row.original.approvalDate)}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => (
      <div className="text-xs text-slate-600">
        {formatPrettyDate(row.original.createdAt)}
      </div>
    ),
  },
  //   {
  //     id: "actions",
  //     header: "Action",
  //     cell: ({ row, table }) => {
  //       const { status, transactionType, adminApproval } = row.original;
  //       const meta = table.options.meta as any;

  //       // Only show process button if it's a withdrawal and hasn't been handled yet
  //       if (transactionType === "withdrawal" && adminApproval === "pending") {
  //         return (
  //           <Button
  //             size="sm"
  //             variant="outline"
  //             className="h-8 text-xs bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100"
  //             onClick={() => meta?.onProcessWithdrawal(row.original)}
  //           >
  //             Process
  //           </Button>
  //         );
  //       }
  //       return <span className="text-xs text-slate-400">—</span>;
  //     },
  //   },

  {
    id: "actions",
    header: "Action",
    cell: ({ row, table }) => {
      const { status, transactionType, adminApproval } = row.original;
      const meta = table.options.meta as any; // Accessing the meta passed in DataTable

      if (transactionType === "withdrawal" && adminApproval === "pending") {
        return (
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs bg-teal-50 text-teal-700 border-teal-200"
            onClick={() => meta?.onProcessWithdrawal(row.original)} // Triggering the modal
          >
            Process
          </Button>
        );
      }
      return (
        <span className="text-xs text-slate-400 text-center block">—</span>
      );
    },
  },
];
