"use client";
import { AdminTitle } from "@/components/containers/admin/shared/admin-title";
import { Tag as TagIcon } from "@phosphor-icons/react";
import { columns, columnsNames } from "./columns";
import * as React from "react";
import DataTable from "@/components/ui/data-table";
import TagForm from "./form";
import { api } from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTagState } from "@/hooks/use-tag-state";
import ConfirmDelete from "@/components/containers/admin/shared/confirm-delete";

export default function AdminAvaliationTagPage() {
  const queryClient = useQueryClient();
  const setIsOpenForm = useTagState((state) => state.setIsOpenForm);
  const isOpenConfirmDelete = useTagState((state) => state.isOpenConfirmDelete);
  const setIsOpenConfirmDelete = useTagState(
    (state) => state.setIsOpenConfirmDelete,
  );
  const setSelectedItem = useTagState((state) => state.setSelectedItem);
  const selectedItem = useTagState((state) => state.selectedItem);
  const { data, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const { data } = await api.get("/admin/avaliation/tag");
      return data;
    },
  });
  const handleConfirmDelete = (item: any) => {
    setSelectedItem(item);
    setIsOpenConfirmDelete(true);
  };
  const handleDelete = async () => {
    const items = selectedItem;
    const idsToDelete = items.map((item: any) => item.original.id);
    await api.delete("/admin/avaliation/tag", {
      data: { idsToDelete: idsToDelete },
    });
    queryClient.invalidateQueries({ queryKey: ["tags"] });
  };
  const handleEdit = async (item: any) => {
    setSelectedItem(item[0].original);
    setIsOpenForm(true);
  };
  const handleCreate = () => {
    setSelectedItem({});
    setIsOpenForm(true);
  };
  const dataTableColumns = columns(isLoading);
  return (
    <>
      <div className="flex-1 p-8 pt-6">
        <AdminTitle title="Tags" Icon={<TagIcon />} />
        <ConfirmDelete
          isOpenConfirmDelete={isOpenConfirmDelete}
          setIsOpenConfirmDelete={setIsOpenConfirmDelete}
          handleDelete={handleDelete}
        />
        <DataTable
          form={<TagForm />}
          data={data}
          columns={dataTableColumns}
          columnsNames={columnsNames}
          searchField="name"
          handleDelete={handleConfirmDelete}
          handleEdit={handleEdit}
          handleCreate={handleCreate}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
