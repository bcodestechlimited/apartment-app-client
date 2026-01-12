import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type VisibilityState,
  type SortingState,
} from "@tanstack/react-table";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ServerDataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading: boolean;
  meta?: any; // --- ADDED: Pass external handlers to columns ---
  pagination: {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    filteredCount: number;
  };
  setPage: (newPageIndex: number) => void;
  setPageSize: (newSize: number) => void;
  onSortChange: (sortKey: string) => void;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  pagination,
  setPage,
  setPageSize,
  onSortChange,
  isLoading,
  meta, // --- ADDED ---
}: ServerDataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    pageCount: pagination?.totalPages,
    manualPagination: true,
    manualSorting: true,
    meta, // --- ADDED: This makes meta available via table.options.meta ---
    onSortingChange: (updater) => {
      setSorting(updater);
      const newSorting =
        typeof updater === "function" ? updater(sorting) : updater;
      if (newSorting.length > 0) {
        const sortKey = `${newSorting[0].id}:${
          newSorting[0].desc ? "-1" : "1"
        }`;
        onSortChange(sortKey);
      } else {
        onSortChange("");
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnVisibility,
      pagination: {
        pageIndex: pagination?.pageIndex,
        pageSize: pagination?.pageSize,
      },
    },
  });

  const handlePageSizeChange = (value: string) => {
    setPageSize(parseInt(value, 10));
  };

  const TableBodyContent = isLoading ? (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center ">
        <Loader2 className="h-6 w-6 animate-spin inline mr-2 text-custom-primary" />{" "}
        Loading data...
      </TableCell>
    </TableRow>
  ) : table.getRowModel().rows?.length ? (
    table.getRowModel().rows.map((row) => (
      <TableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        className="h-24 text-center text-gray-500"
      >
        No results found.
      </TableCell>
    </TableRow>
  );

  return (
    <div className="">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="[&_tr]:border-b-0 bg-custom-primary/20">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b-0 border">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-custom-primary/80">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>{TableBodyContent}</TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4 px-4 border-t border-gray-100 text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Rows per page:</span>
          <Select
            value={String(pagination?.pageSize)}
            onValueChange={handlePageSizeChange}
          >
            <SelectTrigger className="w-17.5 h-8 text-gray-700 cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((size) => (
                <SelectItem
                  key={size}
                  value={String(size)}
                  className="cursor-pointer"
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-gray-500">
            | Total Records: {pagination?.filteredCount}
          </span>
        </div>

        <div className="flex space-x-1 items-center">
          <span className="text-gray-700 font-medium mr-4">
            Page {pagination?.pageIndex} of {pagination?.totalPages}
          </span>
          <Button
            variant="outline"
            className="h-8 w-8 p-0 cursor-pointer"
            onClick={() => setPage(pagination?.pageIndex - 1)}
            disabled={pagination?.pageIndex <= 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p- cursor-pointer"
            onClick={() => setPage(pagination?.pageIndex + 1)}
            disabled={
              pagination?.pageIndex >= pagination?.totalPages || isLoading
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
