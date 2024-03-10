"use client";
import { AdminTitle } from "@/components/containers/admin/shared/admin-title";
import { Plant, ArrowsClockwise, Spinner } from "@phosphor-icons/react";
import {
  columns,
  columnsNames,
} from "@/app/(admin)/admin/(private)/mentoring/columns";
import * as React from "react";
import { DataTable } from "@/components/ui/data-table";
import { MentoringForm } from "@/app/(admin)/admin/(private)/mentoring/form";
import { api } from "@/services/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMentoringState } from "@/hooks/use-mentoring-state";
import ConfirmDelete from "@/components/containers/admin/shared/confirm-delete";
import { QUERY_KEY } from "@/contants/query-key";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { dispatchError, dispatchSuccess } from "@/lib/toast";

function AditionalButtons() {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  return (
    <Button
      disabled={isLoading}
      onClick={async () => {
        try {
          setIsLoading(true);
          const result = await api.get("admin/mentoring/sync");
          if (result.status === 200) {
            dispatchSuccess("Sincronizado com sucesso!");
          }
        } catch (error) {
          dispatchError("Houve um problema ao sincronizar");
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
          Sincronizando...
        </div>
      ) : (
        <div className="flex flex-row gap-2">
          <ArrowsClockwise className="h-5 w-5" />
          Sincronizar
        </div>
      )}
    </Button>
  );
}

export default function AdminMentoringPage() {
  const queryClient = useQueryClient();
  const setIsOpenForm = useMentoringState((state) => state.setIsOpenForm);
  const isOpenConfirmDelete = useMentoringState(
    (state) => state.isOpenConfirmDelete,
  );
  const setIsOpenConfirmDelete = useMentoringState(
    (state) => state.setIsOpenConfirmDelete,
  );
  const setSelectedItem = useMentoringState((state) => state.setSelectedItem);
  const selectedItem = useMentoringState((state) => state.selectedItem);
  const url = "/admin/mentoring";
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ADMIN_MENTORING],
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
      queryKey: [QUERY_KEY.ADMIN_MENTORING],
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
        <AdminTitle title="Mentorias" Icon={<Plant />} />
        <ConfirmDelete
          isOpenConfirmDelete={isOpenConfirmDelete}
          setIsOpenConfirmDelete={setIsOpenConfirmDelete}
          handleDelete={handleDelete}
        />
        <DataTable
          form={<MentoringForm />}
          data={data}
          columns={dataTableColumns}
          columnsNames={columnsNames}
          searchField="attendee"
          handleDelete={handleConfirmDelete}
          handleEdit={handleEdit}
          handleCreate={handleCreate}
          isLoading={isLoading}
          createButtonLabel="Criar mentoria"
          iconCreateButton={<Plant className="h-5 w-5" />}
          aditionalButtons={<AditionalButtons />}
        />
      </div>
    </>
  );
}
