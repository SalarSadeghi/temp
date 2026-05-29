import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TempState {
  temp: string;
}

export const useTempStore = create<TempState>()(
  immer((_set, _get) => ({
    temp: "test",
  }))
);
