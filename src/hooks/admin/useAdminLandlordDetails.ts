// src/hooks/admin/useAdminLandlordDetails.ts
import { useCallback } from "react";
import { useSearchParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUserManagementService } from "@/api/admin/admin-user-management";
import { adminPropertyService } from "@/api/admin/admin-property.api"; // Service for properties
import { adminReportService } from "@/api/admin/admin-report.api";
import { toast } from "sonner";
import { adminBookingService } from "@/api/admin/admin-booking.api";
import type { fi } from "date-fns/locale";
import { adminDocumentsService } from "@/api/admin/admin-documents.api";

export function useAdminLandlordDetails(landlordId: string | undefined) {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  // Namespaced Params
  const pPage = Number(searchParams.get("pPage")) || 1; // Property Page
  const pLimit = Number(searchParams.get("pLimit")) || 5;
  const rPage = Number(searchParams.get("rPage")) || 1; // Report Page
  const rLimit = Number(searchParams.get("rLimit")) || 5;

  // 1. Fetch Landlord Profile & Metrics
  const profileQuery = useQuery({
    queryKey: ["landlord-profile", landlordId],
    queryFn: () => adminUserManagementService.getLandlord(landlordId!),
    enabled: !!landlordId,
  });

  //   console.log("profileQuery", profileQuery?.data);

  const bookingStatsQuery = useQuery({
    queryKey: ["landlord-booking-stats", landlordId],
    queryFn: () => adminBookingService.getLandlordBookingStats(landlordId!),
    enabled: !!landlordId,
  });

  // console.log("bookingStatsQuery", bookingStatsQuery?.data);

  // 2. Fetch Listed Properties (Independent)
  const propertiesQuery = useQuery({
    queryKey: ["landlord-properties", landlordId, pPage, pLimit],
    queryFn: () =>
      adminPropertyService.getLandlordPropertiesAdmin(landlordId!, {
        page: pPage,
        limit: pLimit,
      }),
    enabled: !!landlordId,
  });

  const documentQuery = useQuery({
    queryKey: ["tenant-documents", landlordId],
    queryFn: () => adminDocumentsService.getDocumentByUserId(landlordId!),
    enabled: !!landlordId,
  });

  // console.log(" propertiesQuery", propertiesQuery.data);

  // 3. Fetch Flags/Reports (Independent)
  const reportsQuery = useQuery({
    queryKey: ["landlord-reports", landlordId, rPage, rLimit],
    queryFn: () =>
      adminReportService.getReport(landlordId!, { page: rPage, limit: rLimit }),
    enabled: !!landlordId,
  });

  const updateTableParam = useCallback(
    (updates: Record<string, string | number | null>) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === "") next.delete(key);
            else next.set(key, String(value));
          });
          return next;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return {
    landlord: profileQuery.data,
    paymentMetrics: bookingStatsQuery.data || [],
    isLoadingProfile: profileQuery.isLoading,
    documents: documentQuery.data || [],
    // Properties Table
    properties: propertiesQuery.data?.properties || [],
    propertyPagination: {
      pageIndex: pPage,
      pageSize: pLimit,
      totalPages: propertiesQuery.data?.pagination?.totalPages || 1,
      filteredCount: propertiesQuery.data?.pagination?.filteredCount || 0,
    },
    isFetchingProperties: propertiesQuery.isFetching,
    setPropertyPage: (p: number) => updateTableParam({ pPage: p }),
    setPropertyLimit: (l: number) => updateTableParam({ pLimit: l, pPage: 1 }),

    // Reports Table
    reports: reportsQuery.data?.data || [],
    reportPagination: {
      pageIndex: rPage,
      pageSize: rLimit,
      totalPages: reportsQuery.data?.pagination?.totalPages || 1,
      filteredCount: reportsQuery.data?.pagination?.filteredCount || 0,
    },
    isFetchingReports: reportsQuery.isFetching,
    setReportPage: (p: number) => updateTableParam({ rPage: p }),
    setReportLimit: (l: number) => updateTableParam({ rLimit: l, rPage: 1 }),
  };
}
