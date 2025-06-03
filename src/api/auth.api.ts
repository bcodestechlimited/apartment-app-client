import type { User } from "@/interfaces/user.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import { AxiosError } from "axios";

class AuthService {
  register = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/auth/signup`, payload);

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to register");
    }
  };
  signIn = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/auth/signin`, payload);
      console.log({ response });
      return response.data?.data?.user;
    } catch (error) {
      handleAxiosError(error, "Failed to sign in");
    }
  };
  getUser = async () => {
    try {
      const response = await axiosInstance.get(`/auth`);
      // set user
      useAuthStore.getState().actions.setUser(response.data?.data);
      return response.data?.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data);
        throw new Error(
          error.response?.data?.message || "Failed to authenticate user"
        );
      }
      throw error;
    }
  };
  updateUser = async (payload: Partial<User>) => {
    try {
      const response = await axiosInstance.patch(`/auth`, payload);

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to update");
    }
  };
  verifyOTP = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/auth/verify-otp`, payload);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to verify OTP");
    }
  };
  resendOTP = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/auth/send-otp`, payload);

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to resen OTP");
    }
  };
}

export const authService = new AuthService();
