"use client";
import { Star } from "@phosphor-icons/react";
import {
  columns,
  columnsNames,
} from "@/app/(admin)/admin/(private)/avaliation/columns";
import * as React from "react";
import { DataTable } from "@/components/ui/data-table";
import { AvaliationForm } from "@/app/(admin)/admin/(private)/avaliation/form";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useAvaliationState } from "@/hooks/use-avaliation-state";
import ConfirmDelete from "@/components/containers/admin/shared/confirm-delete";
import { QUERY_KEY } from "@/contants/query-key";
import { useControls } from "@/hooks/use-controls";
import PageCommon from "@/components/containers/admin/shared/page-common";

export default function AdminMentoringPage() {
  const setIsOpenForm = useAvaliationState((state) => state.setIsOpenForm);
  const isOpenConfirmDelete = useAvaliationState(
    (state) => state.isOpenConfirmDelete,
  );
  const setIsOpenConfirmDelete = useAvaliationState(
    (state) => state.setIsOpenConfirmDelete,
  );
  const setSelectedItem = useAvaliationState((state) => state.setSelectedItem);
  const selectedItem = useAvaliationState((state) => state.selectedItem);
  const setTable = useAvaliationState((state) => state.setTable);
  const table = useAvaliationState((state) => state.table);

  const URL = "/admin/avaliation";

  const { handleConfirmDelete, handleDelete, handleEdit, handleCreate } =
    useControls({
      url: URL,
      queryKey: QUERY_KEY.ADMIN_AVALIATION,
      setSelectedItem,
      setIsOpenConfirmDelete,
      selectedItem,
      setIsOpenForm,
      table,
    });

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ADMIN_AVALIATION],
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
          form={<AvaliationForm />}
          data={data}
          columns={dataTableColumns}
          columnsNames={columnsNames}
          searchField="mentoring"
          handleDelete={handleConfirmDelete}
          handleEdit={handleEdit}
          handleCreate={handleCreate}
          isLoading={isLoading}
          createButtonLabel="Criar avaliação"
          iconCreateButton={<Star className="h-5 w-5" />}
          setTable={setTable}
          pageSize={8}
        />
      </PageCommon>
    </>
  );
}
