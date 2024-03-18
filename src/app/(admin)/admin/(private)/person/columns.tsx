"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TypePerson } from "@/types/type-person";
import {
  formatCreatedAt,
  formatNameEmailWithAvatar,
  formatRowValue,
  formatSelect,
} from "@/lib/format-columns";
import { formatHeader, formatHeaderSelect } from "@/lib/format-columns-header";

export const columnsNames = [
  { id: "select", name: "select" },
  { id: "name", name: "Nome" },
  { id: "createdAt", name: "Criado em" },
];

export const columns = (isLoading: boolean): ColumnDef<TypePerson>[] => {
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
      cell: ({ row }) => (
        <div>
          {formatNameEmailWithAvatar(
            formatRowValue(row, "email"),
            formatRowValue(row, "name"),
          )}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => formatHeader("Email", column),
      cell: ({ row }) => <div>{formatRowValue(row, "email")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => formatHeader("Criado em", column),
      cell: ({ row }) => <div>{formatCreatedAt(row)}</div>,
    },
  ];
};
