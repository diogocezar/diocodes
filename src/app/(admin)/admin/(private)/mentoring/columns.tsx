"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { TypeMentoring } from "@/types/type-mentoring";
import { Circle } from "@phosphor-icons/react";

export const columnsNames = [
  { id: "select", name: "select" },
  { id: "attendee", name: "Participante" },
  { id: "date", name: "Data" },
  { id: "message", name: "Mensagem" },
  { id: "createdAt", name: "Criado em" },
];

export const columns = (isLoading: boolean): ColumnDef<TypeMentoring>[] => {
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
        <div className="flex flex-row gap-4">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
          {row.original?.invite.length > 0 ? (
            <Circle
              weight="fill"
              className="text-green h-4 w-4 animate-pulse"
            />
          ) : (
            <Circle className="h-4 w-4 opacity-20" />
          )}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
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
      accessorKey: "date",
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
        <div className="flex flex-col">
          <span className="text-xs">{`${new Date(row.original?.startTime).toLocaleDateString("pt-BR")}`}</span>
          <span className="text-xs opacity-40">
            {new Date(row.original?.startTime).toLocaleTimeString("pt-BR")}
            {" - "}
            {new Date(row.original?.endTime).toLocaleTimeString("pt-BR")}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "externalMessage",
      size: 50,
      header: ({ column }) => {
        return (
          <Button
            className="flex flex-row items-center gap-2"
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Mensagem
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="h-[30px] w-full overflow-hidden overflow-ellipsis text-xs">
          {row.getValue("externalMessage")}
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
