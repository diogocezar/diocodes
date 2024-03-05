"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { TypeMentoring } from "@/types/type-mentoring";
import { Circle } from "@phosphor-icons/react";

export const columnsNames = [
  { id: "select", name: "select" },
  { id: "host", name: "Host" },
  { id: "startTime", name: "Início" },
  { id: "endTime", name: "Fim" },
  { id: "attendee", name: "Participante" },
  { id: "createdAt", name: "Criado em" },
];

export const columns = (isLoading: boolean): ColumnDef<TypeMentoring>[] => {
  return [
    {
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
      accessorKey: "host",
      accessorFn: (row) => row?.host?.name,
      header: ({ column }) => {
        return (
          <Button
            className="flex flex-row items-center gap-2"
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Host
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex flex-row items-center gap-2">
          {row.original?.invite.length > 0 ? (
            <Circle weight="fill" className="text-green h-4 w-4" />
          ) : (
            <Circle className="h-4 w-4" />
          )}
          {row.original?.host?.name}
        </div>
      ),
    },
    {
      accessorKey: "attendee",
      accessorFn: (row) => row?.attendee?.name,
      header: ({ column }) => {
        return (
          <Button
            className="flex flex-row items-center gap-2"
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Participante
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.original?.attendee?.name}</div>,
    },
    {
      accessorKey: "startTime",
      header: ({ column }) => {
        return (
          <Button
            className="flex flex-row items-center gap-2"
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Início
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>
          {`${new Date(row.getValue("startTime")).toLocaleDateString("pt-BR")} ${new Date(row.getValue("startTime")).toLocaleTimeString("pt-BR")}`}
        </div>
      ),
    },
    {
      accessorKey: "endTime",
      header: ({ column }) => {
        return (
          <Button
            className="flex flex-row items-center gap-2"
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fim
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>
          {`${new Date(row.getValue("endTime")).toLocaleDateString("pt-BR")} ${new Date(row.getValue("endTime")).toLocaleTimeString("pt-BR")}`}
        </div>
      ),
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
