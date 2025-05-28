import axiosInstance from "@/lib/axios.config";
import { useAuthStore } from "@/store/useAuthStore";
import { AxiosError } from "axios";

class AuthService {
  register = async (payload: any) => {
    try {
      const response = await axiosInstance.put(
        `/client/leave/leave-request/${payload.leaveId}`,
        payload
      );
      return response.data?.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data);
        throw new Error(
          error.response?.data?.message || "Failed to update leave by client"
        );
      }
      throw error;
    }
  };
  signIn = async (payload: any) => {
    try {
      const response = await axiosInstance.put(
        `/client/leave/leave-request/${payload.leaveId}`,
        payload
      );
      return response.data?.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error?.response?.data);
        throw new Error(
          error.response?.data?.message || "Failed to update leave by client"
        );
      }
      throw error;
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
}

export const authService = new AuthService();
