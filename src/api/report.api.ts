import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

export class ReportService {
  async createReport(reportedUser: string, payload: any) {
    console.log(" create report", reportedUser, payload);
    try {
      const response = await axiosInstance.post(`/report`, {
        reportedUser,
        ...payload,
      });
      console.log({ response });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to create report");
    }
  }
}

export const reportService = new ReportService();
