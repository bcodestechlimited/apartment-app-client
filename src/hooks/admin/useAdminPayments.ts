// src/hooks/admin/useAdminPayments.ts
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { adminPaymentsService } from "@/api/admin/admin-payments.api";

export function useAdminPayments() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";
  const [localSearch, setLocalSearch] = useState(search);
  const type = searchParams.get("type") || "all"; // NEW

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["admin-payments", { page, limit, search, status, type }],
    queryFn: () =>
      adminPaymentsService.getPaymentsOverview({
        page,
        limit,
        search,
        status,
        transactionType: type,
      }),
  });

  const updateParams = useCallback(
    (newParams: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(newParams).forEach(([key, value]) => {
        if (!value || value === "all") params.delete(key);
        else params.set(key, String(value));
      });
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    const handler = setTimeout(
      () => updateParams({ search: localSearch, page: 1 }),
      500
    );
    return () => clearTimeout(handler);
  }, [localSearch]);

  return {
    data,
    isLoading,
    isFetching,
    localSearch,
    setLocalSearch,
    filters: { page, limit, status, type },
    setPage: (p: number) => updateParams({ page: p }),
    setLimit: (l: number) => updateParams({ limit: l, page: 1 }),
    setStatus: (s: string) => updateParams({ status: s, page: 1 }),
    setType: (t: string) => updateParams({ type: t, page: 1 }),
  };
}
