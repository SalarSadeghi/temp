import { create } from "zustand";

export interface User {
  id: string;
  family: string;
  name: string;
  //   roles: string[];
}
const TempUser: User = {
  family: "صادقی",
  id: "1",
  name: "سالار",
};

interface UserState {
  user: User | null;

  //   setUser: (user: User | null) => void;
  //   logout: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: TempUser,
}));
