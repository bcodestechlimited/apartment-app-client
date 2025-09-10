import axios from "axios";

const apiUrl: string = import.meta.env.VITE_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: `${apiUrl}/api/v1`,
  withCredentials: true,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers!.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
