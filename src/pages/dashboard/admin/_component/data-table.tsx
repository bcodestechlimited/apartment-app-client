// import * as React from "react";
// import {
//   flexRender,
//   getCoreRowModel,
//   getSortedRowModel,
//   useReactTable,
//   type ColumnDef,
//   type VisibilityState,
//   type SortingState,
// } from "@tanstack/react-table";
// import { ChevronRight, ChevronLeft, ChevronDown, Loader2 } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // --- Props Definition for Server-Side Use ---
// interface ServerDataTableProps<TData, TValue> {
//   data: TData[]; // Fetched data for the current page
//   columns: ColumnDef<TData, TValue>[];
//   isLoading: boolean;

//   // Pagination & Control Handlers
//   pagination: {
//     pageIndex: number;
//     pageSize: number;
//     totalPages: number;
//     filteredCount: number;
//     // Added for display
//   };
//   setPage: (newPageIndex: number) => void;
//   setPageSize: (newSize: number) => void;
//   // Handler for notifying the hook about sorting changes (e.g., 'fieldName:-1')
//   onSortChange: (sortKey: string) => void;
// }

// export function DataTable<TData, TValue>({
//   data,
//   columns,
//   pagination,
//   setPage,
//   setPageSize,
//   onSortChange,
//   isLoading,
// }: ServerDataTableProps<TData, TValue>) {
//   // Local state for column visibility (always client-side) and sorting display
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [sorting, setSorting] = React.useState<SortingState>([]);

//   // --- useReactTable Initialization ---
//   const table = useReactTable({
//     data,
//     columns,
//     pageCount: pagination?.totalPages, // Crucial: Total pages from server
//     manualPagination: true, // Disable client-side pagination
//     manualSorting: true, // Disable client-side sorting

//     // Handlers
//     onSortingChange: (updater) => {
//       // 1. Update the local state for header visual cue
//       setSorting(updater);

//       // 2. Trigger the server fetch via the prop handler
//       const newSorting =
//         typeof updater === "function" ? updater(sorting) : updater;
//       if (newSorting.length > 0) {
//         // Construct sort key (e.g., 'name:-1')
//         const sortKey = `${newSorting[0].id}:${
//           newSorting[0].desc ? "-1" : "1"
//         }`; // Using -1/1 for Mongoose
//         onSortChange(sortKey);
//       } else {
//         onSortChange(""); // Clear sort
//       }
//     },
//     onColumnVisibilityChange: setColumnVisibility,

//     // Features
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(), // Required for header visual cue

//     // State object uses the declared variables
//     state: {
//       sorting,
//       columnVisibility,
//       pagination: {
//         pageIndex: pagination?.pageIndex,
//         pageSize: pagination?.pageSize,
//       },
//     },
//   });

//   // --- Pagination Controls Handlers ---
//   const handlePageSizeChange = (value: string) => {
//     const newSize = parseInt(value, 10);
//     setPageSize(newSize);
//   };

//   // --- Table Body Content Renderer ---
//   const TableBodyContent = isLoading ? (
//     <TableRow>
//       <TableCell
//         colSpan={columns.length}
//         className="h-24 text-center text-gray-500"
//       >
//         <Loader2 className="h-6 w-6 animate-spin inline mr-2 text-custom-primary" />{" "}
//         Loading data...
//       </TableCell>
//     </TableRow>
//   ) : table.getRowModel().rows?.length ? (
//     table.getRowModel().rows.map((row) => (
//       <TableRow key={row.id}>
//         {row.getVisibleCells().map((cell) => (
//           <TableCell key={cell.id}>
//             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//           </TableCell>
//         ))}
//       </TableRow>
//     ))
//   ) : (
//     <TableRow>
//       <TableCell
//         colSpan={columns.length}
//         className="h-24 text-center text-gray-500"
//       >
//         No results. Adjust your search or filters.
//       </TableCell>
//     </TableRow>
//   );

//   return (
//     <div className="rounded-md border">
//       {/* 1. Column Visibility Toggle */}
//       {/* <div className="flex justify-end p-4 border-b border-gray-100">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="text-sm">
//               Columns <ChevronDown className="ml-2 h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => (
//                 <DropdownMenuCheckboxItem
//                   key={column.id}
//                   className="capitalize"
//                   checked={column.getIsVisible()}
//                   onCheckedChange={(value) => column.toggleVisibility(!!value)}
//                 >
//                   {column.id.replace(/([A-Z])/g, " $1").trim()}
//                 </DropdownMenuCheckboxItem>
//               ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div> */}

//       {/* 2. Table */}
//       <div className="overflow-x-auto">
//         <Table>
//           <TableHeader className="bg-gray-50">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableHead
//                     key={header.id}
//                     className="text-gray-600 font-semibold"
//                   >
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>{TableBodyContent}</TableBody>
//         </Table>
//       </div>

//       {/* 3. Pagination Controls */}
//       <div className="flex items-center justify-between space-x-2 py-4 px-4 border-t border-gray-100 text-sm text-muted-foreground">
//         {/* Left Side: Rows per page and Total Count */}
//         <div className="flex items-center space-x-4">
//           <span className="text-gray-500">Rows per page:</span>
//           <Select
//             value={String(pagination?.pageSize)}
//             onValueChange={handlePageSizeChange}
//           >
//             <SelectTrigger className="w-[70px] h-8 text-gray-700">
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               {[5, 10, 20, 50].map((size) => (
//                 <SelectItem key={size} value={String(size)}>
//                   {size}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <span className="text-gray-500">
//             | Total Records: {pagination?.filteredCount}
//           </span>
//         </div>

//         {/* Right Side: Page navigation */}
//         <div className="flex space-x-1 items-center">
//           <span className="text-gray-700 font-medium mr-4">
//             Page {pagination?.pageIndex} of {pagination?.totalPages}
//           </span>

//           {/* Previous Button */}
//           <Button
//             variant="outline"
//             className="h-8 w-8 p-0"
//             onClick={() => setPage(pagination?.pageIndex - 1)}
//             disabled={pagination?.pageIndex <= 1 || isLoading}
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </Button>

//           {/* Next Button */}
//           <Button
//             variant="outline"
//             className="h-8 w-8 p-0"
//             onClick={() => setPage(pagination?.pageIndex + 1)}
//             disabled={
//               pagination?.pageIndex >= pagination?.totalPages || isLoading
//             }
//           >
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/_component/data-table.tsx
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
      <TableCell
        colSpan={columns.length}
        className="h-24 text-center text-gray-500"
      >
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
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-gray-600 font-semibold text-center"
                  >
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
            <SelectTrigger className="w-[70px] h-8 text-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((size) => (
                <SelectItem key={size} value={String(size)}>
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
            className="h-8 w-8 p-0"
            onClick={() => setPage(pagination?.pageIndex - 1)}
            disabled={pagination?.pageIndex <= 1 || isLoading}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
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
