import { create } from "zustand";

type LogStateProps = {
  isOpenForm: boolean;
  setIsOpenForm: (newState: any) => void;
  isOpenConfirmDelete: boolean;
  setIsOpenConfirmDelete: (newState: any) => void;
  selectedItem: any;
  setSelectedItem: (newState: any) => void;
  table: any;
  setTable: (newState: any) => void;
};

export const useLogState = create<LogStateProps>()((set) => ({
  isOpenForm: false,
  setIsOpenForm: (newState: boolean) => set({ isOpenForm: newState }),
  isOpenConfirmDelete: false,
  setIsOpenConfirmDelete: (newState: boolean) =>
    set({ isOpenConfirmDelete: newState }),
  selectedItem: {},
  setSelectedItem: (newState: object) => set({ selectedItem: newState }),
  table: {},
  setTable: (newState: object) => set({ table: newState }),
}));
