import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  setUser: (user: User | null) => void;
  token: string | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      setUser: (userData: User | null) =>
        set({
          user: userData,
          isAuthenticated: !!userData,
        }),
    }),
    {
      name: "token",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          state.isAuthenticated = true;
        }
      },
    },
  ),
);
