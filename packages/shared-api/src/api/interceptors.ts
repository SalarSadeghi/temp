import { useAuthStore } from "@superapp/shared-store";
import { axiosInstance } from "./axios.js";

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) =>
    // Handle successful response (status codes 2xx)
    response,
  (error) => {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
    } else if (error.request) {
      // The request was made but no response was recieved
    } else {
      // Something else went wrong in setting up the request
    }

    return Promise.reject(error); // Reject the error so it can be handled further up
  },
);

export default axiosInstance;
