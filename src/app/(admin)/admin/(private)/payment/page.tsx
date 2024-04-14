"use client";
import { PiggyBank } from "@phosphor-icons/react";
import {
  columns,
  columnsNames,
} from "@/app/(admin)/admin/(private)/payment/columns";
import * as React from "react";
import { DataTable } from "@/components/ui/data-table";
import { PaymentForm } from "@/app/(admin)/admin/(private)/payment/form";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { usePaymentState } from "@/hooks/use-payment-state";
import ConfirmDelete from "@/components/containers/admin/shared/confirm-delete";
import { QUERY_KEY } from "@/contants/query-key";
import { useControls } from "@/hooks/use-controls";
import PageCommon from "@/components/containers/admin/shared/page-common";

export default function AdminPaymentPage() {
  const setIsOpenForm = usePaymentState((state) => state.setIsOpenForm);
  const isOpenConfirmDelete = usePaymentState(
    (state) => state.isOpenConfirmDelete,
  );
  const setIsOpenConfirmDelete = usePaymentState(
    (state) => state.setIsOpenConfirmDelete,
  );
  const setSelectedItem = usePaymentState((state) => state.setSelectedItem);
  const selectedItem = usePaymentState((state) => state.selectedItem);
  const setTable = usePaymentState((state) => state.setTable);
  const table = usePaymentState((state) => state.table);

  const URL = "/admin/payment";

  const { handleConfirmDelete, handleDelete, handleEdit, handleCreate } =
    useControls({
      url: URL,
      queryKey: QUERY_KEY.ADMIN_PAYMENT,
      setSelectedItem,
      setIsOpenConfirmDelete,
      selectedItem,
      setIsOpenForm,
      table,
    });

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY.ADMIN_PAYMENT],
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
          form={<PaymentForm />}
          data={data}
          columns={dataTableColumns}
          columnsNames={columnsNames}
          searchField="name"
          handleDelete={handleConfirmDelete}
          handleEdit={handleEdit}
          handleCreate={handleCreate}
          isLoading={isLoading}
          createButtonLabel="Criar pagamento"
          iconCreateButton={<PiggyBank className="h-5 w-5" />}
          setTable={setTable}
          pageSize={15}
        />
      </PageCommon>
    </>
  );
}
