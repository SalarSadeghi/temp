// import { useAuthStore } from "@superapp/shared-store";

import axios from "axios";
import { API_BASE_URL } from "./config";
import { setupInterceptors } from "./interceptor";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(axiosInstance);

export { axiosInstance };
