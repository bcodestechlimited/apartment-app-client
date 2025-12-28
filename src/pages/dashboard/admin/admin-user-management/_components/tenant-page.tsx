import React from "react";
import { DataTable } from "../../_component/data-table";
import { tenantColumns } from "./column-definition/tenant-columns";
import { useAdminTenants } from "@/hooks/admin/useAdminTenants";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TenantPage() {
  const {
    data,
    isLoading,
    isFetching,
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
            <SelectTrigger className="w-[150px]">
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
            <SelectTrigger className="w-[150px]">
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
          isLoading={isLoading || isFetching}
          pagination={pagination}
          setPage={setPage}
          setPageSize={setLimit}
          onSortChange={setSortBy}
        />
      </div>
    </div>
  );
}
