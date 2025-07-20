import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class BookingService {
  getLandlordBookings = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/booking/landlord`, {
        params,
      });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get booking requests");
    }
  };

  getTenantBookings = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/booking/tenant`, {
        params,
      });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get booking requests");
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
