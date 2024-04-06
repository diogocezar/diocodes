"use client";
import { Users } from "@phosphor-icons/react";
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
import { useControls } from "@/hooks/use-controls";
import PageCommon from "@/components/containers/admin/shared/page-common";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { dispatchPromise } from "@/lib/toast";
import { ArrowBendRightUp, Spinner } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

function AditionalButtons() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  return (
    <DropdownMenuItem
      disabled={isLoading}
      className="flex flex-row gap-2 rounded-lg"
      onClick={async () => {
        try {
          setIsLoading(true);
          const promise = api.get("admin/person/sync");
          dispatchPromise("Sincronizando audiência...", promise);
        } finally {
          setIsLoading(false);
          await queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.ADMIN_MENTORING],
          });
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
          <ArrowBendRightUp className="h-5 w-5" />
          Sincronizar Audiência
        </div>
      )}
    </DropdownMenuItem>
  );
}

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
  const setTable = usePersonState((state) => state.setTable);
  const table = usePersonState((state) => state.table);

  const URL = "/admin/person";

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
    queryKey: [QUERY_KEY.ADMIN_PERSON],
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
          aditionalButtons={<AditionalButtons />}
          setTable={setTable}
          pageSize={15}
        />
      </PageCommon>
    </>
  );
}
