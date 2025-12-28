import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

export class AdminBookingService {
  getTenantBookings = async (userId: string, params: IParams) => {
    try {
      const response = await axiosInstance.get(
        `/admin/bookings/user/${userId}`,
        {
          params,
        }
      );
      //   console.log("admin-tenant-bookings", response.data);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get booking requests");
    }
  };

  getLandlordBookingStats = async (landlordId: string) => {
    try {
      const response = await axiosInstance.get(
        `/admin/bookings/${landlordId}/stats`
      );
      // console.log("admin-tenant-bookings-stats", response.data);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get booking stats");
    }
  };

  getTenantBookingStats = async (tenantId: string) => {
    try {
      const response = await axiosInstance.get(
        `/admin/bookings/tenant/${tenantId}/stats`
      );
      console.log("admin-tenant-bookings-stats", response.data);
      return response.data.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get booking stats");
    }
  };
}

export const adminBookingService = new AdminBookingService();
