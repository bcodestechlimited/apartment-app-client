import { tenantService } from "@/api/tenant.api";
import type { IParams } from "@/interfaces/query.interface";
import { useQuery } from "@tanstack/react-query";

export const useTenants = (params: IParams) => {
  return useQuery({
    queryKey: ["tenants", params],
    queryFn: () => tenantService.getAllTenants(params),
  });
};
