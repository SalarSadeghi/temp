import { axiosInstance } from "@api/axios/axios";
import { jsonToBigInt } from "@superapp/shared-utils";
import { paginationResponse } from "@type/common";
import {
  GreenCardDraftResponseDTO,
  GreenCardSentResponseDTO,
} from "./types/response";

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

export const deleteGreenCardDraft = async (id: string) => {
  const response = await axiosInstance.post(`${GRN_BASE_URL}/drafts/${id}`);
  return response.data;
};

export const getSentGreenCard = async ({
  pageNumber,
  pageSize,
  searchParam,
}: {
  pageNumber: string | number;
  pageSize: string | number;
  searchParam?: string;
}) => {
  const response = await axiosInstance.get<
    paginationResponse<GreenCardSentResponseDTO>
  >(`${GRN_BASE_URL}/postedGreenCards/${pageNumber}/${pageSize}`, {
    params: {
      searchParam,
    },
  });
  return response.data;
};

export const getSentGreencardByPrcCode = async ({
  prcCode,
}: {
  prcCode?: string;
}) => {
  const res = await axiosInstance<GreenCardSentResponseDTO>(
    `${GRN_BASE_URL}/greenCardByPrcCode`,
    {
      params: {
        prcCode,
      },
    }
  );
  return res.data;
};
