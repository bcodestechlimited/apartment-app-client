// import {
//   adminDocumentsService,
//   type DocumentPaginatedResponse,
// } from "@/api/admin/admin-documents.api";
// import type { IParams } from "@/interfaces/query.interface";
// import { useQuery } from "@tanstack/react-query";
// import { useCallback } from "react";
// import { useSearchParams } from "react-router";

// // NOTE: The issue is solved by simplifying the options object to match the v5 overloads.

// const INITIAL_PAGE_SIZE = 5;

// // Define the type of the fetcher function explicitly
// const fetchDocuments = (params: IParams): Promise<DocumentPaginatedResponse> =>
//   adminDocumentsService.getAllDocuments(params);

// // Define the exact type the hook returns
// export type VerificationDocumentsHookResult = {
//   data: DocumentPaginatedResponse | undefined;
//   isLoading: boolean;
//   isFetching: boolean;
//   error: Error | null;

//   // Controls
//   setPage: (newPageIndex: number) => void;
//   setLimit: (newLimit: number) => void;
//   setSearch: (newSearch: string) => void;
//   setDocumentTypeFilter: (newValue: string) => void;
//   setSortBy: (newSort: string) => void;

//   // Current State (for external controls)
//   currentState: {
//     page: number;
//     limit: number;
//     search: string;
//     documentType: string;
//     sortBy: string;
//   };
// };

// export const useVerificationDocuments = (): VerificationDocumentsHookResult => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   // --- 1. State from URL ---
//   const page = parseInt(searchParams.get("page") || "1", 10);
//   const limit = parseInt(
//     searchParams.get("limit") || String(INITIAL_PAGE_SIZE),
//     10
//   );
//   const search = searchParams.get("search") || "";
//   const documentType = searchParams.get("documentType") || "";
//   const sortBy = searchParams.get("sortBy") || "";

//   const params: IParams = {
//     page,
//     limit,
//     search,
//     type: documentType,
//     sortBy,
//   };

//   // --- 2. React Query Fetch (FIX: Simplified Options) ---
//   const query = useQuery<DocumentPaginatedResponse>({
//     queryKey: ["verification-documents", params],
//     queryFn: () => fetchDocuments(params),

//     // REMOVED: placeholderData (or initialData) and keepPreviousData
//     // because they conflict with the overloads when used together/incorrectly.
//     // We will rely on default query behavior for now.

//     staleTime: 5000,
//   });

//   // --- 3. URL Synchronization Logic (Remains the same) ---
//   const setQueryParam = useCallback(
//     (key: keyof IParams | "documentType", value: string | number) => {
//       setSearchParams(
//         (prevParams) => {
//           const newParams = new URLSearchParams(prevParams);

//           if (
//             value === "" ||
//             value === undefined ||
//             value === null ||
//             (key === "limit" && value === INITIAL_PAGE_SIZE)
//           ) {
//             newParams.delete(String(key));
//           } else {
//             newParams.set(String(key), String(value));
//           }

//           if (key !== "page") {
//             newParams.set("page", "0");
//           }
//           return newParams;
//         },
//         { replace: true }
//       );
//     },
//     [setSearchParams]
//   );

//   const setPage = (newPageIndex: number) => setQueryParam("page", newPageIndex);
//   const setLimit = (newLimit: number) => setQueryParam("limit", newLimit);
//   const setSearch = (newSearch: string) => setQueryParam("search", newSearch);
//   const setDocumentTypeFilter = (newValue: string) =>
//     setQueryParam("documentType", newValue);
//   const setSortBy = (newSort: string) => setQueryParam("sortBy", newSort);

//   // Final check for the data property access
//   const data = query.data;

//   return {
//     data: data,
//     isLoading: query.isLoading,
//     isFetching: query.isFetching,
//     error: query.error,

//     setPage,
//     setLimit,
//     setSearch,
//     setDocumentTypeFilter,
//     setSortBy,
//     currentState: { page, limit, search, documentType, sortBy },
//   } as VerificationDocumentsHookResult;
// };

