import { api } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

type UseControlsProps = {
  url: string;
  queryKey: any;
  setSelectedItem: Function;
  setIsOpenConfirmDelete: Function;
  selectedItem: any;
  setIsOpenForm: Function;
};

export const useControls = ({
  url,
  queryKey,
  setSelectedItem,
  selectedItem,
  setIsOpenConfirmDelete,
  setIsOpenForm,
}: UseControlsProps) => {
  const queryClient = useQueryClient();

  const handleConfirmDelete = (item: any) => {
    setSelectedItem(item);
    setIsOpenConfirmDelete(true);
  };

  const handleDelete = async () => {
    const items = selectedItem;
    const idsToDelete = items.map((item: any) => item.original.id);
    await api.delete(url, {
      data: { idsToDelete: idsToDelete },
    });
    await queryClient.invalidateQueries({
      queryKey: [queryKey],
    });
  };

  const handleEdit = async (item: any) => {
    setSelectedItem(item[0].original);
    setIsOpenForm(true);
  };

  const handleCreate = () => {
    setSelectedItem({});
    setIsOpenForm(true);
  };

  return { handleConfirmDelete, handleDelete, handleEdit, handleCreate };
};
