import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TempState {
  temp: string;
}

export const useTempStore = create<TempState>()(
  immer((set, get) => ({
    temp: "test",
  }))
);
