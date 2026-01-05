// src/hooks/admin/useAdminTenantDetails.ts
import { useCallback } from "react";
import { useSearchParams } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminUserManagementService } from "@/api/admin/admin-user-management";
import { adminBookingService } from "@/api/admin/admin-booking.api";
import { adminReportService } from "@/api/admin/admin-report.api";
import { fi, te } from "date-fns/locale";
import { adminDocumentsService } from "@/api/admin/admin-documents.api";

export function useAdminTenantDetails(tenantId: string | undefined) {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- 1. Namespaced Search Params ---
  const bPage = Number(searchParams.get("bPage")) || 1;
  const bLimit = Number(searchParams.get("bLimit")) || 5;
  const rPage = Number(searchParams.get("rPage")) || 1;
  const rLimit = Number(searchParams.get("rLimit")) || 5;

  // --- 2. Independent Query: Basic Profile & Metrics ---
  const profileQuery = useQuery({
    queryKey: ["tenant-profile", tenantId],
    queryFn: () => adminUserManagementService.getTenantById(tenantId as string),
    enabled: !!tenantId,
  });

  const bookingStatsQuery = useQuery({
    queryKey: ["tenant-bookings-stats", tenantId],
    queryFn: () =>
      adminBookingService.getTenantBookingStats(tenantId as string),
    enabled: !!tenantId,
  });

  // console.log("bookingstatsquery", bookingStatsQuery.data);

  // --- 3. Independent Query: Booking History ---
  const bookingsQuery = useQuery({
    queryKey: ["tenant-bookings", tenantId, bPage, bLimit],
    queryFn: () =>
      adminBookingService.getTenantBookings(tenantId!, {
        page: bPage,
        limit: bLimit,
      }),
    enabled: !!tenantId,
  });
  //   console.log("bookingsQuery", bookingsQuery?.data);
  // --- 4. Independent Query: Flags/Reports ---
  const reportsQuery = useQuery({
    queryKey: ["tenant-reports", tenantId, rPage, rLimit],
    queryFn: () =>
      adminReportService.getReport(tenantId!, {
        page: rPage,
        limit: rLimit,
      }),
    enabled: !!tenantId,
  });

  const documentQuery = useQuery({
    queryKey: ["tenant-documents", tenantId],
    queryFn: () => adminDocumentsService.getDocumentByUserId(tenantId!),
    enabled: !!tenantId,
  });
  // console.log("documentQuery", documentQuery?.data);

  // --- 5. URL Update Helper ---
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
    tenant: profileQuery.data,
    paymentMetrics: bookingStatsQuery.data || [],
    isLoadingProfile: profileQuery.isLoading,

    documents: documentQuery.data || [],

    // Booking Table
    bookings: bookingsQuery.data?.bookings || [],
    bookingPagination: {
      pageIndex: bPage,
      pageSize: bLimit,
      totalPages: bookingsQuery.data?.pagination?.totalPages || 1,
      filteredCount: bookingsQuery.data?.pagination?.filteredCount || 0,
    },
    isFetchingBookings: bookingsQuery.isFetching,
    setBookingPage: (p: number) => updateTableParam({ bPage: p }),
    setBookingLimit: (l: number) => updateTableParam({ bLimit: l, bPage: 1 }), // Fixed: Update limit and reset to page 1

    // Report Table
    reports: reportsQuery.data?.reports || [],
    reportPagination: {
      pageIndex: rPage,
      pageSize: rLimit,
      totalPages: reportsQuery.data?.pagination?.totalPages || 1,
      filteredCount: reportsQuery.data?.pagination?.filteredCount || 0,
    },
    isFetchingReports: reportsQuery.isFetching,
    setReportPage: (p: number) => updateTableParam({ rPage: p }),
    setReportLimit: (l: number) => updateTableParam({ rLimit: l, rPage: 1 }), // Fixed: Update limit and reset to page 1
  };
}
