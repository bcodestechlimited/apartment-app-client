/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class FavouriteService {
  // Create favourite
  async createFavourite(propertyId: string) {
    try {
      const response = await axiosInstance.post(`/save-properties`, {
        propertyId,
      });
      console.log("create favourite api", response.data?.data);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to favourite property");
    }
  }

  // Delete favourite (propertyId only, user comes from token)
  async deleteFavourite(propertyId: string) {
    try {
      const response = await axiosInstance.delete(
        `/save-properties/remove/${propertyId}`
      );
      console.log("delete favourite api", response.data?.data);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to remove favourite");
    }
  }
  // Get logged-in user's favourites
  async getUserFavourites() {
    try {
      const response = await axiosInstance.get("/save-properties/user");
      console.log("user favourites api", response.data?.data);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get your favourites");
    }
  }
}

export const favouriteService = new FavouriteService();
