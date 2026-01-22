import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class ContactUsService {
  async contactUs(data: any) {
    try {
      const response = await axiosInstance.post(`/contact-us`, data);
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Unable to contact us");
    }
  }
}

export const contactUsService = new ContactUsService();
