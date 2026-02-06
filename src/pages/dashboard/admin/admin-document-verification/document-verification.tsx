import React, { useEffect, useState, useMemo } from "react";
import { Search } from "lucide-react";
import { DataTable } from "../_component/data-table";
import { documentTypeOptions, type Document } from "./data";
import { MetricCard } from "./_components/metricCard";
import { useVerificationDocuments } from "@/hooks/admin/useVerificationDocuments";
import {
  createVerificationColumns,
  type VerificationActions,
} from "./_components/column-definition/verification-columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Metric } from "../admin-dashboard/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminDocumentsService } from "@/api/admin/admin-documents.api";
import { toast } from "sonner";

export function AdminDocumentVerification() {
  const {
    data,
    isLoading,
    currentState,
    setSearch,
    setStatus,
    setPage,
    setLimit,
    setSortBy,
  } = useVerificationDocuments();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewedDocument, setViewedDocument] = useState<Document | null>(null);
  const queryClient = useQueryClient();

  const handleViewDocument = (document: Document) => {
    setViewedDocument(document);
    setIsModalOpen(true);
  };

  const verifyDocumentMutation = useMutation({
    mutationFn: (documentId: string) =>
      adminDocumentsService.verifyDocument(documentId),
    onSuccess: () => {
      toast.success("Document verified successfully!");
      queryClient.invalidateQueries({ queryKey: ["verification-documents"] });
    },
    onError: (error: any) =>
      toast.error(error?.message || "Verification failed"),
  });

  const rejectDocumentMutation = useMutation({
    mutationFn: (documentId: string) =>
      adminDocumentsService.rejectDocument(documentId),
    onSuccess: () => {
      toast.success("Document rejected successfully!");
      queryClient.invalidateQueries({ queryKey: ["verification-documents"] });
    },
    onError: (error: any) => toast.error(error?.message || "Rejection failed"),
  });

  const actions: VerificationActions = useMemo(
    () => ({
      onViewDocument: handleViewDocument,
      onVerifyDocument: (id: string) => verifyDocumentMutation.mutateAsync(id),
      onRejectDocument: (id: string) => rejectDocumentMutation.mutateAsync(id),
    }),
    [],
  );

  const verificationColumns = useMemo(
    () => createVerificationColumns(actions),

    [actions],
  ); // 2. Data extraction and local state

  const documents: Document[] = data?.data || [];

  const pagination = {
    pageIndex: currentState.page,
    pageSize: currentState.limit,
    totalPages: data?.pagination?.totalPages || 1,
    filteredCount: data?.pagination?.filteredCount || 0,
  };

  const [localSearch, setLocalSearch] = useState(currentState.search); // --- Sync and Debounce Logic ---

  useEffect(() => {
    if (localSearch === currentState.search) {
      return;
    }
    const handler = setTimeout(() => {
      setSearch(localSearch);
    }, 300);
    return () => clearTimeout(handler);
  }, [localSearch, setSearch, currentState.search]);

  const handleSortChange = (sortKey: string) => {
    setSortBy(sortKey);
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* --- Header & Actions --- */}

      <MetricCard data={data?.statusCounts!} />
      {/* --- 2. External Search and Filter Controls --- */}
      <div className="flex items-center justify-between">
        {/* Search Input */}
        <div className="relative flex items-center w-full max-w-sm">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search documents or users..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9 w-full rounded-lg border border-gray-200"
          />
        </div>
        <div className=" flex gap-4">
          {/* Filter Select */}
          <div className="w-[180px]">
            <Select
              value={currentState.verificationStatus || "All"}
              onValueChange={(value) => setStatus(value === "All" ? "" : value)}
            >
              <SelectTrigger className="w-full justify-between border-gray-200 cursor-pointer">
                <SelectValue placeholder="Document Type" /> {" "}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Status: All</SelectItem>
                {documentTypeOptions.map((option) => (
                  <SelectItem
                    key={option}
                    value={option}
                    className="cursor-pointer"
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* --- 3. Verification Documents Table --- */}
      <div className="bg-white rounded-lg shadow-md">
        <DataTable
          data={documents}
          columns={verificationColumns}
          isLoading={isLoading}
          pagination={pagination}
          setPage={setPage}
          setPageSize={setLimit}
          onSortChange={handleSortChange}
        />
      </div>
      {/* --- Shadcn Document View Modal --- */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-0 h-[90vh] max-h-[95vh] flex flex-col">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>
              {viewedDocument?.name || viewedDocument?.documentType}
            </DialogTitle>
          </DialogHeader>

          {viewedDocument?.fileUrl ? (
            <ScrollArea className="h-115  rounded-md border">
              <img
                src={viewedDocument.fileUrl}
                alt={`Document: ${viewedDocument.name}`}
                className="w-full h-full"
              />
            </ScrollArea>
          ) : (
            <div className="flex justify-center items-center flex-grow text-lg text-gray-500">
              No file preview available or file URL is missing.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
