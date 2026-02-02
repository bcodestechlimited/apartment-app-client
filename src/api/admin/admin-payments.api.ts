import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

export class AdminPaymentsService {
  async getPaymentsOverview(query: IParams) {
    try {
      const response = await axiosInstance.get(`/admin/transactions/overview`, {
        params: query,
      });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get payments");
    }
  }

  async processWithdrawal(payload: any) {
    try {
      const response = await axiosInstance.post(
        `/admin/transactions/process-withdrawal`,
        payload,
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to process withdrawal");
    }
  }
}

export const adminPaymentsService = new AdminPaymentsService();
