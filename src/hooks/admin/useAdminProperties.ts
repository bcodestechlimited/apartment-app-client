// src/hooks/admin/useAdminProperties.ts
import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { adminPropertyService } from "@/api/admin/admin-property.api";
// import { adminPropertyService } from "@/services/adminPropertyService";

export function useAdminProperties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const prevParamsRef = useRef(searchParams.toString());

  // Derive state from URL
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const propertyType = searchParams.get("propertyType") || "";
  const sortBy = searchParams.get("sort") || "";
  // Local search state for immediate UI feedback before debounce
  const [localSearch, setLocalSearch] = useState(search);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "admin-properties",
      { page, limit, search, propertyType, sortBy },
    ],
    queryFn: () =>
      adminPropertyService.getProperties({
        page,
        limit,
        search, // The backend expects title for search
        propertyType,
        sort: sortBy,
      }),
  });

  // Sync local search with URL if URL changes externally (e.g., back button)
  useEffect(() => {
    if (search !== localSearch) {
      setLocalSearch(search);
    }
  }, [search]);

  // Update URL helpers
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

  // Debounce search input
  useEffect(() => {
    if (localSearch === search) return;
    const handler = setTimeout(() => {
      updateParams({ search: localSearch, page: 1 });
    }, 500);
    return () => clearTimeout(handler);
  }, [localSearch, search, updateParams]);

  return {
    data,
    isLoading,
    isFetching,
    localSearch,
    setLocalSearch,
    filters: { propertyType, page, limit },
    setPage: (p: number) => updateParams({ page: p }),
    setLimit: (l: number) => updateParams({ limit: l, page: 1 }),
    setPropertyType: (t: string) => updateParams({ propertyType: t, page: 1 }),
    setSortBy: (s: string) => updateParams({ sort: s, page: 1 }),
  };
}
