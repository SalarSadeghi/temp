import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./config";
import { setupInterceptors } from "./interceptor";
import { IServiceCommunicateResponse } from "@type/common";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
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
      config
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
      config
    );
    return response.data;
  },

  // put: async <T>(
  //   url: string,
  //   data?: any,
  //   config?: AxiosRequestConfig
  // ): Promise<IServiceCommunicateResponse<T>> => {
  //   const response = await axiosInstance.put<IServiceCommunicateResponse<T>>(url, data, config);
  //   return response.data;
  // },

  // patch: async <T>(
  //   url: string,
  //   data?: any,
  //   config?: AxiosRequestConfig
  // ): Promise<IServiceCommunicateResponse<T>> => {
  //   const response = await axiosInstance.patch<IServiceCommunicateResponse<T>>(url, data, config);
  //   return response.data;
  // },

  // delete: async <T>(
  //   url: string,
  //   config?: AxiosRequestConfig
  // ): Promise<IServiceCommunicateResponse<T>> => {
  //   const response = await axiosInstance.delete<IServiceCommunicateResponse<T>>(url, config);
  //   return response.data;
  // },
};

export { axiosInstance };
