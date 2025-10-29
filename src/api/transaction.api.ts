import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class TransactionService {
  getAllUserTransactions = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/transaction`, {
        params,
      });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get transactions");
    }
  };

  getTransaction = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/transaction`, {
        params,
      });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get transaction");
    }
  };
}

export const transactionService = new TransactionService();
