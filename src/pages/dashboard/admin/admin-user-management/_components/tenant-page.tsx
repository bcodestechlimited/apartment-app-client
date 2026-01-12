import React from "react";
import { DataTable } from "../../_component/data-table";
import { tenantColumns } from "./column-definition/tenant-columns";
import { useAdminTenants } from "@/hooks/admin/useAdminTenants";
import { Input } from "@/components/ui/input";
import { Loader, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { adminUserManagementService } from "@/api/admin/admin-user-management";

export function TenantPage() {
  const {
    data,
    isLoading,
    localSearch,
    setLocalSearch,
    currentState,
    setPage,
    setLimit,
    setSortBy,
    setStatus, // New
    setIsVerified, // New
  } = useAdminTenants();

  // Extract pagination and data
  const tenants = data?.tenants || [];
  const pagination = {
    pageIndex: currentState.page,
    pageSize: currentState.limit,
    totalPages: data?.pagination?.totalPages || 1,
    filteredCount: data?.pagination?.filteredCount || 0,
  };

  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      adminUserManagementService.updateUser(id, data),
    onSuccess: (res) => {
      toast.success(res?.message || "User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-tenants"] });
    },
    onError: (err: any) => toast.error(err.message || "Suspension failed"),
  });

  const handleVerify = (id: string, currentStatus: boolean) => {
    updateUserMutation.mutate({
      id,
      data: { isDocumentVerified: !currentStatus },
    });
  };

  const handleSuspend = (id: string, currentStatus: boolean) => {
    updateUserMutation.mutate({ id, data: { isActive: !currentStatus } });
  };

  return (
    <div className="space-y-4">
      {/* Search Controls */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tenants by name or email..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filters Section */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Payment Status Filter */}
          {/* Payment Status Filter */}
          <Select
            value={currentState.status || "all"}
            onValueChange={(val) => setStatus(val === "all" ? "" : val)} // Reset to empty string if "all"
          >
            <SelectTrigger className="w-37.5 cursor-pointer">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Cleared">Cleared</SelectItem>
              <SelectItem value="Outstanding">Outstanding</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>

          {/* Verification Status Filter */}
          <Select
            value={currentState.isVerified || "all"}
            onValueChange={(val) => setIsVerified(val === "all" ? "" : val)} // Reset to empty string if "all"
          >
            <SelectTrigger className="w-37.5">
              <SelectValue placeholder="Verification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Verification</SelectItem>
              <SelectItem value="true">Verified</SelectItem>
              <SelectItem value="false">Unverified</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <DataTable
          data={tenants}
          columns={tenantColumns}
          isLoading={isLoading}
          pagination={pagination}
          setPage={setPage}
          setPageSize={setLimit}
          onSortChange={setSortBy}
          meta={{
            onVerify: handleVerify,
            onSuspend: handleSuspend,
          }}
        />
      </div>
    </div>
  );
}
