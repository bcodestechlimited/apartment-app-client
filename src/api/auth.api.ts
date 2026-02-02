import type { IUser } from "@/interfaces/user.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

class AuthService {
  register = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/auth/signup`, payload);

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to register");
    }
  };
  signIn = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/auth/signin`, payload);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to sign in");
    }
  };
  logOut = async () => {
    try {
      const response = await axiosInstance.get(`/auth/logout`);
      useAuthStore.getState().actions.reset();
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

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to resen OTP");
    }
  };

  forgotPassword = async (payload: any) => {
    try {
      const response = await axiosInstance.post(
        `/auth/forgot-password`,
        payload,
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
        payload,
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to reset password");
    }
  };

  loginWithGoogle = async ({
    role,
    redirect,
  }: {
    role?: string;
    redirect?: string;
  }) => {
    try {
      const response = await axiosInstance.get(`/auth/google`, {
        params: { role, redirect },
      });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to login with Google");
    }
  };

  completeOnboarding = async (payload: any) => {
    try {
      const response = await axiosInstance.post(
        `/auth/complete-onboarding`,
        payload,
      );

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to complete onboarding");
    }
  };

  getUserPersonalInfo = async () => {
    try {
      const response = await axiosInstance.get(`/auth/profile/personal-info`);

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to get user info");
    }
  };

  updateUserPersonalInfo = async (payload: any) => {
    try {
      const response = await axiosInstance.patch(
        `/auth/profile/personal-info`,
        payload,
      );

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to update user personal info");
    }
  };

  getUserEmployment = async () => {
    try {
      const response = await axiosInstance.get(`/auth/profile/employment`);

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to get user employment info");
    }
  };

  updateUserEmployment = async (payload: any) => {
    try {
      const response = await axiosInstance.patch(
        `/auth/profile/employment`,
        payload,
      );

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to update user employment info");
    }
  };

  getUserNextOfKin = async () => {
    try {
      const response = await axiosInstance.get(`/auth/profile/next-of-kin`);

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to get user next of kin");
    }
  };

  updateUserNextOfKin = async (payload: any) => {
    try {
      const response = await axiosInstance.patch(
        `/auth/profile/next-of-kin`,
        payload,
      );

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to update user next of kin");
    }
  };

  getUserGuarantor = async () => {
    try {
      const response = await axiosInstance.get(`/auth/profile/guarantor`);

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to get user guarantor info");
    }
  };

  updateUserGuarantor = async (payload: any) => {
    try {
      const response = await axiosInstance.patch(
        `/auth/profile/guarantor`,
        payload,
      );

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to update user guarantor info");
    }
  };

  getUserDocuments = async () => {
    try {
      const response = await axiosInstance.get(`/auth/profile/documents`);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to get user guarantor info");
    }
  };

  updateUserDocuments = async (payload: any) => {
    try {
      const response = await axiosInstance.post(
        `/auth/profile/documents`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to upload user documents");
    }
  };
}

export const authService = new AuthService();
