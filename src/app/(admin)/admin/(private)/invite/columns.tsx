"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { TypeInvite } from "@/types/type-invite";

export const columnsNames = [
  { id: "select", name: "select" },
  { id: "date", name: "Data" },
  { id: "mentoring", name: "Mentoria" },
  { id: "createdAt", name: "Criado em" },
];

const formatMentoring = (row: any) => {
  const { original } = row;
  const { mentoring } = original;
  const { host, attendee } = mentoring;
  return `${attendee.name} & ${host.name}`;
};

const formatDate = (row: any) => {
  const { original } = row;
  const { mentoring } = original;
  const { startTime } = mentoring;
  return `${new Date(startTime).toLocaleDateString("pt-BR")} - ${new Date(startTime).toLocaleTimeString("pt-BR")}`;
};

export const columns = (isLoading: boolean): ColumnDef<TypeInvite>[] => {
  return [
    {
      size: 10,
      accessorKey: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            (!isLoading && table.getIsAllPageRowsSelected()) ||
            (!isLoading && table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "date",
      size: 10,
      accessorFn: (row) => row?.mentoring?.attendee?.name,
      header: ({ column }) => {
        return (
          <Button
            className="flex flex-row items-center gap-2"
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mentoria
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{formatDate(row)}</div>,
    },
    {
      accessorKey: "mentoring",
      accessorFn: (row) => row?.mentoring?.attendee?.name,
      header: ({ column }) => {
        return (
          <Button
            className="flex flex-row items-center gap-2"
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mentoria
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{formatMentoring(row)}</div>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            className="flex flex-row items-center gap-2"
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Criado em
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>
          {new Date(row.getValue("createdAt")).toLocaleDateString("pt-BR")}
        </div>
      ),
    },
  ];
};
