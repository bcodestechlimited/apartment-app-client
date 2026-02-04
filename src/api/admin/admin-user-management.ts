import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

export class AdminUserManagementService {
  getTenants = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/admin/tenants`, {
        params,
      });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get tenants");
    }
  };

  getTenantById = async (tenantId: string) => {
    try {
      const response = await axiosInstance.get(`/admin/tenant/${tenantId}`);
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
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get landlords");
    }
  };

  getLandlord = async (landlordId: string) => {
    try {
      const response = await axiosInstance.get(`/admin/landlord/${landlordId}`);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get landlord");
    }
  };

  updateUser = async (userId: string, data: any) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/users/${userId}`,
        data,
      );
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Unable to update user");
    }
  };
}

export const adminUserManagementService = new AdminUserManagementService();
