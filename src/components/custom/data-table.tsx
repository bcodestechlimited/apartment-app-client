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
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="[&_tr]:border-b-0 bg-custom-primary/20 ">
          <TableRow className="border-b-0 border">
            {columns.map((column, index) => (
              <TableHead key={index} className="text-custom-primary/80 ">
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
              {columns.map((column, colIndex) => {
                return (
                  <TableCell key={colIndex} className="text-start">
                    {column.render(row)}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Render pagination if pagination prop is provided */}
    </div>
  );
}
