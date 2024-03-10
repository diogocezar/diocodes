"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { TypeAvaliation } from "@/types/type-avaliation";
import {
  formatMentoring,
  formatRating,
  formatTags,
  formatCreatedAt,
  formatSelect,
  formatDate,
} from "@/lib/format-columns";
import { formatHeader, formatHeaderSelect } from "@/lib/format-columns-header";

export const columnsNames = [
  { id: "select", name: "select" },
  { id: "mentoring", name: "Mentoria" },
  { id: "date", name: "Data" },
  { id: "tags", name: "Tags" },
  { id: "rating", name: "Nota" },
  { id: "createdAt", name: "Criado em" },
];

export const columns = (isLoading: boolean): ColumnDef<TypeAvaliation>[] => {
  return [
    {
      accessorKey: "select",
      size: 10,
      header: ({ table }) => formatHeaderSelect(isLoading, table),
      cell: ({ row }) => formatSelect(row),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "mentoring",
      accessorFn: (row) =>
        `${row?.mentoring?.attendee?.name} ${row?.mentoring?.host?.name}`,
      header: ({ column }) => formatHeader("Mentoria", column),
      cell: ({ row }) => <div>{formatMentoring(row)}</div>,
    },
    {
      accessorKey: "date",
      header: ({ column }) => formatHeader("Data", column),
      cell: ({ row }) => {
        const { startTime, endTime } = row.original?.mentoring;
        return formatDate(startTime, endTime);
      },
    },
    {
      accessorKey: "tags",
      size: 400,
      header: ({ column }) => formatHeader("Tags", column),
      cell: ({ row }) => <div>{formatTags(row)}</div>,
    },
    {
      accessorKey: "rating",
      header: ({ column }) => formatHeader("Nota", column),
      cell: ({ row }) => <div>{formatRating(row)}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => formatHeader("Criado em", column),
      cell: ({ row }) => <div>{formatCreatedAt(row)}</div>,
    },
  ];
};
