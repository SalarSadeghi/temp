import { api, axiosInstance } from "@api/axios/axios";
import { jsonToBigInt } from "@superapp/shared-utils";
import { PaginationRequestDTO, paginationResponse } from "@type/common";
import { GRNDraftResponseDTO, GRNSentResponseDTO } from "./types/response";
import { API_URL } from "@api/axios/config";

const GRN_BASE_URL = `${API_URL}/soe-grn`;

export const createGRN = async (data: FormData) => {
  const res = await api.post(`${GRN_BASE_URL}/create`, data);
  return res.data;
};

export const getGRNDrafts = async ({
  orderBy,
  page,
  search,
  size,
}: PaginationRequestDTO) => {
  const res = await api.get<paginationResponse<GRNDraftResponseDTO>>(
    `${GRN_BASE_URL}/getAll`,
    {
      transformResponse: (data) => data,
      params: {
        orderBy,
        page,
        search,
        size,
      },
    }
  );
  return jsonToBigInt(res.data) as paginationResponse<GRNDraftResponseDTO>;
};

export const getGRNDraftById = async (id: string) => {
  const res = await api.get<GRNDraftResponseDTO>(`${GRN_BASE_URL}/${id}`, {
    transformResponse: (data) => data,
  });
  return jsonToBigInt(res.data) as GRNDraftResponseDTO;
};

export const createGRNDraft = async (data: FormData, id?: string) => {
  const response = await api.post<GRNDraftResponseDTO>(
    `${GRN_BASE_URL}/createDraft/${id}`,
    data,
    { transformResponse: (data) => data }
  );
  return jsonToBigInt(response.data) as GRNDraftResponseDTO;
};

export const deleteGRNDraft = async (draftId: string, fileId?: string) => {
  const res = await api.post(
    `${GRN_BASE_URL}/deleteDraft/${draftId}/${fileId}`
  );
  return res.data;
};

// export const getGreenCardDrafts = async ({
//   searchParam,
//   pageNumber,
//   pageSize,
// }: {
//   searchParam?: string;
//   pageNumber?: string;
//   pageSize?: string;
// }) => {
//   const response = await axiosInstance.get<
//     paginationResponse<GreenCardDraftResponseDTO>
//   >(`${GRN_BASE_URL}/drafts`, {
//     transformResponse: (data) => data,
//     params: {
//       searchParam,
//       pageNumber,
//       pageSize,
//     },
//   });
//   return jsonToBigInt(
//     response.data
//   ) as paginationResponse<GreenCardDraftResponseDTO>;
// };

// export const deleteGreenCardDraft = async (id: string) => {
//   const response = await axiosInstance.post(`${GRN_BASE_URL}/drafts/${id}`);
//   return response.data;
// };

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
    paginationResponse<GRNSentResponseDTO>
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
  const res = await axiosInstance<GRNSentResponseDTO>(
    `${GRN_BASE_URL}/greenCardByPrcCode`,
    {
      params: {
        prcCode,
      },
    }
  );
  return res.data;
};
