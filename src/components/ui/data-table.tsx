import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  ArrowRight,
  Funnel,
  MagnifyingGlass,
  PaintBrush,
  Spinner,
  Tag,
  Trash,
} from "@phosphor-icons/react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import React, { ReactElement } from "react";

type DataTableProps = {
  form: ReactElement;
  data: any[];
  columns: any[];
  columnsNames: Array<Object>;
  searchField: string;
  handleDelete: Function;
  handleEdit: Function;
  handleCreate: Function;
  isLoading: boolean;
};

export default function DataTable({
  form,
  data,
  columns,
  columnsNames,
  searchField,
  handleDelete,
  handleEdit,
  handleCreate,
  isLoading,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    initialState: { pagination: { pageSize: 15 } },
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const disabledFilter = isLoading;
  const disabledDelete = !(
    !isLoading && table.getFilteredSelectedRowModel().rows.length
  );
  const disabledEdit = !(
    !isLoading && table.getFilteredSelectedRowModel().rows.length === 1
  );
  return (
    <div className="mt-0 w-full pt-8">
      <div className="mb-4 flex h-[60px] items-center justify-between">
        <div className="min-w-sm w-1/4">
          <MagnifyingGlass className="text-muted-foreground absolute ml-[13px] mt-[13px] h-5 w-5" />
          <Input
            placeholder="Procurar..."
            value={
              (table.getColumn(searchField)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchField)?.setFilterValue(event.target.value)
            }
            className="rouded-lg pl-10"
          />
        </div>
        <div className="flex flex-row items-center gap-4">
          {form}
          <Button
            onClick={() => {
              handleCreate(table.getFilteredSelectedRowModel().rows);
            }}
            className="flex flex-row gap-2 rounded-lg"
          >
            <Tag className="h-5 w-5" /> Criar Tag
          </Button>
          <Button
            className="flex flex-row gap-2 rounded-lg"
            disabled={disabledDelete}
            onClick={() => {
              handleDelete(table.getFilteredSelectedRowModel().rows);
            }}
          >
            <Trash className="h-5 w-5" /> Excluir
          </Button>
          <Button
            className="flex flex-row gap-2 rounded-lg"
            disabled={disabledEdit}
            onClick={() => {
              handleEdit(table.getFilteredSelectedRowModel().rows);
            }}
          >
            <PaintBrush className="h-5 w-5" /> Editar
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex flex-row gap-2"
                disabled={disabledFilter}
              >
                <Funnel className="h-5 w-5" /> Filtrar Colunas{" "}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="bg-card w-full border-0"
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column: any) => {
                  const foundItem: any = columnsNames?.find(
                    (item: any) => item.id === column.id
                  );
                  const columnName = foundItem ? foundItem.name : column.id;
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {columnName}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="bg-card shadow-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-foreground bg-background-dark text-base font-bold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {!isLoading && table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="text-foreground"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-foreground h-24 text-center"
                >
                  {!isLoading ? (
                    "Não forram encontrados resultados."
                  ) : (
                    <div className="flex w-full flex-row items-center justify-center gap-2">
                      <Spinner size={20} className="animate-spin" />
                      Carregando...
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 pb-0">
        <div className="text-muted-foreground flex-1 text-sm">
          {!isLoading ? table.getFilteredSelectedRowModel().rows.length : 0} de{" "}
          {!isLoading ? table.getFilteredRowModel().rows.length : 0} linhas
          selecionada(s).
        </div>
        <div className="flex flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!isLoading && !table.getCanPreviousPage()}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!isLoading && !table.getCanNextPage()}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
