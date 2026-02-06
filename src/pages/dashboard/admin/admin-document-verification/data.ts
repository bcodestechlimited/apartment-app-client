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
  } | null;

  uploadedAt: string;
  adminStatus: VerificationStatus;
  rejectReason?: string;
  status: VerificationStatus;
}

export const documentTypeOptions = ["pending", "approved", "rejected"];
