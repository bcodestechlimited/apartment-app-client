import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class AdminPropertyService {
  getProperties = async (params: IParams) => {
    console.log({ params });

    try {
      const response = await axiosInstance.get(`/admin/property`, {
        params,
      });

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get properties");
    }
  };
  getPropertyById = async (propertyId: string) => {
    try {
      const response = await axiosInstance.get(`/property/${propertyId}`);

      console.log({ response });

      return response.data?.data?.property;
    } catch (error) {
      handleAxiosError(error, "Unable to get property");
    }
  };

  //Testing

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
}

export const adminPropertyService = new AdminPropertyService();
