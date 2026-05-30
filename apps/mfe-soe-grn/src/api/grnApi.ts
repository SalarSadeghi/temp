import { axiosInstance } from "@superapp/shared-api";
const GRN_BASE_URL = "/";

export const createGRN = async (data: FormData) => {
  const response = await axiosInstance.post(`${GRN_BASE_URL}`, data);
  return response.data;
};
