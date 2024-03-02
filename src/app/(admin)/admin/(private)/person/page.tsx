"use client";
import { AdminTitle } from "@/components/containers/admin/shared/admin-title";
import { User } from "@phosphor-icons/react";
import {
  columns,
  columnsNames,
} from "@/app/(admin)/admin/(private)/person/columns";
import * as React from "react";
import { DataTable } from "@/components/ui/data-table";
import { PersonForm } from "@/app/(admin)/admin/(private)/person/form";
import { api } from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePersonState } from "@/hooks/use-person-state";
import ConfirmDelete from "@/components/containers/admin/shared/confirm-delete";
import { QUERY_KEY } from "@/contants/query-key";

export default function AdminPersonPage() {
  const queryClient = useQueryClient();
  const setIsOpenForm = usePersonState((state) => state.setIsOpenForm);
  const isOpenConfirmDelete = usePersonState(
    (state) => state.isOpenConfirmDelete,
  );
  const setIsOpenConfirmDelete = usePersonState(
    (state) => state.setIsOpenConfirmDelete,
  );
  const setSelectedItem = usePersonState((state) => state.setSelectedItem);
  const selectedItem = usePersonState((state) => state.selectedItem);
  const url = "/admin/person";
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ADMIN_PERSON],
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
      queryKey: [QUERY_KEY.ADMIN_PERSON],
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
        <AdminTitle title="Pessoas" Icon={<User />} />
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
          iconCreateButton={<User className="h-5 w-5" />}
        />
      </div>
    </>
  );
}
