// src/hooks/admin/useAdminTenants.ts
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { adminUserManagementService } from "@/api/admin/admin-user-management";

export function useAdminTenants() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Derive state from URL
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort") || "";

  // New Filters
  const status = searchParams.get("status") || "";
  const isVerified = searchParams.get("isVerified") || "";

  // Local search state for immediate UI feedback
  const [localSearch, setLocalSearch] = useState(search);

  // 2. Fetch Data
  const { data, isLoading } = useQuery({
    queryKey: [
      "admin-tenants",
      { page, limit, search, sortBy, status, isVerified },
    ],
    queryFn: () =>
      adminUserManagementService.getTenants({
        page,
        limit,
        search,
        sort: sortBy,
        status, // Corresponds to paymentStatus in backend
        isVerified, // Corresponds to isDocumentVerified in backend
      }),
  });

  // 3. Update URL Helper
  const updateParams = useCallback(
    (newParams: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });
      setSearchParams(params);
    },
    [searchParams, setSearchParams]
  );

  // 4. Debounce Search
  useEffect(() => {
    if (localSearch === search) return;
    const handler = setTimeout(() => {
      updateParams({ search: localSearch, page: 1 });
    }, 500);
    return () => clearTimeout(handler);
  }, [localSearch, search, updateParams]);

  // 5. Sync local search if URL changes (e.g. back button)
  useEffect(() => {
    if (search !== localSearch) {
      setLocalSearch(search);
    }
  }, [search]);

  return {
    data,
    isLoading,
    localSearch,
    setLocalSearch,
    currentState: { page, limit, sortBy, status, isVerified },
    setPage: (p: number) => updateParams({ page: p }),
    setLimit: (l: number) => updateParams({ limit: l, page: 1 }),
    setSortBy: (s: string) => updateParams({ sort: s, page: 1 }),
    // New setter functions for UI components
    setStatus: (s: string) => updateParams({ status: s, page: 1 }),
    setIsVerified: (v: string) => updateParams({ isVerified: v, page: 1 }),
  };
}
