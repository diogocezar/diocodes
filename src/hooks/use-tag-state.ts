import { create } from "zustand";

type TagStateProps = {
  isOpen: boolean;
  setIsOpen: (newState: any) => void;
  selectedItem: object;
  setSelectedItem: (newState: any) => void;
};

export const useTagState = create<TagStateProps>()((set) => ({
  isOpen: false,
  setIsOpen: (newState: boolean) => set({ isOpen: newState }),
  selectedItem: {},
  setSelectedItem: (newState: object) => set({ selectedItem: newState }),
}));
