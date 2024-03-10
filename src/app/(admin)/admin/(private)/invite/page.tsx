"use client";
import { AdminTitle } from "@/components/containers/admin/shared/admin-title";
import { EnvelopeSimple, Spinner, ArrowClockwise } from "@phosphor-icons/react";
import {
  columns,
  columnsNames,
} from "@/app/(admin)/admin/(private)/invite/columns";
import * as React from "react";
import { DataTable } from "@/components/ui/data-table";
import { InviteForm } from "@/app/(admin)/admin/(private)/invite/form";
import { api } from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ConfirmDelete from "@/components/containers/admin/shared/confirm-delete";
import { QUERY_KEY } from "@/contants/query-key";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { dispatchError, dispatchSuccess } from "@/lib/toast";
import { useInviteState } from "@/hooks/use-invite-state";

function AditionalButtons({ table }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const rows = table.getFilteredSelectedRowModel().rows;
  const disabled = rows.length !== 1;
  const mentoringId = rows[0]?.original?.mentoringId;
  return (
    <>
      <Button
        disabled={disabled}
        onClick={async () => {
          try {
            setIsLoading(true);
            const result = await api.post("admin/invite/resend", {
              mentoringId,
            });
            if (result.status === 201) {
              dispatchSuccess("E-mail enviado com sucesso!");
            }
          } catch (error) {
            dispatchError("Houve um erro ao enviar o e-mail");
          } finally {
            setIsLoading(false);
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY.ADMIN_MENTORING],
            });
          }
        }}
        className="rounded-lg"
      >
        {isLoading ? (
          <div className="flex flex-row gap-2">
            <Spinner className="h-5 w-5 animate-spin" />
            Enviando...
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <ArrowClockwise className="h-5 w-5" />
            Reenviar
          </div>
        )}
      </Button>
    </>
  );
}

export default function AdminInvitePage() {
  const queryClient = useQueryClient();
  const setIsOpenForm = useInviteState((state) => state.setIsOpenForm);
  const isOpenConfirmDelete = useInviteState(
    (state) => state.isOpenConfirmDelete,
  );
  const setIsOpenConfirmDelete = useInviteState(
    (state) => state.setIsOpenConfirmDelete,
  );
  const setSelectedItem = useInviteState((state) => state.setSelectedItem);
  const selectedItem = useInviteState((state) => state.selectedItem);
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
          searchField="mentoring"
          handleDelete={handleConfirmDelete}
          handleEdit={handleEdit}
          handleCreate={handleCreate}
          isLoading={isLoading}
          createButtonLabel="Criar convite"
          iconCreateButton={<EnvelopeSimple className="h-5 w-5" />}
          aditionalButtons={<AditionalButtons />}
        />
      </div>
    </>
  );
}
