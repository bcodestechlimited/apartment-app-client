import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

export class AdminReportService {
  getReport = async (reportedUser: string, params: IParams) => {
    try {
      const response = await axiosInstance.get(
        `/admin/report/${reportedUser}`,
        {
          params,
        },
      );

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get report");
    }
  };

  updateReport = async (reportedUser: string, payload: any) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/report/${reportedUser}`,
        payload,
      );

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Unable to update report");
    }
  };
}

export const adminReportService = new AdminReportService();
