import DataTable from "@/components/custom/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpNarrowWide,
  Ellipsis,
  FileWarning,
  ScanEye,
  Star,
} from "lucide-react";

export default function Tenants() {
  const tenantsList = [
    {
      id: 1,
      name: "John Doe",
      verification: true,
      property: "Sunset Villa",
      duration: "2025-06-10 - 2025-06-15",
      status: "Confirmed",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Jane Smith",
      verification: false,
      property: "Ocean Breeze",
      duration: "2025-06-12 - 2025-06-18",
      status: "Pending",
      rating: null,
    },
    {
      id: 3,
      name: "Mark Johnson",
      verification: true,
      property: "Mountain Retreat",
      duration: "2025-06-20 - 2025-06-25",
      status: "Cancelled",
      rating: 3.0,
    },
    {
      id: 4,
      name: "Emily Brown",
      verification: true,
      property: "City Loft",
      duration: "2025-07-01 - 2025-07-05",
      status: "Confirmed",
      rating: 5.0,
    },
    {
      id: 5,
      name: "Michael Lee",
      verification: false,
      property: "Lakeside Cabin",
      duration: "2025-07-10 - 2025-07-15",
      status: "Pending",
      rating: null,
    },
  ];

  const columns = [
    {
      header: "Tenant Name",
      render: (row: any) => row.name || "N/A",
    },
    {
      header: "Verified",
      render: (row: any) => (row.verification ? "Verified" : "Unverified"),
    },
    {
      header: "Property",
      render: (row: any) => row.property || "N/A",
    },
    {
      header: "Duration",
      render: (row: any) => row.duration || "N/A",
    },
    {
      header: "Status",
      render: (row: any) => row.status || "N/A",
    },
    {
      header: "Rating",
      render: (row: any) => (row.rating !== null ? row.rating : "—"),
    },
    {
      header: "",
      render: (row: any) => (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-6">
              <DropdownMenuItem>
                <ScanEye /> Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star /> Rate Tenant
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileWarning /> Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Tenant Management</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <span className="border rounded px-2 py-1 text-custom-primary flex items-center gap-2">
              <ArrowUpNarrowWide size={16} />
              Sort By
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4">
            <DropdownMenuItem>Current Tenants</DropdownMenuItem>
            <DropdownMenuItem>Past Tenents</DropdownMenuItem>
            <DropdownMenuItem>Property name</DropdownMenuItem>
            <DropdownMenuItem>Booking Status</DropdownMenuItem>
            <DropdownMenuItem>Verification Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DataTable columns={columns} data={tenantsList} />
    </div>
  );
}
