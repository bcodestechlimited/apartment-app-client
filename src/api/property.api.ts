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
}

export const propertyService = new PropertyService();
