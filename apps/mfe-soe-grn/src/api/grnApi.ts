import { axiosInstance } from "@superapp/shared-api";
import { paginationResponse } from "@superapp/shared-types";
import { GreenCardDraftResponseDTO } from "@type/response";
import { jsonToBigInt } from "@superapp/shared-utils";

const GRN_BASE_URL = "/";

export const createGRN = async (data: FormData) => {
  const response = await axiosInstance.post(`${GRN_BASE_URL}`, data);
  return response.data;
};

export const getGreenCardDrafts = async ({
  searchParam,
  pageNumber,
  pageSize,
}: {
  searchParam?: string;
  pageNumber?: string;
  pageSize?: string;
}) => {
  const response = await axiosInstance.get<
    paginationResponse<GreenCardDraftResponseDTO>
  >(`${GRN_BASE_URL}/drafts`, {
    transformResponse: (data) => data,
    params: {
      searchParam,
      pageNumber,
      pageSize,
    },
  });
  return jsonToBigInt(
    response.data
  ) as paginationResponse<GreenCardDraftResponseDTO>;
};
