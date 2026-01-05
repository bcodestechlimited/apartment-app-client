// // LandlordView.tsx
// import React from "react";
// import {
//   landlordColumns,
//   type Landlord,
// } from "./column-definition/landlord-columns";
// import { Button } from "@/components/ui/button";
// import { ChevronDown } from "lucide-react";
// import { DataTable } from "../../_component/data-table";

// // --- Placeholder Data based on USERS(LANDLORDS).png ---
// const mockLandlordData: Landlord[] = [
//   {
//     id: "l1",
//     name: "Chiamaka Eze",
//     email: "chi.ezee@email.com",
//     phone: "0803 123 4567",
//     propertiesListed: 12,
//     earnings: 8500000,
//     agentsAssigned: 3,
//     status: "Verified",
//   },
//   {
//     id: "l2",
//     name: "Tunde Balogun",
//     email: "chi.ezee@email.com",
//     phone: "0803 123 4567",
//     propertiesListed: 7,
//     earnings: 8500000,
//     agentsAssigned: 2,
//     status: "Pending",
//   },
//   {
//     id: "l3",
//     name: "Mary Okafor",
//     email: "chi.ezee@email.com",
//     phone: "0803 123 4567",
//     propertiesListed: 20,
//     earnings: 8500000,
//     agentsAssigned: 5,
//     status: "Failed",
//   },
//   {
//     id: "l4",
//     name: "Ahmed Musa",
//     email: "chi.ezee@email.com",
//     phone: "0803 123 4567",
//     propertiesListed: 4,
//     earnings: 8500000,
//     agentsAssigned: 1,
//     status: "Verified",
//   },
//   {
//     id: "l5",
//     name: "Ifeoma Nwachukwu",
//     email: "chi.ezee@email.com",
//     phone: "0803 123 4567",
//     propertiesListed: 10,
//     earnings: 8500000,
//     agentsAssigned: 3,
//     status: "Verified",
//   },
// ];

// export function LandlordPage() {
//   // This is where you would place specific filter UI if Landlords needed a custom dropdown
//   const customLandlordFilters = (
//     <Button variant="outline">
//       Filter by: Status <ChevronDown className="h-4 w-4 ml-1" />
//     </Button>
//   );

//   return (
//     <DataTable
//       data={mockLandlordData}
//       columns={landlordColumns}
//       // You can optionally pass custom filters here if needed:
//       // customFilterUi={customLandlordFilters}
//     />
//   );
// }

// src/pages/admin/user-management/LandlordPage.tsx
import React from "react";
import { DataTable } from "../../_component/data-table";
import { landlordColumns } from "./column-definition/landlord-columns";
import { useAdminLandlords } from "@/hooks/admin/useAdminLandlords";
import { Input } from "@/components/ui/input";
import { Loader, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminUserManagementService } from "@/api/admin/admin-user-management";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function LandlordPage() {
  const {
    data,
    isLoading,
    localSearch,
    setLocalSearch,
    currentState,
    setPage,
    setLimit,
    setSortBy,
    setStatus,
  } = useAdminLandlords();

  // Map API response to table props
  const landlords = data?.landlords || [];
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
      queryClient.invalidateQueries({ queryKey: ["admin-landlords"] });
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
      {/* Search Header */}
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search landlords by name or email..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Filter UI */}
        <div className="flex items-center gap-2">
          <Select
            value={currentState.status || "all"}
            onValueChange={(val) => setStatus(val === "all" ? "" : val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Landlords</SelectItem>
              <SelectItem value="Verified">Verified</SelectItem>
              <SelectItem value="Unverified">Unverified</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Paginated Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <DataTable
          data={landlords}
          columns={landlordColumns}
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
