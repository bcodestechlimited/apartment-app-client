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
  getProperties = async (params: IParams) => {
    console.log({ params });

    try {
      const response = await axiosInstance.get(`/property`, {
        params,
      });

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get properties");
    }
  };
  getLandLordProperties = async (params: IParams) => {
    console.log({ params });

    try {
      const response = await axiosInstance.get(`/property`, {
        params,
      });

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get properties");
    }
  };
}

export const propertyService = new PropertyService();
