import { ReactNode } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StoreState {
  isOpen: boolean;
  title: string | ReactNode;
  body: string | ReactNode;
  maxWidth: string;
  overflowY: "visible" | "hidden" | "clip" | "scroll" | "auto";
  hasCancelBtn: boolean;
  hasOkBtn: boolean;
  isLoading: boolean;
  autoClose: boolean;
  isTransparentBackground: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  changeOpen: (isOpen: boolean) => void;
  changeBody: (text: string | ReactNode) => void;
  changeTitle: (title: string | ReactNode) => void;
  changeOnCancel: (func: () => void) => void;
  changeOnOk: (func: () => void) => void;
  changeHasCancelBtn: (hasCancelBtn: boolean) => void;
  changeHasOkBtn: (hasOkBtn: boolean) => void;
  changeMaxWidth: (width: string) => void;
  changeOverflowY: (
    overflowY: "visible" | "hidden" | "clip" | "scroll" | "auto"
  ) => void;
  changeIsTransparentBackground: (isTransparent: boolean) => void;
  changeIsLoading: (loading: boolean) => void;
  changeAutoClose: (state: boolean) => void;
}

export const useDialogStore = create<StoreState>()(
  immer((set, get) => ({
    isLoading: false,
    isOpen: false,
    title: "",
    body: "",
    hasOkBtn: true,
    hasCancelBtn: true,
    maxWidth: "70%",
    overflowY: "auto",
    isTransparentBackground: false,
    autoClose: true,

    changeOpen: (isOpen) =>
      set((draft) => {
        draft.isOpen = isOpen;
        if (isOpen === false) {
          draft.title = "";
          draft.onOk = undefined;
          draft.body = ""; //
        }
      }),

    changeBody: (text) =>
      set((draft) => {
        draft.body = text;
      }),

    changeTitle: (title) =>
      set((draft) => {
        draft.title = title;
      }),

    changeOnCancel: (func) =>
      set((draft) => {
        draft.onCancel = func;
      }),

    changeOnOk: (func) =>
      set((draft) => {
        draft.onOk = func;
      }),

    changeHasCancelBtn: (hasCancelBtn) =>
      set((draft) => {
        draft.hasCancelBtn = hasCancelBtn;
      }),

    changeHasOkBtn: (hasOkBtn) =>
      set((draft) => {
        draft.hasOkBtn = hasOkBtn;
      }),

    changeMaxWidth: (maxWidth) =>
      set((draft) => {
        draft.maxWidth = maxWidth;
      }),

    changeOverflowY: (overflowY) =>
      set((draft) => {
        // fixed: removed erroneous 'produce', added proper set()
        draft.overflowY = overflowY;
      }),

    changeIsTransparentBackground: (isTransparent) =>
      set((draft) => {
        draft.isTransparentBackground = isTransparent;
      }),

    changeIsLoading: (state) =>
      set((draft) => {
        draft.isLoading = state;
      }),

    changeAutoClose: (state) =>
      set((draft) => {
        draft.autoClose = state;
      }),
  }))
);
