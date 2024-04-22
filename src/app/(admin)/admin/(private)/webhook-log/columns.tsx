"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TypeWebhookLog } from "@/types/type-webhook-log";
import {
  formatCreatedAt,
  formatJson,
  formatRowValue,
  formatSelect,
} from "@/lib/format-columns";
import { formatHeader, formatHeaderSelect } from "@/lib/format-columns-header";

export const columnsNames = [
  { id: "select", name: "select" },
  { id: "type", name: "Tipo" },
  { id: "payload", name: "Payload" },
  { id: "createdAt", name: "Criado em" },
];

export const columns = (isLoading: boolean): ColumnDef<TypeWebhookLog>[] => {
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
      accessorKey: "type",
      header: ({ column }) => formatHeader("Tipo", column),
      cell: ({ row }) => <div>{formatRowValue(row, "type")}</div>,
    },
    {
      accessorKey: "payload",
      header: ({ column }) => formatHeader("Payload", column),
      cell: ({ row }) => <div>{formatJson(row, "payload")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => formatHeader("Criado em", column),
      cell: ({ row }) => <div>{formatCreatedAt(row)}</div>,
    },
  ];
};
