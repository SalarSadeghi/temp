import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";

export interface User {
  family: string;
  name: string;
}
const TempUser: User = {
  family: "Sadeghi",
  name: "Salar",
};

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: TempUser,
      isAuthenticated: false,
      token: null,
      setUser: (userData: User | null) =>
        set(
          produce((draft) => {
            draft.user = userData;
          }),
          false
        ),
      setToken: (token: string | null) =>
        set(
          produce((draft) => {
            draft.token = token;
            draft.isAuthenticated = !!token;
          }),
          false
        ),
    }),
    {
      name: "user-zstorage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          state.isAuthenticated = true;
        }
      },
    }
  )
);
