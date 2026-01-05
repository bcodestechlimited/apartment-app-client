/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
// endpoint that tenant will use to rate landlords
class TenantRatingService {
  async createRating(payload: any) {
    try {
      const response = await axiosInstance.post(`/tenant-rating`, payload);
      console.log({ response });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to rate landlord ");
    }
  }
}

export const tenantRatingService = new TenantRatingService();
