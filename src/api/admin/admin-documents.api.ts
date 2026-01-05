import type { IParams } from "@/interfaces/query.interface";
import axiosInstance from "@/lib/axios.config";
import { handleAxiosError } from "@/lib/utils";
import type { Document } from "@/pages/dashboard/admin/admin-document-verification/data";

export interface PaginationInfo {
  totalCount: number;
  filteredCount: number;
  totalPages: number;
  page: number;
  limit: number;
}

// --- 2. Define the New Paginated Response Structure ---
// TData will be the Document type in your case
export interface CleanPaginatedResponse<TData> {
  data: TData[];
  pagination: PaginationInfo;
  statusCounts?: {
    pending: number;
    approved: number;
    rejected: number;
    total: number;
  }; // Optional: to include status counts if needed
}

// Specific type for your service
export type DocumentPaginatedResponse = CleanPaginatedResponse<Document>;
class AdminDocumentsService {
  // Method to fetch all documents for admin verification
  getAllDocuments = async (
    params?: IParams
  ): Promise<DocumentPaginatedResponse> => {
    try {
      const response = await axiosInstance.get(`/admin/documents`, {
        params,
      });

      // Destructure the main data object from the response
      const apiData = response.data.data;

      const pagination = apiData.pagination;

      // Extract and convert the pagination fields
      const paginationInfo: PaginationInfo = {
        // CRITICAL: Assuming these are numbers now and avoiding unnecessary parseInt()
        totalCount: pagination.totalCount,
        filteredCount: pagination.filteredCount,
        totalPages: pagination.totalPages,

        // Safely parsing 'page' and 'limit' as they often come as strings from API responses
        page:
          typeof pagination.page === "string"
            ? parseInt(pagination.page, 10)
            : pagination.page,
        limit:
          typeof pagination.limit === "string"
            ? parseInt(pagination.limit, 10)
            : pagination.limit,
      };

      // Return the new, structured object
      return {
        data: apiData.documents, // Array of Document objects
        pagination: paginationInfo,
        statusCounts: apiData.statusCounts, // Include statusCounts if needed
      } as DocumentPaginatedResponse;
    } catch (error) {
      handleAxiosError(error, "Unable to get documents");

      throw error;
    }
  };

  // Method to fetch a specific document for admin verification
  getDocumentByUserId = async (userId: string): Promise<Document> => {
    try {
      const response = await axiosInstance.get(`/admin/documents/${userId}`);
      // Assuming the actual document is in response.data?.data
      return response.data;
    } catch (error) {
      handleAxiosError(error, "Unable to get document");
      throw error;
    }
  };

  verifyDocument = async (documentId: string) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/documents/${documentId}/verify`
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to verify document");
      throw error;
    }
  };
  rejectDocument = async (documentId: string) => {
    try {
      const response = await axiosInstance.patch(
        `/admin/documents/${documentId}/reject`
      );
      return response.data?.data;
    } catch (error) {
      handleAxiosError(error, "Unable to reject document");
      throw error;
    }
  };
}

export const adminDocumentsService = new AdminDocumentsService();
