import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type SnackbarSeverity = "error" | "warning" | "info" | "success";

export interface CustomSnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
  autoHideDuration?: number;
  setOpen: (state: boolean) => void;
  setMessage: (state: string) => void;
  setAutoHideDuration: (duration: number) => void;
  position?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
  setPosition: (position: CustomSnackbarState["position"]) => void;
  setSeverity: (severity: SnackbarSeverity) => void;
}

const initialState = {
  open: false,
  message: "",
  severity: "info" as SnackbarSeverity,
  autoHideDuration: 5000,
  position: { vertical: "bottom", horizontal: "right" } as const,
};

export const useNotificationStore = create<CustomSnackbarState>()(
  immer((set, _get) => ({
    ...initialState,

    setOpen: (open: boolean) => {
      set((state) => {
        state.open = open;
      });
    },

    setMessage: (message: string) => {
      set((state) => {
        state.message = message;
      });
    },

    setSeverity: (severity: SnackbarSeverity) => {
      set((state) => {
       
          state.severity = severity;
      
      });
    },

    setAutoHideDuration: (duration: number) => {
      set((state) => {
        state.autoHideDuration = duration;
      });
    },

    setPosition: (position: CustomSnackbarState["position"]) => {
      set((state) => {
        state.position = position;
      });
    },
  }))
);
