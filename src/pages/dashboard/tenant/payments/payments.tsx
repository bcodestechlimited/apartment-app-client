import { bookingRequestService } from "@/api/bookingRequest.api";
import DataTable from "@/components/custom/data-table";
import { Spinner } from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, formatPrettyDate } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { useState } from "react";
import { transactionService } from "@/api/transaction.api";

export const columns = [
  {
    header: "Transaction Type",
    render: (row: any) => (
      <span className=" capitalize">{row?.transactionType || "N/A"}</span>
    ),
  },
  {
    header: "Provider",
    render: (row: any) => (
      <span className=" capitalize">{row?.provider || "N/A"}</span>
    ),
  },
  {
    header: "Amount (NGN)",
    render: (row: any) => (
      <span className=" capitalize">
        {formatCurrency(row?.amount) || "N/A"}
      </span>
    ),
  },

  {
    header: "Reference",
    render: (row: any) => (
      <span className=" capitalize">{row?.reference || "N/A"}</span>
    ),
  },

  {
    header: "Status",
    render: (row: any) => {
      const status = row?.status?.toLowerCase() || "pending";
      const classNames: Record<string, string> = {
        success:
          "text-green-500 bg-green-100 px-4 py-1 rounded-full capitalize",
        pending:
          "text-yellow-500 bg-yellow-100 px-4 py-1 rounded-full capitalize",
        declined: "text-red-500 bg-red-100 px-4 py-1 rounded-full capitalize",
        failed: "text-red-500 bg-red-100 px-4 py-1 rounded-full capitalize",
        expired: "text-red-500 bg-red-100 px-4 py-1 rounded-full capitalize",
      };

      return <span className={classNames[status]}>{row.status}</span>;
    },
  },
  {
    header: "Date",
    render: (row: any) => (
      <span className=" capitalize">
        {formatPrettyDate(row?.createdAt) || "N/A"}
      </span>
    ),
  },
];

export default function TenantPayments() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", { page, limit }],
    queryFn: () =>
      transactionService.getAllUserTransactions({
        page: 1,
        limit: 10,
      }),
  });

  console.log({ data });

  if (isLoading) return <Spinner />;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-medium text-start px-2">Payments</h2>
      <DataTable
        columns={columns}
        data={data?.transactions || []}
        noDataMessage="No payments available."
      />
    </div>
  );
}
