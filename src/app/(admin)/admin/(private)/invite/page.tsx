"use client";
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
import { dispatchError, dispatchPromise, dispatchSuccess } from "@/lib/toast";
import { useInviteState } from "@/hooks/use-invite-state";
import { useControls } from "@/hooks/use-controls";
import PageCommon from "@/components/containers/admin/shared/page-common";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

function AditionalButtons({ table }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const rows = table.getFilteredSelectedRowModel().rows;
  const disabled = rows.length !== 1;
  const mentoringId = rows[0]?.original?.mentoringId;
  return (
    <>
      <DropdownMenuItem
        disabled={disabled}
        className="flex flex-row gap-2 rounded-lg"
        onClick={async () => {
          try {
            setIsLoading(true);

            const promise = api.post("admin/invite/resend", {
              mentoringId,
            });
            dispatchPromise("Enviando um novo convite...", promise);
          } finally {
            setIsLoading(false);
            await queryClient.invalidateQueries({
              queryKey: [QUERY_KEY.ADMIN_MENTORING],
            });
            table.toggleAllRowsSelected(false);
          }
        }}
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
      </DropdownMenuItem>
    </>
  );
}

export default function AdminInvitePage() {
  const setIsOpenForm = useInviteState((state) => state.setIsOpenForm);
  const isOpenConfirmDelete = useInviteState(
    (state) => state.isOpenConfirmDelete,
  );
  const setIsOpenConfirmDelete = useInviteState(
    (state) => state.setIsOpenConfirmDelete,
  );
  const setSelectedItem = useInviteState((state) => state.setSelectedItem);
  const selectedItem = useInviteState((state) => state.selectedItem);
  const setTable = useInviteState((state) => state.setTable);
  const table = useInviteState((state) => state.table);

  const URL = "/admin/invite";

  const { handleConfirmDelete, handleDelete, handleEdit, handleCreate } =
    useControls({
      url: URL,
      queryKey: QUERY_KEY.ADMIN_INVITE,
      setSelectedItem,
      setIsOpenConfirmDelete,
      selectedItem,
      setIsOpenForm,
      table,
    });

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ADMIN_INVITE],
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
          setTable={setTable}
          pageSize={15}
        />
      </PageCommon>
    </>
  );
}
