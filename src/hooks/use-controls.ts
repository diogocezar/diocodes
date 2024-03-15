import { api } from "@/services/api";
import { useQueryClient } from "@tanstack/react-query";

type UseControlsProps = {
  url: string;
  queryKey: any;
  setSelectedItem: Function;
  setIsOpenConfirmDelete: Function;
  selectedItem: any;
  setIsOpenForm: Function;
  table: any;
};

export const useControls = ({
  url,
  queryKey,
  setSelectedItem,
  selectedItem,
  setIsOpenConfirmDelete,
  setIsOpenForm,
  table,
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
    table.toggleAllRowsSelected(false);
  };

  const handleEdit = async (item: any) => {
    setSelectedItem(item[0].original);
    setIsOpenForm(true);
    table.toggleAllRowsSelected(false);
  };

  const handleCreate = () => {
    setSelectedItem({});
    setIsOpenForm(true);
    table.toggleAllRowsSelected(false);
  };

  return { handleConfirmDelete, handleDelete, handleEdit, handleCreate };
};
