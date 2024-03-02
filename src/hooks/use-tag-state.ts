import { create } from "zustand";

type TagStateProps = {
  isOpenForm: boolean;
  setIsOpenForm: (newState: any) => void;
  isOpenConfirmDelete: boolean;
  setIsOpenConfirmDelete: (newState: any) => void;
  selectedItem: any;
  setSelectedItem: (newState: any) => void;
};

export const useTagState = create<TagStateProps>()((set) => ({
  isOpenForm: false,
  setIsOpenForm: (newState: boolean) => set({ isOpenForm: newState }),
  isOpenConfirmDelete: false,
  setIsOpenConfirmDelete: (newState: boolean) =>
    set({ isOpenConfirmDelete: newState }),
  selectedItem: {},
  setSelectedItem: (newState: object) => set({ selectedItem: newState }),
}));