// src/hooks/useVerificationDocuments.ts

// import {
//   adminDocumentsService,
//   type DocumentPaginatedResponse,
// } from "@/api/admin/admin-documents.api";
// import type { IParams } from "@/interfaces/query.interface"; // Assuming IParams exists
// import { useQuery } from "@tanstack/react-query";
// import { useCallback } from "react";
// import { useSearchParams } from "react-router"; // Use react-router-dom for hooks

// const INITIAL_PAGE_SIZE = 5;

// // --- Define the Type of the Hook's Return Object ---
// export type VerificationDocumentsHookResult = {
//   data: DocumentPaginatedResponse | undefined;
//   isLoading: boolean;
//   isFetching: boolean;
//   error: Error | null;

//   // Controls: setPage now expects a 1-indexed number (1, 2, 3...)
//   setPage: (newPageIndex: number) => void;
//   setLimit: (newLimit: number) => void;
//   setSearch: (newSearch: string) => void;
//   setDocumentTypeFilter: (newValue: string) => void;
//   setSortBy: (newSort: string) => void;

//   // Current State (for external controls)
//   currentState: {
//     page: number;
//     limit: number;
//     search: string;
//     documentType: string;
//     sortBy: string;
//   };
// };

// // --- Define the Query Function (Fetcher) ---
// const fetchDocuments = (params: IParams) =>
//   adminDocumentsService.getAllDocuments(params);

// // --- The Custom Hook ---
// export const useVerificationDocuments = (): VerificationDocumentsHookResult => {
//   const [searchParams, setSearchParams] = useSearchParams();

//   // --- 1. State from URL (1-Based Indexing) ---
//   // Read the page parameter, default it to '1' if missing (CRITICAL FIX).
//   const page = parseInt(searchParams.get("page") || "1", 10);

//   const limit = parseInt(
//     searchParams.get("limit") || String(INITIAL_PAGE_SIZE),
//     10
//   );
//   const search = searchParams.get("search") || "";
//   const documentType = searchParams.get("documentType") || "";
//   const sortBy = searchParams.get("sortBy") || "";

//   const params: IParams = {
//     page, // This is the 1-indexed page number sent to the backend
//     limit,
//     search,
//     type: documentType,
//     sortBy,
//   };

//   // --- 2. React Query Fetch ---
//   const query = useQuery<DocumentPaginatedResponse>({
//     queryKey: ["verification-documents", params],
//     queryFn: () => fetchDocuments(params),
//     staleTime: 5000,
//   });

//   // --- 3. URL Synchronization Logic ---
//   const setQueryParam = useCallback(
//     (key: keyof IParams | "documentType", value: string | number) => {
//       setSearchParams(
//         (prevParams) => {
//           const newParams = new URLSearchParams(prevParams);

//           if (
//             value === "" ||
//             value === undefined ||
//             value === null ||
//             (key === "limit" && value === INITIAL_PAGE_SIZE)
//           ) {
//             newParams.delete(String(key));
//           } else {
//             newParams.set(String(key), String(value));
//           }

//           // CRITICAL: When changing filter/search (not page itself), reset page to '1'.
//           if (key !== "page") {
//             newParams.set("page", "1");
//           }
//           return newParams;
//         },
//         { replace: true }
//       );
//     },
//     [setSearchParams]
//   );

//   // --- Destructured Controls (Send 1-indexed value to setQueryParam) ---
//   const setPage = (newPageIndex: number) => setQueryParam("page", newPageIndex);
//   const setLimit = (newLimit: number) => setQueryParam("limit", newLimit);
//   const setSearch = (newSearch: string) => setQueryParam("search", newSearch);
//   const setDocumentTypeFilter = (newValue: string) =>
//     setQueryParam("documentType", newValue);
//   const setSortBy = (newSort: string) => setQueryParam("sortBy", newSort);

//   // --- Final Return ---
//   return {
//     // --- Destructured properties for consumption ---
//     data: query.data,
//     isLoading: query.isLoading,
//     isFetching: query.isFetching,
//     error: query.error,

