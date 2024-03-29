import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  DotsThreeOutlineVertical,
  MagnifyingGlass,
  PaintBrush,
  Spinner,
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

type AditionalButtonsProps = {
  table: any;
};

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
  createButtonLabel: string;
  iconCreateButton: JSX.Element;
  aditionalButtons?: ReactElement<AditionalButtonsProps>;
  setTable: Function;
  pageSize: number;
};

export function DataTable({
  form,
  data,
  columns,
  columnsNames,
  searchField,
  handleDelete,
  handleEdit,
  handleCreate,
  isLoading,
  createButtonLabel = "Criar",
  iconCreateButton,
  aditionalButtons,
  setTable,
  pageSize = 15,
}: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    initialState: { pagination: { pageSize } },
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

  setTable(table);

  const disabledFilter = isLoading;
  const disabledCreate =
    !isLoading && table.getFilteredSelectedRowModel().rows.length !== 0;
  const disabledDelete = !(
    !isLoading && table.getFilteredSelectedRowModel().rows.length
  );
  const disabledEdit = !(
    !isLoading && table.getFilteredSelectedRowModel().rows.length === 1
  );

  return (
    <div className="mt-0 flex h-screen w-full flex-col p-6">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="flex flex-row items-center gap-2 rounded-lg">
                <DotsThreeOutlineVertical className="h-5 w-5" /> Opções
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="bg-background-dark text-foreground w-full border-0"
            >
              <DropdownMenuItem
                disabled={disabledCreate}
                className="flex flex-row gap-2 rounded-lg"
                onClick={() => {
                  handleCreate(table.getFilteredSelectedRowModel().rows);
                }}
              >
                {iconCreateButton}
                <span>{createButtonLabel}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={disabledEdit}
                className="flex flex-row gap-2 rounded-lg"
                onClick={() => {
                  handleEdit(table.getFilteredSelectedRowModel().rows);
                }}
              >
                <PaintBrush className="h-5 w-5" />
                <span>Editar</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={disabledDelete}
                className="flex flex-row gap-2 rounded-lg"
                onClick={() => {
                  handleDelete(table.getFilteredSelectedRowModel().rows, table);
                }}
              >
                <Trash className="h-5 w-5" />
                <span>Excluir</span>
              </DropdownMenuItem>
              {!isLoading &&
                aditionalButtons &&
                React.cloneElement(aditionalButtons, {
                  table,
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex flex-row gap-2"
                disabled={disabledFilter}
              >
                <Funnel className="h-5 w-5" /> Colunas
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="bg-background-dark text-foreground w-full border-0"
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column: any) => {
                  const foundItem: any = columnsNames?.find(
                    (item: any) => item.id === column.id,
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
      <div className="bg-card h-full overflow-hidden rounded-lg shadow-lg">
        {!isLoading && table.getRowModel().rows?.length ? (
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
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="text-foreground"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="text-foreground text-sm font-medium">
              {isLoading ? (
                <div className="flex flex-row gap-2">
                  <Spinner size={20} className="animate-spin" />
                  <p>Carregando...</p>
                </div>
              ) : (
                "Nenhum registro encontrado."
              )}
            </div>
          </div>
        )}
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
