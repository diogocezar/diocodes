"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TypeLog } from "@/types/type-log";
import {
  formatCreatedAt,
  formatRowValue,
  formatSelect,
} from "@/lib/format-columns";
import { formatHeader, formatHeaderSelect } from "@/lib/format-columns-header";

export const columnsNames = [
  { id: "select", name: "select" },
  { id: "source", name: "Fonte" },
  { id: "level", name: "Level" },
  { id: "message", name: "Mensagem" },
  { id: "meta", name: "Metadados" },
  { id: "createdAt", name: "Criado em" },
];

export const columns = (isLoading: boolean): ColumnDef<TypeLog>[] => {
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
      accessorKey: "source",
      header: ({ column }) => formatHeader("Fonte", column),
      cell: ({ row }) => <div>{formatRowValue(row, "source")}</div>,
    },
    {
      accessorKey: "level",
      header: ({ column }) => formatHeader("Level", column),
      cell: ({ row }) => <div>{formatRowValue(row, "level")}</div>,
    },
    {
      accessorKey: "message",
      header: ({ column }) => formatHeader("Mensagem", column),
      cell: ({ row }) => <div>{formatRowValue(row, "message")}</div>,
    },
    {
      accessorKey: "meta",
      header: ({ column }) => formatHeader("Metadados", column),
      cell: ({ row }) => <div>{formatRowValue(row, "meta")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => formatHeader("Criado em", column),
      cell: ({ row }) => <div>{formatCreatedAt(row)}</div>,
    },
  ];
};
