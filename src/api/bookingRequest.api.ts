/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class BookingRequestService {
  createBookingRequest = async (payload: any) => {
    try {
      const response = await axiosInstance.post(`/booking-request`, payload);
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to book property");
    }
  };

  getLandlordBookingRequests = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/booking-request/landlord`, {
        params,
      });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get booking requests");
    }
  };

  getTenantBookingRequests = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/booking-request/tenant`, {
        params,
      });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get booking requests");
    }
  };

  getBookingRequest = async (bookingRequestId: string) => {
    try {
      const response = await axiosInstance.get(
        `/booking-request/${bookingRequestId}`,
      );

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get booking request");
    }
  };

  updateLandlordBookingRequests = async (
    bookingRequestId: string,
    payload: any,
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/booking-request/${bookingRequestId}`,
        payload,
      );

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to update booking request");
    }
  };

  payForBookingRequest = async (
    bookingRequestId: string,
    payload: { useWallet: boolean },
  ) => {
    try {
      const response = await axiosInstance.post(
        `/booking-request/${bookingRequestId}/pay`,
        payload,
      );

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to generate payment link");
    }
  };
}

export const bookingRequestService = new BookingRequestService();
