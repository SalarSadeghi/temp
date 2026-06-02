import {
  GreenCardDraftResponseDTO,
  GreenCardSentResponseDTO,
} from "@type/response";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Mode = "edit" | "add" | null;
interface StoreState {
  mode: Mode;
  pageTitle: string;
  //@ts-ignore
  draft: GreenCardDraftResponse | null;
  //@ts-ignore

  // setDraft: (draft: GreenCardDraftResponse | null) => void;
  //@ts-ignore
  sent: GreenCardSentResponse | null;
  //@ts-ignore

  // setSent: (sent: GreenCardSentResponse | null) => void;
  setPageTitle: (title: string) => void;
  changeMode: (mode: Mode) => void;
  setDraft: (draft: GreenCardDraftResponseDTO | null) => void;
  setSent: (sent: GreenCardSentResponseDTO | null) => void;
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
      set((draft) => (draft.mode = mode));
    },
    setPageTitle: (title: string) => {
      set((draft) => {
        draft.pageTitle = title;
      });
    },
    setDraft: (data: GreenCardDraftResponseDTO | null) =>
      set((draft) => {
        draft.draft = data;
      }),

    setSent: (data: GreenCardSentResponseDTO | null) =>
      set((draft) => {
        draft.sent = data;
      }),
  }))
);
