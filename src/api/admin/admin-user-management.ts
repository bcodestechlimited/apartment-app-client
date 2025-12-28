import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

export class AdminUserManagementService {
  getTenants = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/admin/tenants`, {
        params,
      });

      //   console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get tenants");
    }
  };

  getTenantById = async (tenantId: string) => {
    try {
      const response = await axiosInstance.get(`/admin/tenant/${tenantId}`);
      //   console.log("tenant-response", response.data);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get tenant");
    }
  };

  getLandlords = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/admin/landlords`, {
        params,
      });
      //   console.log({ response });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get landlords");
    }
  };

  getLandlord = async (landlordId: string) => {
    try {
      const response = await axiosInstance.get(`/admin/landlord/${landlordId}`);
      //   console.log("landlord-response", response.data);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get landlord");
    }
  };
}

export const adminUserManagementService = new AdminUserManagementService();
