import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class PropertyService {
  addProperty = async (payload: any) => {
    console.log({ payload });

    try {
      const response = await axiosInstance.post(`/property`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to add property");
    }
  };
  getProperty = async (propertyId: string) => {
    try {
      const response = await axiosInstance.get(`/property/${propertyId}`);

      console.log({ response });

      return response.data?.data?.property;
    } catch (error) {
      handleAxiosError(error, "Unable to get property");
    }
  };
  updateProperty = async (propertyId: string, payload: any) => {
    console.log({ payload });

    try {
      const response = await axiosInstance.patch(
        `/property/${propertyId}`,
        payload
      );

      console.log({ response });

      return response.data?.data?.property;
    } catch (error) {
      handleAxiosError(error, "Failed to update property");
    }
  };

  getProperties = async (params: IParams) => {
    // console.log({ params });

    try {
      const response = await axiosInstance.get(`/property`, {
        params,
      });

      // console.log({ response });

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

      // console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get properties");
    }
  };

  bookProperty = async (payload: {
    propertyId: string;
    moveInDate: string;
  }) => {
    console.log({ payload });

    try {
      const response = await axiosInstance.post(`/booking/request`, payload);

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to book property");
    }
  };

  //Admin
  adminUpdateProperty = async (propertyId: string, payload: any) => {
    console.log({ payload });

    try {
      const response = await axiosInstance.patch(
        `/admin/property/${propertyId}`,
        payload
      );

      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Failed to update property");
    }
  };
}

export const propertyService = new PropertyService();
