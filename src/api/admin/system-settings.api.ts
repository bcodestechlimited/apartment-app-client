import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

export class SystemSettingsService {
  getSettings = async () => {
    try {
      const response = await axiosInstance.get(`/system-settings`);

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get report");
    }
  };
}

export const systemSettingsService = new SystemSettingsService();
