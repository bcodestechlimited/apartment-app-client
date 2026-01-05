import { useState } from "react";
import { DataTable } from "../_component/data-table";
import { paymentColumns } from "./_components/column-definition/payments-columns";
import { WithdrawalModal } from "./_components/withdrawal-request";
import { useAdminPayments } from "@/hooks/admin/useAdminPayments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminPaymentsService } from "@/api/admin/admin-payments.api";
import { toast } from "sonner";

export function AdminPaymentsPage() {
  const queryClient = useQueryClient();
  const {
    data,
    isLoading,
    localSearch,
    setLocalSearch,
    filters,
    setPage,
    setLimit,
    setStatus,
    setType,
  } = useAdminPayments();
  const metrics = [
    {
      title: "Total Platform Revenue",
      value: data?.stats?.totalRevenue,
      color: "bg-teal-50 text-teal-700",
    },
    {
      title: "Pending Payouts",
      value: data?.stats?.pendingPayouts,
      color: "bg-orange-50 text-orange-700",
    },
    {
      title: "Successful Payouts",
      value: data?.stats?.successfulPayouts,
      color: "bg-blue-50 text-blue-700",
    },
  ];

  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProcessClick = (transaction: any) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  // ... (handleConfirmWithdrawal and metrics)

  const processWithdrawalMutation = useMutation({
    mutationFn: ({
      transactionId,
      action,
      reason,
    }: {
      transactionId: string;
      action: "approved" | "rejected";
      reason?: string;
    }) =>
      adminPaymentsService.processWithdrawal({ transactionId, action, reason }),
    onSuccess: (res) => {
      toast.success(res.message || "Action completed successfully");
      // Refresh the table data to show the updated status
      queryClient.invalidateQueries({ queryKey: ["admin-payments"] });
      setIsModalOpen(false); // Close the modal
      setSelectedTransaction(null);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });

  const handleConfirmWithdrawal = (
    action: "approved" | "rejected",
    reason?: string
  ) => {
    if (!selectedTransaction?._id) return;

    processWithdrawalMutation.mutate({
      transactionId: selectedTransaction._id,
      action,
      reason,
    });
  };
  return (
    <div className="p-6 space-y-6 text-left">
      {/* Metrics Cards UI ... */}
      <div className="grid gap-6 md:grid-cols-3">
        {metrics.map((m, i) => (
          <Card key={i} className={`border-none shadow-none ${m.color}`}>
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-medium">{m.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₦{m.value?.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Filter UI ... */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search reference..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          {/* Category Filter */}
          <Select value={filters.type} onValueChange={setType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="payment">Rent Payments</SelectItem>
              <SelectItem value="withdrawal">Withdrawals</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={filters.status} onValueChange={setStatus}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="bg-white rounded-lg border">
        <DataTable
          data={data?.transactions || []}
          columns={paymentColumns}
          isLoading={isLoading}
          pagination={{
            pageIndex: filters.page,
            pageSize: filters.limit,
            totalPages: data?.pagination?.totalPages || 1,
            filteredCount: data?.pagination?.filteredCount || 0,
          }}
          setPage={setPage}
          setPageSize={setLimit}
          onSortChange={() => {}}
          meta={{
            onProcessWithdrawal: handleProcessClick,
          }}
        />
      </div>
      <WithdrawalModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmWithdrawal}
        isUpdating={processWithdrawalMutation.isPending}
      />
    </div>
  );
}
