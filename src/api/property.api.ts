import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";

class PropertyService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addProperty = async (payload: any) => {
    console.log({ payload });

    try {
      const response = await axiosInstance.post(`/property`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to add property");
    }
  };
  getProperty = async (propertyId: string) => {
    try {
      //testing for fix
      // console.log("testing get property for fix");
      const response = await axiosInstance.get(`/property/${propertyId}`);

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get property");
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateProperty = async (propertyId: string, payload: any) => {
    console.log({ payload });

    try {
      const response = await axiosInstance.patch(
        `/property/${propertyId}`,
        payload,
      );

      console.log({ response });

      return response.data?.data?.property;
    } catch (error) {
      handleAxiosError(error, "Failed to update property");
    }
  };

  getProperties = async (params: IParams) => {
    // console.log({ params });

    try {
      const response = await axiosInstance.get(`/property`, {
        params,
      });

      // console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get properties");
    }
  };

  // getPropertiesPublic = async (params: IParams) => {
  //   // console.log({ params });

  //   try {
  //     const response = await axiosInstance.get(`/property/public`, {
  //       params,
  //     });

  //     // console.log({ response });

  //     return response.data?.data;
  //   } catch (error) {
  //     handleAxiosError(error, "Unable to get properties");
  //   }
  // };

  getLandLordProperties = async (params: IParams) => {
    try {
      const response = await axiosInstance.get(`/property/landlord`, {
        params,
      });

      // console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get properties");
    }
  };

  bookProperty = async (payload: {
    propertyId: string;
    moveInDate: string;
  }) => {
    console.log({ payload });

    try {
      const response = await axiosInstance.post(`/booking/request`, payload);

      console.log({ response });

      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to book property");
    }
  };

  //Admin
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adminUpdateProperty = async (propertyId: string, payload: any) => {
    console.log({ payload });

    try {
      const response = await axiosInstance.patch(
        `/admin/property/${propertyId}`,
        payload,
      );

      console.log({ response });

      return response.data;
    } catch (error) {
      handleAxiosError(error, "Failed to update property");
    }
  };

  updatePropertyAvailability = async (
    propertyId: string,
    isAvailable: boolean,
  ) => {
    try {
      const response = await axiosInstance.patch(
        `/property/landlord/update-availability`,
        {
          propertyId,
          isAvailable,
        },
      );

      console.log({ response });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to update property availability");
    }
  };

  softDeleteProperty = async (id: string) => {
    try {
      const response = await axiosInstance.delete(
        `/property/soft-delete/${id}`,
      );
      console.log({ response });
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Failed to delete property");
    }
  };
}

export const propertyService = new PropertyService();
