// import DataTable from "@/components/custom/data-table";
// import { Button } from "@/components/ui/button";
// import { formatCurrency, formatPrettyDate } from "@/lib/utils";
// import { toast } from "sonner";

// interface WalletTransaction {
//   _id?: string;
//   id?: string;
//   createdAt?: string;
//   propertyName?: string;
//   location?: string;
//   amount?: number;
//   status?: string;
//   transactionType?: string;
// }

// interface WalletTransactionsTableProps {
//   transactions: WalletTransaction[];
// }

// export function WalletTransactionsTable({
//   transactions,
// }: WalletTransactionsTableProps) {
//   const columns = [
//     {
//       header: "Date",
//       render: (row: WalletTransaction) => (
//         <span className="capitalize">
//           {formatPrettyDate(row?.createdAt) || "N/A"}
//         </span>
//       ),
//     },
//     {
//       header: "Property Name",
//       render: (row: WalletTransaction) => (
//         <span className="capitalize">{row?.propertyName || "N/A"}</span>
//       ),
//     },
//     {
//       header: "Location",
//       render: (row: WalletTransaction) => (
//         <span className="capitalize">{row?.location || "N/A"}</span>
//       ),
//     },
//     {
//       header: "Amount (NGN)",
//       render: (row: WalletTransaction) => (
//         <span className="capitalize">
//           {formatCurrency(row?.amount) || "N/A"}
//         </span>
//       ),
//     },
//     {
//       header: "Status",
//       render: (row: WalletTransaction) => {
//         const status = row?.status?.toLowerCase() || "pending";
//         const classNames: Record<string, string> = {
//           paid: "text-green-500 bg-green-100 px-4 py-1 rounded-full capitalize",
//           pending:
//             "text-yellow-500 bg-yellow-100 px-4 py-1 rounded-full capitalize",
//           cancelled:
//             "text-red-500 bg-red-100 px-4 py-1 rounded-full capitalize",
//         };

//         return <span className={classNames[status]}>{row.status}</span>;
//       },
//     },
//     {
//       header: "Action",
//       render: (row: WalletTransaction) => (
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => {
//             // Handle view receipt action
//             console.log("View receipt for:", row);
//             // You can implement a modal or navigation to receipt details
//             toast.info("View receipt feature coming soon");
//           }}
//         >
//           View receipt
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <DataTable
//       columns={columns}
//       data={transactions}
//       noDataMessage="No transactions yet."
//     />
//   );
// }

import DataTable from "@/components/custom/data-table";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface WalletTransaction {
  _id?: string;
  id?: string;
  createdAt?: string;
  date?: string;
  propertyName?: string;
  location?: string;
  amount?: number;
  status?: string;
  transactionType?: string;
}

interface WalletTransactionsTableProps {
  transactions: WalletTransaction[];
}

export function WalletTransactionsTable({
  transactions,
}: WalletTransactionsTableProps) {
  const columns = [
    {
      header: "Date",
      render: (row: WalletTransaction) => (
        <span className="text-sm">
          {row?.date || formatDate(row?.createdAt) || "N/A"}
        </span>
      ),
    },
    {
      header: "Property Name",
      render: (row: WalletTransaction) => (
        <span className="text-sm capitalize">{row?.propertyName || "N/A"}</span>
      ),
    },
    {
      header: "Location",
      render: (row: WalletTransaction) => (
        <span className="text-sm capitalize">{row?.location || "N/A"}</span>
      ),
    },
    {
      header: "Amount",
      render: (row: WalletTransaction) => (
        <span className="text-sm font-medium">
          {formatCurrency(row?.amount) || "N/A"}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row: WalletTransaction) => {
        const status = row?.status?.toLowerCase() || "pending";
        const classNames: Record<string, string> = {
          paid: "text-green-700 bg-green-50 px-3 py-1 rounded-full capitalize text-xs font-medium",
          pending:
            "text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full capitalize text-xs font-medium",
          cancelled:
            "text-red-700 bg-red-50 px-3 py-1 rounded-full capitalize text-xs font-medium",
        };

        return <span className={classNames[status]}>{row.status}</span>;
      },
    },
    {
      header: "Action",
      render: (row: WalletTransaction) => (
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm font-normal"
          onClick={() => {
            // Handle view receipt action
            console.log("View receipt for:", row);
            toast.info("View receipt feature coming soon");
          }}
        >
          View receipt
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={transactions}
      noDataMessage="No transactions yet."
    />
  );
}
