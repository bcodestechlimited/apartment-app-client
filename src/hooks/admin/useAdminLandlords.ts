// src/hooks/admin/useAdminLandlords.ts
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { adminUserManagementService } from "@/api/admin/admin-user-management";

export function useAdminLandlords() {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- 1. Derive state from URL ---
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sort") || "";
  const status = searchParams.get("status") || ""; // Added status
  // Local state for immediate typing feedback
  const [localSearch, setLocalSearch] = useState(search);

  // --- 2. Fetch Data ---
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["admin-landlords", { page, limit, search, sortBy, status }],
    queryFn: () =>
      adminUserManagementService.getLandlords({
        page,
        limit,
        search,
        sort: sortBy,
        status,
      }),
  });

  // --- 3. URL Update Helper ---
  const updateParams = useCallback(
    (newParams: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === "") params.delete(key);
        else params.set(key, String(value));
      });
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // --- 4. Search Debounce & Sync ---
  useEffect(() => {
    if (localSearch === search) return;
    const handler = setTimeout(() => {
      updateParams({ search: localSearch, page: 1 });
    }, 500);
    return () => clearTimeout(handler);
  }, [localSearch, search, updateParams]);

  useEffect(() => {
    if (search !== localSearch) setLocalSearch(search);
  }, [search]);

  return {
    data,
    isLoading,
    isFetching,
    localSearch,
    setLocalSearch,
    currentState: { page, limit, sortBy, status },
    setPage: (p: number) => updateParams({ page: p }),
    setLimit: (l: number) => updateParams({ limit: l, page: 1 }),
    setSortBy: (s: string) => updateParams({ sort: s, page: 1 }),
    setStatus: (s: string) => updateParams({ status: s, page: 1 }),
  };
}
