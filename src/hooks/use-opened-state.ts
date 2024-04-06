import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type OpenedStateProps = {
  isOpened: boolean;
  setIsOpened: (newState: any) => void;
};

export const useOpenedState = create<OpenedStateProps>()(
  persist(
    (set) => ({
      isOpened: false,
      setIsOpened: (newState: boolean) => set({ isOpened: newState }),
    }),
    { name: "menu-opened", storage: createJSONStorage(() => sessionStorage) },
  ),
);
