import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class AdminPropertyService {
  getProperties = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/admin/property`, {
        params,
      });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get properties");
    }
  };

  getPropertyById = async (propertyId: string) => {
    try {
      const response = await axiosInstance.get(`/property/${propertyId}`);

      return response.data?.data?.property;
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

  addProperty = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/property`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to add property");
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

  getLandlordPropertiesAdmin = async (landlordId: string, params: IParams) => {
    try {
      const response = await axiosInstance.get(
        `/admin/properties/${landlordId}`,
        {
          params,
        },
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get properties");
    }
  };
}

export const adminPropertyService = new AdminPropertyService();
