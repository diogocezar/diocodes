"use client";
import { Tag as TagIcon } from "@phosphor-icons/react";
import {
  columns,
  columnsNames,
} from "@/app/(admin)/admin/(private)/tag/columns";
import * as React from "react";
import { DataTable } from "@/components/ui/data-table";
import { TagForm } from "@/app/(admin)/admin/(private)/tag/form";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useTagState } from "@/hooks/use-tag-state";
import ConfirmDelete from "@/components/containers/admin/shared/confirm-delete";
import { QUERY_KEY } from "@/contants/query-key";
import { useControls } from "@/hooks/use-controls";
import PageCommon from "@/components/containers/admin/shared/page-common";

export default function AdminAvaliationTagPage() {
  const setIsOpenForm = useTagState((state) => state.setIsOpenForm);
  const isOpenConfirmDelete = useTagState((state) => state.isOpenConfirmDelete);
  const setIsOpenConfirmDelete = useTagState(
    (state) => state.setIsOpenConfirmDelete,
  );
  const setSelectedItem = useTagState((state) => state.setSelectedItem);
  const selectedItem = useTagState((state) => state.selectedItem);
  const setTable = useTagState((state) => state.setTable);
  const table = useTagState((state) => state.table);

  const URL = "/admin/tag";

  const { handleConfirmDelete, handleDelete, handleEdit, handleCreate } =
    useControls({
      url: URL,
      queryKey: QUERY_KEY.ADMIN_TAG,
      setSelectedItem,
      setIsOpenConfirmDelete,
      selectedItem,
      setIsOpenForm,
      table,
    });

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ADMIN_TAG],
    queryFn: async () => {
      const { data } = await api.get(URL);
      return data;
    },
  });

  const dataTableColumns = columns(isLoading);

  return (
    <>
      <PageCommon>
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
          setTable={setTable}
          pageSize={15}
        />
      </PageCommon>
    </>
  );
}
