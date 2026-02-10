import axios from "axios";
import { handleAxiosError } from "./utils";

export const uploadFileToCloudinary = async (file: File) => {
  try {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "";
    const formData = new FormData();
    formData.append("file", file);
    // Replace with your actual preset name and cloud name from your .env
    formData.append("upload_preset", preset);
    formData.append("folder", "Haven-Lease"); // Keep your existing folder structure

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const data = await response.data;
    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
    }; // This returns the final image URL
  } catch (error) {
    handleAxiosError(error, "Unable to get booking requests");
  }
};
