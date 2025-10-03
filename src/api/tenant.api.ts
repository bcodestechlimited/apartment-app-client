import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class TenantService {
  getLandlordTenants = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/tenants/landlord`, {
        params,
      });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get tenants");
    }
  };

  getAllTenants = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/tenants`, {
        params,
      });

      console.log({ data: response.data });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get tenants");
    }
  };
}

export const tenantService = new TenantService();
