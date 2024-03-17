"use client";
import { User } from "@phosphor-icons/react";
import {
  columns,
  columnsNames,
} from "@/app/(admin)/admin/(private)/user/columns";
import * as React from "react";
import { DataTable } from "@/components/ui/data-table";
import { UserForm } from "@/app/(admin)/admin/(private)/user/form";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useUserState } from "@/hooks/use-user-state";
import ConfirmDelete from "@/components/containers/admin/shared/confirm-delete";
import { QUERY_KEY } from "@/contants/query-key";
import { useControls } from "@/hooks/use-controls";
import PageCommon from "@/components/containers/admin/shared/page-common";

export default function AdminUserPage() {
  const setIsOpenForm = useUserState((state) => state.setIsOpenForm);
  const isOpenConfirmDelete = useUserState(
    (state) => state.isOpenConfirmDelete,
  );
  const setIsOpenConfirmDelete = useUserState(
    (state) => state.setIsOpenConfirmDelete,
  );
  const setSelectedItem = useUserState((state) => state.setSelectedItem);
  const selectedItem = useUserState((state) => state.selectedItem);
  const setTable = useUserState((state) => state.setTable);
  const table = useUserState((state) => state.table);

  const URL = "/admin/user";

  const { handleConfirmDelete, handleDelete, handleEdit, handleCreate } =
    useControls({
      url: URL,
      queryKey: QUERY_KEY.ADMIN_PERSON,
      setSelectedItem,
      setIsOpenConfirmDelete,
      selectedItem,
      setIsOpenForm,
      table,
    });

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ADMIN_USER],
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
          form={<UserForm />}
          data={data}
          columns={dataTableColumns}
          columnsNames={columnsNames}
          searchField="name"
          handleDelete={handleConfirmDelete}
          handleEdit={handleEdit}
          handleCreate={handleCreate}
          isLoading={isLoading}
          createButtonLabel="Criar usuário"
          iconCreateButton={<User className="h-5 w-5" />}
          setTable={setTable}
          pageSize={15}
        />
      </PageCommon>
    </>
  );
}
