"use client";
import { AdminTitle } from "@/components/containers/admin/shared/admin-title";
import { Users } from "@phosphor-icons/react";
import {
  columns,
  columnsNames,
} from "@/app/(admin)/admin/(private)/person/columns";
import * as React from "react";
import { DataTable } from "@/components/ui/data-table";
import { PersonForm } from "@/app/(admin)/admin/(private)/person/form";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { usePersonState } from "@/hooks/use-person-state";
import ConfirmDelete from "@/components/containers/admin/shared/confirm-delete";
import { QUERY_KEY } from "@/contants/query-key";
import { useControls } from "@/hooks/use-controls";

export default function AdminPersonPage() {
  const setIsOpenForm = usePersonState((state) => state.setIsOpenForm);
  const isOpenConfirmDelete = usePersonState(
    (state) => state.isOpenConfirmDelete,
  );
  const setIsOpenConfirmDelete = usePersonState(
    (state) => state.setIsOpenConfirmDelete,
  );
  const setSelectedItem = usePersonState((state) => state.setSelectedItem);
  const selectedItem = usePersonState((state) => state.selectedItem);

  const URL = "/admin/person";

  const { handleConfirmDelete, handleDelete, handleEdit, handleCreate } =
    useControls({
      url: URL,
      queryKey: QUERY_KEY.ADMIN_PERSON,
      setSelectedItem,
      setIsOpenConfirmDelete,
      selectedItem,
      setIsOpenForm,
    });

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ADMIN_PERSON],
    queryFn: async () => {
      const { data } = await api.get(URL);
      return data;
    },
  });

  const dataTableColumns = columns(isLoading);

  return (
    <>
      <div className="flex-1 p-8 pt-6">
        <AdminTitle title="Pessoas" Icon={<Users />} />
        <ConfirmDelete
          isOpenConfirmDelete={isOpenConfirmDelete}
          setIsOpenConfirmDelete={setIsOpenConfirmDelete}
          handleDelete={handleDelete}
        />
        <DataTable
          form={<PersonForm />}
          data={data}
          columns={dataTableColumns}
          columnsNames={columnsNames}
          searchField="name"
          handleDelete={handleConfirmDelete}
          handleEdit={handleEdit}
          handleCreate={handleCreate}
          isLoading={isLoading}
          createButtonLabel="Criar pessoa"
          iconCreateButton={<Users className="h-5 w-5" />}
        />
      </div>
    </>
  );
}
