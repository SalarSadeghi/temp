import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StoreState {
  phone?: string;
  isPhoneVerified: boolean;
  isAuthenticated: boolean;
  isBootStarpping: boolean;
  setPhone: (phone?: string) => void;
  setIsPhoneVerified: (status: boolean) => void;
  setIsAuthenticated: (status: boolean) => void;
  setIsBootStrapping: (status: boolean) => void;
}

const initialState = {
  phone: undefined,
  isAuthenticated: false,
  isPhoneVerified: false,
  isBootStarpping: false,
};

export const useAuthStore = create<StoreState>()(
  immer((set, _get) => ({
    ...initialState,
    setPhone: (phone?: string) => {
      set((state) => {
        state.phone = phone;
      });
    },
    setIsPhoneVerified: (status: boolean) => {
      set((state) => {
        state.isPhoneVerified = status;
      });
    },
    setIsAuthenticated: (status: boolean) => {
      set((state) => {
        state.isAuthenticated = status;
      });
    },
    setIsBootStrapping: (status: boolean) => {
      set((state) => {
        state.isBootStarpping = status;
      });
    },
  })),
);
