"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { TypeAvaliation } from "@/types/type-avaliation";
import { Badge } from "@/components/ui/badge";
import { Star } from "@phosphor-icons/react";

export const columnsNames = [
  { id: "select", name: "select" },
  { id: "mentoring", name: "Mentoria" },
  { id: "date", name: "Data" },
  { id: "tags", name: "Tags" },
  { id: "rating", name: "Nota" },
  { id: "createdAt", name: "Criado em" },
];

const formatMentoring = (row: any) => {
  const { original } = row;
  const { mentoring } = original;
  const { attendee } = mentoring;
  return `${attendee.name}`;
};

const formatTags = (row: any) => {
  const { original } = row;
  const { avaliationTags } = original;
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {avaliationTags.map((avaliationTag: any) => {
        return (
          <Badge
            key={avaliationTag?.tag?.name}
            className="bg-background text-foreground rounded-md px-4 py-1 text-sm font-normal"
            variant="secondary"
          >
            {avaliationTag?.tag?.name}
          </Badge>
        );
      })}
    </div>
  );
};

const formatRating = (row: any) => {
  const { original } = row;
  const { rating } = original;
  const normalizedValue = Math.min(Math.max(rating, 1), 5);
  const filledStars = Array.from(
    { length: normalizedValue },
    (_, index) => index + 1,
  );
  const emptyStars = Array.from(
    { length: 5 - normalizedValue },
    (_, index) => index + 1 + normalizedValue,
  );
  return (
    <div className="flex flex-row">
      {filledStars.map((_, index) => (
        <Star key={index} weight="fill" className="text-foreground" size={20} />
      ))}
      {emptyStars.map((_, index) => (
        <Star key={index} className="text-foreground opacity-20" size={20} />
      ))}
    </div>
  );
};

export const columns = (isLoading: boolean): ColumnDef<TypeAvaliation>[] => {
  return [
    {
      accessorKey: "select",
      size: 10,
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
      accessorKey: "mentoring",
      accessorFn: (row) =>
        `${row?.mentoring?.attendee?.name} ${row?.mentoring?.host?.name}`,
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
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            className="flex flex-row items-center gap-2"
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-xs">{`${new Date(row.original?.mentoring?.startTime).toLocaleDateString("pt-BR")}`}</span>
          <span className="text-xs opacity-40">
            {new Date(row.original?.mentoring?.startTime).toLocaleTimeString(
              "pt-BR",
            )}
            {" - "}
            {new Date(row.original?.mentoring?.endTime).toLocaleTimeString(
              "pt-BR",
            )}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "tags",
      size: 400,
      header: ({ column }) => {
        return (
          <Button
            className="flex flex-row items-center gap-2"
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tags
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{formatTags(row)}</div>,
    },
    {
      accessorKey: "rating",
      header: ({ column }) => {
        return (
          <Button
            className="flex flex-row items-center gap-2"
            variant="link"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nota
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{formatRating(row)}</div>,
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
