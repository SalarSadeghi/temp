import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./config";
import { setupInterceptors } from "./interceptor";
import { IServiceCommunicateResponse } from "@type/common";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(axiosInstance);

export const api = {
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<IServiceCommunicateResponse<T>> => {
    const response = await axiosInstance.get<IServiceCommunicateResponse<T>>(
      url,
      { withCredentials: true, ...config }
    );
    return response.data;
  },

  post: async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<IServiceCommunicateResponse<T>> => {
    const response = await axiosInstance.post<IServiceCommunicateResponse<T>>(
      url,
      data,
      { withCredentials: true, ...config }
    );
    return response.data;
  },
};

export { axiosInstance };
