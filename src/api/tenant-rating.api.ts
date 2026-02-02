import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
class TenantRatingService {
  async createRating(payload: any) {
    try {
      const response = await axiosInstance.post(`/tenant-rating`, payload);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to rate landlord ");
    }
  }
}

export const tenantRatingService = new TenantRatingService();
