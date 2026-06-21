
import { GRNDraftResponseDTO, GRNSentResponseDTO } from "@api/soe/grn/types/response";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Mode = "edit" | "add" | null;
interface StoreState {
  mode: Mode;
  pageTitle: string;
  draft: GRNDraftResponseDTO | null;
  sent: GRNSentResponseDTO | null;
  setPageTitle: (title: string) => void;
  changeMode: (mode: Mode) => void;
  setDraft: (draft: GRNDraftResponseDTO | null) => void;
  setSent: (sent: GRNSentResponseDTO | null) => void;
}

const initialState = {
  mode: null,
  draft: null,
  sent: null,
  pageTitle: "",
};

export const useGreenCardStore = create<StoreState>()(
  immer((set, _get) => ({
    ...initialState,
    changeMode: (mode) => {
      set((draft) => {
        draft.mode = mode;
      });
    },
    setPageTitle: (title: string) => {
      set((draft) => {
        draft.pageTitle = title;
      });
    },
    setDraft: (data: GRNDraftResponseDTO | null) =>
      set((draft) => {
        draft.draft = data;
      }),

    setSent: (data: GRNSentResponseDTO | null) =>
      set((draft) => {
        draft.sent = data;
      }),
  }))
);
