import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StoreState {
  isOpenDrawer: boolean;
  changeOpenDrawer: (state: boolean) => void;
}

const initialState = {
  isOpenDrawer: false,
};

export const useDrawerStore = create<StoreState>()(
  immer((set, _get) => ({
    ...initialState,
    changeOpenDrawer: (open: boolean) => {
      set((state) => {
        state.isOpenDrawer = open;
      });
    },
  }))
);
