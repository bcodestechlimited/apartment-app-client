import type { IUser } from "@/interfaces/user.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

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
  logOut = async () => {
    try {
      const response = await axiosInstance.get(`/auth/logout`);
      console.log({ response });
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Failed to logout");
    }
  };
  getUser = async () => {
    try {
      const response = await axiosInstance.get(`/auth`);
      const user = response.data?.data?.user;
      useAuthStore.getState().actions.setUser(user);
      return user;
    } catch (error) {
      handleAxiosError(error, "Failed to get user");
    }
  };
  updateUser = async (payload: Partial<IUser>) => {
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

  forgotPassword = async (payload: any) => {
    try {
      const response = await axiosInstance.post(
        `/auth/forgot-password`,
        payload
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to forgot password");
    }
  };

  resetPassword = async (payload: any) => {
    try {
      const response = await axiosInstance.post(
        `/auth/reset-password`,
        payload
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to reset password");
    }
  };

  loginWithGoogle = async () => {
    try {
      const response = await axiosInstance.get(`/auth/google`);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to login with Google");
    }
  };
}

export const authService = new AuthService();
