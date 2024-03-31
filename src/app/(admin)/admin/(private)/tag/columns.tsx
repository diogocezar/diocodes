"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TypeTag } from "@/types/type-tag";
import {
  formatCreatedAt,
  formatRowValue,
  formatSelect,
  formatTagQuantity,
} from "@/lib/format-columns";
import { formatHeader, formatHeaderSelect } from "@/lib/format-columns-header";

export const columnsNames = [
  { id: "select", name: "select" },
  { id: "name", name: "Nome" },
  { id: "occurrences", name: "Ocorrências" },
  { id: "createdAt", name: "Criado em" },
];

export const columns = (
  isLoading: boolean,
  maxTagUsed: number,
): ColumnDef<TypeTag>[] => {
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
      header: ({ column }) => formatHeader("Nome", column),
      cell: ({ row }) => <div>{formatRowValue(row, "name")}</div>,
    },
    {
      accessorKey: "occurrences",
      accessorFn: (row) => row.avaliationTags.length,
      header: ({ column }) => formatHeader("Ocorrências", column),
      cell: ({ row }) => <div>{formatTagQuantity(row, maxTagUsed)}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => formatHeader("Criado em", column),
      cell: ({ row }) => <div>{formatCreatedAt(row)}</div>,
    },
  ];
};
