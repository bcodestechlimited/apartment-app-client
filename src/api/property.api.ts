import type { IProperty } from "@/interfaces/property.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class PropertyService {
  addProperty = async (payload: IProperty) => {
    try {
      const response = await axiosInstance.post(`/property`, payload);

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to add property");
    }
  };
}

export const propertyService = new PropertyService();
