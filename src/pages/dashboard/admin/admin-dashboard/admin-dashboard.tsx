import { useAdminProperties } from "@/hooks/admin/useAdminProperties";
import { propertyColumns } from "./_components/property-table-column";
import { DataTable } from "../_component/data-table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OccupancyChart } from "./_components/occupancy-chart";
import { RevenueChart } from "./_components/revenue-chart";
import { MetricCard } from "./_components/metric-card";
import { useOutletContext } from "react-router";

const typeOptions = [
  { label: "All Types", value: "All" },
  { label: "Short Let", value: "short-let" },
  { label: "Co-Working", value: "co-working-space" },
  { label: "Shared", value: "shared-apartment" },
  { label: "Serviced", value: "serviced-apartment" },
  { label: "Standard", value: "standard-rental" },
];

function AdminDashboard() {
  const {
    data,
    isLoading,
    localSearch,
    setLocalSearch,
    filters,
    setPage,
    setLimit,
    setSortBy,
    setPropertyType,
  } = useAdminProperties();

  const settings = useOutletContext();
  console.log({ settings });

  const pagination = {
    pageIndex: filters.page,
    pageSize: filters.limit,
    totalPages: data?.pagination?.totalPages || 1,
    filteredCount: data?.pagination?.filteredCount || 0,
  };

  const handleSortChange = (sortKey: string) => {
    setSortBy(sortKey);
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <div className="">
        <MetricCard data={data?.meta} />
      </div>

      {/* 2. Charts Row */}
      <div className="grid gap-6 lg:grid-cols-3 h-full">
        <div className="lg:col-span-2">
          <OccupancyChart />
        </div>
        <div className="lg-col-span-1">
          <RevenueChart />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Property Management</h2>
          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-8"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={filters.propertyType || "All"}
              onValueChange={(val) => setPropertyType(val === "All" ? "" : val)}
            >
              <SelectTrigger className="w-48 cursor-pointer">
                <SelectValue placeholder="Category " />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((opt) => (
                  <SelectItem
                    key={opt.value}
                    value={opt.value}
                    className="cursor-pointer"
                  >
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-md border">
          <DataTable
            data={data?.properties || []}
            columns={propertyColumns}
            isLoading={isLoading}
            pagination={pagination}
            setPage={setPage}
            setPageSize={setLimit}
            onSortChange={handleSortChange}
            meta={{ settings: settings }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
