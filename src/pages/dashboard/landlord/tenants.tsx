import DataTable from "@/components/custom/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpNarrowWide,
  Ellipsis,
  FileWarning,
  ScanEye,
  Star,
} from "lucide-react";
import { useState } from "react";
import TenantProfile from "../tenant/_components/tenant-profile";
import TenantRating from "../tenant/_components/tenant-rating";
import ReportTenant from "../tenant/_components/report-tenant";
import { useQuery } from "@tanstack/react-query";
import { tenantService } from "@/api/tenant.api";
import { useSearchParams } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "../shared/_components/pagination";

export default function Tenants() {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  // Default to "all" if no filter is set so the Select shows the right text
  const currentFilter = searchParams.get("filter") || "all";

  const openProfileModal = (tenant: any) => {
    setSelectedTenant(tenant);
    setIsProfileModalOpen(true);
  };
  const closeProfileModal = () => setIsProfileModalOpen(false);

  const openRatingModal = (tenant: any) => {
    setSelectedTenant(tenant);
    setIsRatingModalOpen(true);
  };
  const closeRatingModal = () => setIsRatingModalOpen(false);

  const openReportModal = (tenant: any) => {
    setSelectedTenant(tenant);
    setIsReportModalOpen(true);
  };
  const closeReportModal = () => setIsReportModalOpen(false);

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    // If "all" is selected, we remove the filter param to reset
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.set("page", "1"); // Reset to page 1 on filter change
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { data, isLoading } = useQuery({
    queryKey: ["landlord-tenants", { page, limit, filter: currentFilter }],
    queryFn: () =>
      tenantService.getLandlordTenants({
        page,
        limit,
        // Pass empty string if filter is 'all' so backend knows to fetch everything
        filter: currentFilter === "all" ? "" : currentFilter,
      }),
  });

  const pagination = data?.pagination;

  const columns = [
    {
      header: "Tenant Name",
      render: (row: any) =>
        row?.user?.firstName + " " + row?.user?.lastName || "N/A",
    },
    {
      header: "Verification Status",
      render: (row: any) => {
        let status = row.user.isDocumentVerified;
        if (status) {
          status = "verified";
        }
        if (!status) {
          status = "unverified";
        }

        const classNames: Record<string, string> = {
          verified:
            "text-green-500 bg-green-100 px-4 py-1 rounded-full capitalize",
          unverified:
            "text-red-500 bg-red-100 px-4 py-1 rounded-full capitalize",
        };

        const fullClassName =
          classNames[status] + " py-1 rounded-full capitalize";

        return <span className={fullClassName}>{status}</span>;
      },
    },
    {
      header: "Property",
      render: (row: any) => row?.property?.title || "N/A",
    },
    {
      header: "Rating",
      render: (row: any) => {
        const rating = row.user?.averageRating || 0;
        return `${rating}/5`;
      },
    },
    {
      header: "",
      render: (row: any) => (
        <div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="cursor-pointer">
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-6">
              <DropdownMenuItem onClick={() => openProfileModal(row?.user)}>
                <ScanEye /> Profile
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => openRatingModal(row?.user)}>
                <Star /> Rate Tenant
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => openReportModal(row?.user)}>
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

        <div className="space-y-4">
          <Select
            value={currentFilter}
            onValueChange={(val) => handleFilterChange("filter", val)}
          >
            <SelectTrigger className="w-[200px]">
              <ArrowUpNarrowWide size={16} />
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {/* Added 'all' option to reset filters */}
              <SelectItem value="all">All Tenants</SelectItem>
              <SelectItem value="current">Current Tenants</SelectItem>
              <SelectItem value="past">Past Tenants</SelectItem>
              <SelectItem value="property">Property name</SelectItem>
              <SelectItem value="status">Booking Status</SelectItem>
              <SelectItem value="verified">Verification Status</SelectItem>
            </SelectContent>
          </Select>

          {/* Button removed here */}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data?.tenants || []}
        isLoading={isLoading}
      />

      <div className=" pt-6">
        {pagination && (
          <Pagination
            currentPage={page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {selectedTenant && isProfileModalOpen && (
        <TenantProfile
          tenant={selectedTenant}
          isOpen={isProfileModalOpen}
          closeModal={closeProfileModal}
          openRatingModal={(tenant) => {
            closeProfileModal();
            openRatingModal(tenant);
          }}
          openReportModal={(tenant) => {
            closeProfileModal();
            openReportModal(tenant);
          }}
        />
      )}

      {selectedTenant && isRatingModalOpen && (
        <TenantRating
          tenant={selectedTenant}
          isOpen={isRatingModalOpen}
          closeModal={closeRatingModal}
        />
      )}

      {selectedTenant && isReportModalOpen && (
        <ReportTenant
          isOpen={isReportModalOpen}
          closeModal={closeReportModal}
          reportedUser={selectedTenant?._id}
        />
      )}
    </div>
  );
}
