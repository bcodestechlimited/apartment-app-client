import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class BookingService {
  createBooking = async (payload: any) => {
    console.log({ payload });

    try {
      const response = await axiosInstance.post(`/booking`, payload);
      console.log({ response });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to book property");
    }
  };
  getBooking = async (propertyId: string) => {
    try {
      const response = await axiosInstance.get(`/property/${propertyId}`);

      console.log({ response });

      return response.data?.data?.property;
    } catch (error) {
      handleAxiosError(error, "Unable to get property");
    }
  };
  getBookings = async (params: IParams) => {
    console.log({ params });

    try {
      const response = await axiosInstance.get(`/property`, {
        params,
      });

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get properties");
    }
  };
}

export const bookingService = new BookingService();
