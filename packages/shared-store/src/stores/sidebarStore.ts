import { create } from "zustand";
import { produce } from "immer";

interface SidebarState {
  isSidebarOpen: boolean;
  toggleSidebar: (state: boolean) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: (state: boolean) =>
    set(
      produce((draft) => {
        draft.isSidebarOpen = state;
      }),
      false
    ),
}));