//     // --- Controls and State ---
//     setPage,
//     setLimit,
//     setSearch,
//     setDocumentTypeFilter,
//     setSortBy,
//     currentState: { page, limit, search, documentType, sortBy },
//   } as VerificationDocumentsHookResult;
// };

// src/hooks/useVerificationDocuments.ts

import {
  adminDocumentsService,
  type DocumentPaginatedResponse,
} from "@/api/admin/admin-documents.api";
import type { IParams } from "@/interfaces/query.interface"; // Assuming IParams exists
import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react"; // <-- useMemo for the fix
import { useSearchParams } from "react-router";

const INITIAL_PAGE_SIZE = 5;

// --- Define the Type of the Hook's Return Object ---
export type VerificationDocumentsHookResult = {
  data: DocumentPaginatedResponse | undefined;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;

  // Controls: setPage now expects a 1-indexed number (1, 2, 3...)
  setPage: (newPageIndex: number) => void;
  setLimit: (newLimit: number) => void;
  setSearch: (newSearch: string) => void;
  setDocumentTypeFilter: (newValue: string) => void;
  setSortBy: (newSort: string) => void;

  // Current State (for external controls)
  currentState: {
    page: number;
    limit: number;
    search: string;
    documentType: string;
    sortBy: string;
  };
};

// --- Define the Query Function (Fetcher) ---
const fetchDocuments = (params: IParams) =>
  adminDocumentsService.getAllDocuments(params);

// --- The Custom Hook ---
export const useVerificationDocuments = (): VerificationDocumentsHookResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- 1. State from URL (1-Based Indexing Fix) ---
  // Default page to '1' to prevent BSON error in Mongoose.
  const page = parseInt(searchParams.get("page") || "1", 10);

  const limit = parseInt(
    searchParams.get("limit") || String(INITIAL_PAGE_SIZE),
    10
  );
  const search = searchParams.get("search") || "";
  const documentType = searchParams.get("documentType") || "";
  const sortBy = searchParams.get("sortBy") || "";

  // --- CRITICAL FIX: Memoize the params object for stable queryKey ---
  const params = useMemo<IParams>(
    () => ({
      page,
      limit,
      search,
      type: documentType, // Maps to documentType filter
      sortBy,
    }),
    [page, limit, search, documentType, sortBy]
  ); // Depend only on primitive values

  // --- 2. React Query Fetch ---
  const query = useQuery<DocumentPaginatedResponse>({
    queryKey: ["verification-documents", params], // Stable key
    queryFn: () => fetchDocuments(params),
    staleTime: 5000,
  });

  // --- 3. URL Synchronization Logic ---
  const setQueryParam = useCallback(
    (key: keyof IParams | "documentType", value: string | number) => {
      setSearchParams(
        (prevParams) => {
          const newParams = new URLSearchParams(prevParams);

          if (
            value === "" ||
            value === undefined ||
            value === null ||
            (key === "limit" && value === INITIAL_PAGE_SIZE)
          ) {
            newParams.delete(String(key));
          } else {
            newParams.set(String(key), String(value));
          }

          // When changing filter/search, reset page to '1'.
          if (key !== "page") {
            newParams.set("page", "1");
          }
          return newParams;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  // --- Destructured Controls (Send 1-indexed value) ---
  const setPage = (newPageIndex: number) => setQueryParam("page", newPageIndex);
  const setLimit = (newLimit: number) => setQueryParam("limit", newLimit);
  const setSearch = (newSearch: string) => setQueryParam("search", newSearch);
  const setDocumentTypeFilter = (newValue: string) =>
    setQueryParam("documentType", newValue);
  const setSortBy = (newSort: string) => setQueryParam("sortBy", newSort);

  // --- Final Return ---
  return {
    // Destructured properties for consumption
    data: query.data,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,

    // Controls and State
    setPage,
    setLimit,
    setSearch,
    setDocumentTypeFilter,
    setSortBy,
    currentState: { page, limit, search, documentType, sortBy },
  } as VerificationDocumentsHookResult;
};
