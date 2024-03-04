"use client";
import { AdminTitle } from "@/components/containers/admin/shared/admin-title";
import { Tag as TagIcon } from "@phosphor-icons/react";
import {
  columns,
  columnsNames,
} from "@/app/(admin)/admin/(private)/tag/columns";
import * as React from "react";
import { DataTable } from "@/components/ui/data-table";
import { TagForm } from "@/app/(admin)/admin/(private)/tag/form";
import { api } from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTagState } from "@/hooks/use-tag-state";
import ConfirmDelete from "@/components/containers/admin/shared/confirm-delete";
import { QUERY_KEY } from "@/contants/query-key";

export default function AdminAvaliationTagPage() {
  const queryClient = useQueryClient();
  const setIsOpenForm = useTagState((state) => state.setIsOpenForm);
  const isOpenConfirmDelete = useTagState((state) => state.isOpenConfirmDelete);
  const setIsOpenConfirmDelete = useTagState(
    (state) => state.setIsOpenConfirmDelete,
  );
  const setSelectedItem = useTagState((state) => state.setSelectedItem);
  const selectedItem = useTagState((state) => state.selectedItem);
  const url = "/admin/tag";
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ADMIN_TAG],
    queryFn: async () => {
      const { data } = await api.get(url);
      return data;
    },
  });
  const dataTableColumns = columns(isLoading);

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
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY.ADMIN_TAG],
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
          createButtonLabel="Criar tag"
          iconCreateButton={<TagIcon className="h-5 w-5" />}
        />
      </div>
    </>
  );
}