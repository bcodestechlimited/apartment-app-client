import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Loader } from "./loader";

interface Column {
  header: string;
  render: (row: any) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column[];
  data: T[];
  isLoading?: boolean;
  noDataMessage?: string;
}

// export default function DataTable<T>({
//   columns,
//   data,
//   isLoading = false,
//   noDataMessage = "No data available.",
// }: TableProps<T>) {
//   if (isLoading) {
//     return <Loader isLoading={isLoading} />;
//   }

//   if (!data.length) {
//     return <div className="p-4 text-center">{noDataMessage}</div>;
//   }

//   return (
//     <div className="overflow-x-auto">
//       <Table>
//         <TableHeader className="[&_tr]:border-b-0 bg-custom-primary/20 ">
//           <TableRow className="border-b-0 border">
//             {columns.map((column, index) => (
//               <TableHead key={index} className="text-custom-primary/80 ">
//                 {column.header}
//               </TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody className="[&_tr:last-child]:border">
//           {data.map((row, rowIndex) => (
//             <TableRow
//               key={rowIndex}
//               className="border-b-0 border border-custom-primary/20 rounded-2xl"
//             >
//               {columns.map((column, colIndex) => {
//                 return (
//                   <TableCell key={colIndex} className="text-start">
//                     {column.render(row)}
//                   </TableCell>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       {/* Render pagination if pagination prop is provided */}
//     </div>
//   );
// }

export default function DataTable<T>({
  columns,
  data,
  isLoading = false,
  noDataMessage = "No data available.",
}: TableProps<T>) {
  if (isLoading) {
    return <Loader isLoading={isLoading} />;
  }

  if (!data.length) {
    return <div className="p-4 text-center">{noDataMessage}</div>;
  }

  return (
    <div className="w-full">
      {/* Desktop View: Only visible on md screens and up */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader className="[&_tr]:border-b-0 bg-custom-primary/20">
            <TableRow className="border-b-0 border">
              {columns.map((column, index) => (
                <TableHead key={index} className="text-custom-primary/80">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="[&_tr:last-child]:border">
            {data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="border-b-0 border border-custom-primary/20 rounded-2xl"
              >
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className="text-start">
                    {column.render(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View: Only visible on screens smaller than md */}
      <div className="md:hidden space-y-4">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="border border-custom-primary/20 rounded-2xl overflow-hidden bg-white shadow-sm"
          >
            {/* Header-like styling for the first card item or specific field */}
            <div className="bg-custom-primary/10 px-4 py-2 border-b border-custom-primary/10 text-xs font-bold text-custom-primary/80 uppercase">
              Record #{rowIndex + 1}
            </div>

            <div className="p-4 space-y-3">
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-1">
                  {/* Label from column.header */}
                  {column.header && (
                    <span className="text-[10px] font-bold text-custom-primary/60 uppercase tracking-tight">
                      {column.header}
                    </span>
                  )}
                  {/* The actual data rendered using your render function */}
                  <div className="text-sm font-medium">
                    {column.render(row)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
