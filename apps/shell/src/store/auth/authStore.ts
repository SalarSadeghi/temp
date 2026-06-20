import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface StoreState {
  phone?: string;
  isPhoneVerified: boolean;
  setPhone: (phone?: string) => void;
  setIsPhoneVerified: (status: boolean) => void;
}

const initialState = {
  phone: undefined,
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
  }))
);
