"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TypePayment } from "@/types/type-payment";
import {
  formatCreatedAt,
  formatNameEmailWithAvatar,
  formatNormalDate,
  formatRowValue,
  formatSelect,
} from "@/lib/format-columns";
import { formatHeader, formatHeaderSelect } from "@/lib/format-columns-header";
import { formatCurrency } from "@/lib/utils";

export const columnsNames = [
  { id: "select", name: "select" },
  { id: "name", name: "Nome" },
  { id: "amount", name: "Valor" },
  { id: "date", name: "Data do Pagamento" },
  { id: "createdAt", name: "Criado em" },
];

export const columns = (isLoading: boolean): ColumnDef<TypePayment>[] => {
  return [
    {
      size: 10,
      accessorKey: "select",
      header: ({ table }) => formatHeaderSelect(isLoading, table),
      cell: ({ row }) => formatSelect(row),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      accessorFn: (row) => row?.person?.name,
      header: ({ column }) => formatHeader("Nome", column),
      cell: ({ row }) => {
        const { name, email } = row.original.person;
        return formatNameEmailWithAvatar(email, name);
      },
    },
    {
      accessorKey: "amount",
      accessorFn: (row) => row?.amount,
      header: ({ column }) => formatHeader("Valor", column),
      cell: ({ row }) => (
        <div>{formatCurrency(formatRowValue(row, "amount"))}</div>
      ),
    },
    {
      accessorKey: "date",
      accessorFn: (row) => row?.date,
      header: ({ column }) => formatHeader("Data do Pagamento", column),
      cell: ({ row }) => <div>{formatNormalDate(row, "date")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => formatHeader("Criado em", column),
      cell: ({ row }) => <div>{formatCreatedAt(row)}</div>,
    },
  ];
};
