/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
// endpoint that landlord will use to rate tenant
class LandlordRatingService {
  async createRating(payload: any) {
    try {
      const response = await axiosInstance.post(`/landlord-rating`, payload);
      console.log({ response });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to rate landlord");
    }
  }
}

export const landlordRatingService = new LandlordRatingService();
