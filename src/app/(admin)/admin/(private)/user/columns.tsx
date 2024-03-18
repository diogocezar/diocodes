"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TypeUser } from "@/types/type-user";
import {
  formatCreatedAt,
  formatNameEmailWithAvatar,
  formatRowValue,
  formatSelect,
} from "@/lib/format-columns";
import { formatHeader, formatHeaderSelect } from "@/lib/format-columns-header";

export const columnsNames = [
  { id: "select", name: "select" },
  { id: "name", name: "Nome (Pessoa)" },
  { id: "email", name: "E-mail (Pessoa)" },
  { id: "createdAt", name: "Criado em" },
];

export const columns = (isLoading: boolean): ColumnDef<TypeUser>[] => {
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
      accessorFn: (row) => row?.person?.email,
      header: ({ column }) => formatHeader("Email", column),
      cell: ({ row }) => <div>{formatRowValue(row, "email")}</div>,
    },
    {
      accessorKey: "role",
      header: ({ column }) => formatHeader("Permissão", column),
      cell: ({ row }) => <div>{formatRowValue(row, "role")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => formatHeader("Criado em", column),
      cell: ({ row }) => <div>{formatCreatedAt(row)}</div>,
    },
  ];
};
