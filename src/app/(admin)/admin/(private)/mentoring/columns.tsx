"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TypeMentoring } from "@/types/type-mentoring";
import {
  formatAttendee,
  formatCreatedAt,
  formatDate,
  formatExternalMessage,
  formatSelectMentoring,
  formatType,
} from "@/lib/format-columns";
import { formatHeader, formatHeaderSelect } from "@/lib/format-columns-header";

export const columnsNames = [
  { id: "select", name: "select" },
  { id: "attendee", name: "Participante" },
  { id: "type", name: "Tipo" },
  { id: "date", name: "Data" },
  { id: "message", name: "Mensagem" },
  { id: "createdAt", name: "Criado em" },
];

export const columns = (isLoading: boolean): ColumnDef<TypeMentoring>[] => {
  return [
    {
      size: 10,
      accessorKey: "select",
      header: ({ table }) => formatHeaderSelect(isLoading, table),
      cell: ({ row }) => formatSelectMentoring(row),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "attendee",
      accessorFn: (row) => row?.attendee?.name,
      header: ({ column }) => formatHeader("Participante", column),
      cell: ({ row }) => <div>{formatAttendee(row)}</div>,
    },
    {
      accessorKey: "type",
      header: ({ column }) => formatHeader("Tipo", column),
      cell: ({ row }) => <div>{formatType(row)}</div>,
    },
    {
      accessorKey: "date",
      header: ({ column }) => formatHeader("Data", column),
      cell: ({ row }) => {
        const { startTime, endTime } = row.original;
        return formatDate(startTime, endTime);
      },
    },
    {
      accessorKey: "externalMessage",
      size: 50,
      header: ({ column }) => formatHeader("Mensagem", column),
      cell: ({ row }) => formatExternalMessage(row),
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => formatHeader("Criado em", column),
      cell: ({ row }) => <div>{formatCreatedAt(row)}</div>,
    },
  ];
};
