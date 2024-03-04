"use client";
import { AdminTitle } from "@/components/containers/admin/shared/admin-title";
import { EnvelopeSimple } from "@phosphor-icons/react";
import {
  columns,
  columnsNames,
} from "@/app/(admin)/admin/(private)/invite/columns";
import * as React from "react";
import { DataTable } from "@/components/ui/data-table";
import { InviteForm } from "@/app/(admin)/admin/(private)/invite/form";
import { api } from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserState } from "@/hooks/use-user-state";
import ConfirmDelete from "@/components/containers/admin/shared/confirm-delete";
import { QUERY_KEY } from "@/contants/query-key";

export default function AdminInvitePage() {
  const queryClient = useQueryClient();
  const setIsOpenForm = useUserState((state) => state.setIsOpenForm);
  const isOpenConfirmDelete = useUserState(
    (state) => state.isOpenConfirmDelete,
  );
  const setIsOpenConfirmDelete = useUserState(
    (state) => state.setIsOpenConfirmDelete,
  );
  const setSelectedItem = useUserState((state) => state.setSelectedItem);
  const selectedItem = useUserState((state) => state.selectedItem);
  const url = "/admin/invite";
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ADMIN_INVITE],
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
      queryKey: [QUERY_KEY.ADMIN_INVITE],
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
        <AdminTitle title="Convites" Icon={<EnvelopeSimple />} />
        <ConfirmDelete
          isOpenConfirmDelete={isOpenConfirmDelete}
          setIsOpenConfirmDelete={setIsOpenConfirmDelete}
          handleDelete={handleDelete}
        />
        <DataTable
          form={<InviteForm />}
          data={data}
          columns={dataTableColumns}
          columnsNames={columnsNames}
          searchField="name"
          handleDelete={handleConfirmDelete}
          handleEdit={handleEdit}
          handleCreate={handleCreate}
          isLoading={isLoading}
          createButtonLabel="Criar convite"
          iconCreateButton={<EnvelopeSimple className="h-5 w-5" />}
        />
      </div>
    </>
  );
}