import { BASE_URL } from "./config.js";
// import { useAuthStore } from "@superapp/shared-store";

import axios from "axios";

// export const BASE_URL = import.meta.env.DEV
//   ? import.meta.env.VITE_DEVELOPMENT_API_URL || "http://localhost:3000/api"
//   : `${window.location.protocol}//${window.location.host}/api`;




const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use(
//   async (config) => {
//     const token = useAuthStore.getState().token;
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// axiosInstance.interceptors.response.use(
//   (response) =>
//     // Handle successful response (status codes 2xx)
//     response,
//   (error) => {
//     if (error.response) {
//       // Server responded with a status code outside the 2xx range
//     } else if (error.request) {
//       // The request was made but no response was recieved
//     } else {
//       // Something else went wrong in setting up the request
//     }

//     return Promise.reject(error); // Reject the error so it can be handled further up
//   }
// );

export { axiosInstance };
