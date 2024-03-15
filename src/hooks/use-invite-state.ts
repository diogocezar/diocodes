import { create } from "zustand";

type InviteStateProps = {
  isOpenForm: boolean;
  setIsOpenForm: (newState: any) => void;
  isOpenConfirmDelete: boolean;
  setIsOpenConfirmDelete: (newState: any) => void;
  selectedItem: any;
  setSelectedItem: (newState: any) => void;
  table: any;
  setTable: (newState: any) => void;
};

export const useInviteState = create<InviteStateProps>()((set) => ({
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
