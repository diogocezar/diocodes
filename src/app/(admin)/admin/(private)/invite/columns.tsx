"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TypeInvite } from "@/types/type-invite";
import {
  formatMentoring,
  formatSelectInvite,
  formatDate,
  formatCreatedAt,
} from "@/lib/format-columns";
import { formatHeader, formatHeaderSelect } from "@/lib/format-columns-header";

export const columnsNames = [
  { id: "select", name: "select" },
  { id: "date", name: "Data" },
  { id: "mentoring", name: "Mentoria" },
  { id: "createdAt", name: "Criado em" },
];

export const columns = (isLoading: boolean): ColumnDef<TypeInvite>[] => {
  return [
    {
      size: 10,
      accessorKey: "select",
      header: ({ table }) => formatHeaderSelect(isLoading, table),
      cell: ({ row }) => formatSelectInvite(row),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "mentoring",
      accessorFn: (row) => row?.mentoring?.attendee?.name,
      header: ({ column }) => formatHeader("Mentoria", column),
      cell: ({ row }) => <div>{formatMentoring(row)}</div>,
    },
    {
      accessorKey: "date",
      accessorFn: (row) => row?.mentoring?.attendee?.name,
      header: ({ column }) => formatHeader("Data", column),
      cell: ({ row }) => {
        const { startTime, endTime } = row.original?.mentoring;
        return formatDate(startTime, endTime);
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => formatHeader("Criado em", column),
      cell: ({ row }) => <div>{formatCreatedAt(row)}</div>,
    },
  ];
};
