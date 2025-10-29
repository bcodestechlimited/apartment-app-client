import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
// endpoint that landlord will use to rate tenant
class LandlordRatingService {
  async createTenantRating(payload: any) {
    try {
      const response = await axiosInstance.post(`/landlord-rating`, payload);
      console.log({ response });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to add property");
    }
  }
}

export const landlordRatingService = new LandlordRatingService();
