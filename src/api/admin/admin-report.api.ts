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
        }
      );
      //   console.log("report response", response?.data);

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get report");
    }
  };
}

export const adminReportService = new AdminReportService();
