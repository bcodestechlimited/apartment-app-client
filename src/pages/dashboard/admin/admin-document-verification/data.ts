// src/components/verification/data.ts

export type VerificationStatus = "pending" | "approved" | "rejected";
export type UserType = "Tenant" | "Landlord" | "Agent";

export interface Document {
  _id: string;
  fileUrl: string;
  name: string;
  documentType: string;
  user: {
    firstName: string;
    lastName: string;
    roles: string;
  } | null; // User's name, or null if pending initial processing

  uploadedAt: string;
  adminStatus: VerificationStatus; // Status set by the Admin
  rejectReason?: string;
  status: VerificationStatus; // Status of the document itself (Verified/Rejected)
}

// Options for the Document Type Filter
export const documentTypeOptions = ["pending", "approved", "rejected"];
