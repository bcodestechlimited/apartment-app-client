import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class PropertyService {
  addProperty = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/property`, payload, {});

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to add property");
    }
  };
  getProperty = async (propertyId: string) => {
    try {
      const response = await axiosInstance.get(`/property/${propertyId}`);

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get property");
    }
  };
  updateProperty = async (propertyId: string, payload: any) => {
    try {
      const response = await axiosInstance.patch(
        `/property/${propertyId}`,
        payload,
      );

      return response.data?.data?.property;
    } catch (error) {
      handleAxiosError(error, "Failed to update property");
    }
  };

  getProperties = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/property`, {
        params,
      });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get properties");
    }
  };

  getLandLordProperties = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/property/landlord`, {
        params,
      });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get properties");
    }
  };

  bookProperty = async (payload: {
    propertyId: string;
    moveInDate: string;
  }) => {
    try {
      const response = await axiosInstance.post(`/booking/request`, payload);

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to book property");
    }
  };

  adminUpdateProperty = async (propertyId: string, payload: any) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/property/${propertyId}`,
        payload,
      );

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Failed to update property");
    }
  };

  updatePropertyAvailability = async (
    propertyId: string,
    isAvailable: boolean,
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/property/landlord/update-availability`,
        {
          propertyId,
          isAvailable,
        },
      );

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to update property availability");
    }
  };

  softDeleteProperty = async (id: string) => {
    try {
      const response = await axiosInstance.delete(
        `/property/soft-delete/${id}`,
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to delete property");
    }
  };
}

export const propertyService = new PropertyService();
