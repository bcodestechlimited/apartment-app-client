/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
// endpoint that landlord will use to rate tenant
class PropertyRatingService {
  async createPropertyRating(payload: any) {
    try {
      const response = await axiosInstance.post(`/property-rating`, payload);
      console.log({ response });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to rate property");
    }
  }
  async getPropertyRatingById(propertyId: string) {
    try {
      const response = await axiosInstance.get(
        `/property-rating/${propertyId}`
      );
      console.log("property rating by id api", response.data?.data);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get property rating");
    }
  }
}

export const propertyRatingService = new PropertyRatingService();
