import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StoreState {
  phone?: string;
  isPhoneVerified: boolean;
  accessToken?: string;
  setPhone: (phone?: string) => void;
  setIsPhoneVerified: (status: boolean) => void;
  setAccessToken: (token?: string) => void;
  clearAccessToken: () => void;
}

const initialState = {
  phone: undefined,
  accessToken: undefined,
  isPhoneVerified: false,
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
    setAccessToken: (token?: string) => {
      set((state) => {
        state.accessToken = token;
      });
    },
    clearAccessToken: () => {
      set((state) => {
        state.accessToken = undefined;
      });
    },
  }))
);
