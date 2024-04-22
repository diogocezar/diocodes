"use client";
import { Tag as TagIcon } from "@phosphor-icons/react";
import {
  columns,
  columnsNames,
} from "@/app/(admin)/admin/(private)/webhook-log/columns";
import * as React from "react";
import { DataTable } from "@/components/ui/data-table";
import { TagForm } from "@/app/(admin)/admin/(private)/tag/form";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useWebhookLogState } from "@/hooks/use-webhook-log-state";
import ConfirmDelete from "@/components/containers/admin/shared/confirm-delete";
import { QUERY_KEY } from "@/contants/query-key";
import { useControls } from "@/hooks/use-controls";
import PageCommon from "@/components/containers/admin/shared/page-common";
import { useMaxTagUsed } from "@/hooks/use-get-tag";

export default function AdminWebhookLogPage() {
  const setIsOpenForm = useWebhookLogState((state) => state.setIsOpenForm);
  const isOpenConfirmDelete = useWebhookLogState(
    (state) => state.isOpenConfirmDelete,
  );
  const setIsOpenConfirmDelete = useWebhookLogState(
    (state) => state.setIsOpenConfirmDelete,
  );
  const setSelectedItem = useWebhookLogState((state) => state.setSelectedItem);
  const selectedItem = useWebhookLogState((state) => state.selectedItem);
  const setTable = useWebhookLogState((state) => state.setTable);
  const table = useWebhookLogState((state) => state.table);

  const URL = "/admin/webhook";

  const { handleConfirmDelete, handleDelete, handleEdit, handleCreate } =
    useControls({
      url: URL,
      queryKey: QUERY_KEY.ADMIN_WEBHOOK,
      setSelectedItem,
      setIsOpenConfirmDelete,
      selectedItem,
      setIsOpenForm,
      table,
    });

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ADMIN_WEBHOOK],
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
          searchField="createdAt"
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
