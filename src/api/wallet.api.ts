import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class WalletService {
  async topUpWallet(amount: number) {
    try {
      const response = await axiosInstance.post(`/wallet/`, { amount });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to top up wallet ");
    }
  }

  async verifyPayment(reference: string) {
    try {
      const response = await axiosInstance.get(
        `/wallet/verify-payment/${reference}`,
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to verify payment ");
    }
  }
  async getUserWallet() {
    try {
      const response = await axiosInstance.get(`/wallet/`);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to fetch user wallet ");
    }
  }
  async getBanks() {
    try {
      const response = await axiosInstance.get("/wallet/banks");
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to fetch banks ");
    }
  }

  async verifyAccountNumber(bankCode: string, accountNumber: string) {
    try {
      const response = await axiosInstance.get(
        `/wallet/verify-account-number/?bankCode=${bankCode}&accountNumber=${accountNumber}`,
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to verify account number ");
    }
  }

  async withdrawFunds(amount: number) {
    try {
      const response = await axiosInstance.post(`/wallet/withdraw`, { amount });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to withdraw funds ");
    }
  }

  async updateWalletDetails(payload: {
    accountNumber: string;
    bankCode: string;
  }) {
    try {
      const response = await axiosInstance.put(`/wallet`, payload);

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to update wallet details ");
    }
  }
}
export const walletService = new WalletService();
