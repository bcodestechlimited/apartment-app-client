// src/components/verification/data.ts

export type VerificationStatus = "Pending" | "Verified" | "Rejected";
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

// export const verificationData: Document[] = [
//   // --- Page 1 Data (Example: Items 1-10) ---
//   {
//     id: "doc1",
//     documentType: "National ID",
//     user: "Chiamaka Eze",
//     userType: "Tenant",
//     dateUploaded: "Sept 5, 2025",
//     adminStatus: "Pending",
//     status: "Pending",
//   },
//   {
//     id: "doc2",
//     documentType: "Proof of Address",
//     user: "Ashley Walters",
//     userType: "Tenant",
//     dateUploaded: "Sept 5, 2025",
//     adminStatus: "Verified",
//     status: "Verified",
//   },
//   {
//     id: "doc3",
//     documentType: "Guarantor Letter",
//     user: "John Ade",
//     userType: "Landlord",
//     dateUploaded: "Sept 5, 2025",
//     adminStatus: "Rejected",
//     status: "Rejected",
//     rejectReason: "Incomplete",
//   },
//   {
//     id: "doc4",
//     documentType: "Utility Bill",
//     user: "Mary Okoro",
//     userType: "Landlord",
//     dateUploaded: "Sept 6, 2025",
//     adminStatus: "Pending",
//     status: "Pending",
//   },
//   {
//     id: "doc5",
//     documentType: "Commercial Registration",
//     user: "Adewale Kay",
//     userType: "Agent",
//     dateUploaded: "Sept 6, 2025",
//     adminStatus: "Verified",
//     status: "Verified",
//   },
//   {
//     id: "doc6",
//     documentType: "National ID",
//     user: "Lara Bello",
//     userType: "Tenant",
//     dateUploaded: "Sept 7, 2025",
//     adminStatus: "Pending",
//     status: "Pending",
//   },
//   {
//     id: "doc7",
//     documentType: "Proof of Address",
//     user: "Tunde Ojo",
//     userType: "Landlord",
//     dateUploaded: "Sept 7, 2025",
//     adminStatus: "Verified",
//     status: "Verified",
//   },
//   {
//     id: "doc8",
//     documentType: "Guarantor Letter",
//     user: "Ngozi Obi",
//     userType: "Agent",
//     dateUploaded: "Sept 8, 2025",
//     adminStatus: "Rejected",
//     status: "Rejected",
//     rejectReason: "Expired",
//   },
//   {
//     id: "doc9",
//     documentType: "Utility Bill",
//     user: "Kelechi Nwafor",
//     userType: "Tenant",
//     dateUploaded: "Sept 8, 2025",
//     adminStatus: "Pending",
//     status: "Pending",
//   },
//   {
//     id: "doc10",
//     documentType: "Commercial Registration",
//     user: "Samuel Ibe",
//     userType: "Landlord",
//     dateUploaded: "Sept 9, 2025",
//     adminStatus: "Verified",
//     status: "Verified",
//   },

//   // --- Page 2 Data (Example: Items 11-20) ---
//   {
//     id: "doc11",
//     documentType: "National ID",
//     user: "Funke Alao",
//     userType: "Tenant",
//     dateUploaded: "Sept 9, 2025",
//     adminStatus: "Verified",
//     status: "Verified",
//   },
//   {
//     id: "doc12",
//     documentType: "Proof of Address",
//     user: "Peter Eke",
//     userType: "Agent",
//     dateUploaded: "Sept 10, 2025",
//     adminStatus: "Pending",
//     status: "Pending",
//   },
//   {
//     id: "doc13",
//     documentType: "Guarantor Letter",
//     user: "Blessing Udom",
//     userType: "Tenant",
//     dateUploaded: "Sept 10, 2025",
//     adminStatus: "Rejected",
//     status: "Rejected",
//     rejectReason: "Mismatched Name",
//   },
//   {
//     id: "doc14",
//     documentType: "Utility Bill",
//     user: "Chibuzor Eze",
//     userType: "Landlord",
//     dateUploaded: "Sept 11, 2025",
//     adminStatus: "Verified",
//     status: "Verified",
//   },
//   {
//     id: "doc15",
//     documentType: "Commercial Registration",
//     user: "Aisha Mohammed",
//     userType: "Agent",
//     dateUploaded: "Sept 11, 2025",
//     adminStatus: "Pending",
//     status: "Pending",
//   },
//   {
//     id: "doc16",
//     documentType: "National ID",
//     user: "Emeka Obi",
//     userType: "Tenant",
//     dateUploaded: "Sept 12, 2025",
//     adminStatus: "Verified",
//     status: "Verified",
//   },
//   {
//     id: "doc17",
//     documentType: "Proof of Address",
//     user: "Zara Hassan",
//     userType: "Landlord",
//     dateUploaded: "Sept 12, 2025",
//     adminStatus: "Pending",
//     status: "Pending",
//   },
//   {
//     id: "doc18",
//     documentType: "Guarantor Letter",
//     user: "David Bassey",
//     userType: "Agent",
//     dateUploaded: "Sept 13, 2025",
//     adminStatus: "Rejected",
//     status: "Rejected",
//     rejectReason: "Missing Signature",
//   },
//   {
//     id: "doc19",
//     documentType: "Utility Bill",
//     user: "Chioma Ike",
//     userType: "Tenant",
//     dateUploaded: "Sept 13, 2025",
//     adminStatus: "Verified",
//     status: "Verified",
//   },
//   {
//     id: "doc20",
//     documentType: "Commercial Registration",
//     user: "Hakeem Lawal",
//     userType: "Landlord",
//     dateUploaded: "Sept 14, 2025",
//     adminStatus: "Pending",
//     status: "Pending",
//   },

//   // --- Page 3 Data (Just a few more to be safe) ---
//   {
//     id: "doc21",
//     documentType: "National ID",
//     user: "Uche Mba",
//     userType: "Tenant",
//     dateUploaded: "Sept 14, 2025",
//     adminStatus: "Verified",
//     status: "Verified",
//   },
//   {
//     id: "doc22",
//     documentType: "Proof of Address",
//     user: "Ifeanyi Okafor",
//     userType: "Agent",
//     dateUploaded: "Sept 15, 2025",
//     adminStatus: "Pending",
//     status: "Pending",
//   },
//   {
//     id: "doc23",
//     documentType: "Guarantor Letter",
//     user: "Jide Dada",
//     userType: "Tenant",
//     dateUploaded: "Sept 15, 2025",
//     adminStatus: "Rejected",
//     status: "Rejected",
//   },
//   {
//     id: "doc24",
//     documentType: "Utility Bill",
//     user: "Adebayo Sola",
//     userType: "Landlord",
//     dateUploaded: "Sept 16, 2025",
//     adminStatus: "Verified",
//     status: "Verified",
//   },
//   {
//     id: "doc25",
//     documentType: "Commercial Registration",
//     user: "Taiwo Bello",
//     userType: "Agent",
//     dateUploaded: "Sept 16, 2025",
//     adminStatus: "Pending",
//     status: "Pending",
//   },
// ];

// Options for the Document Type Filter

// Options for the Document Type Filter
export const documentTypeOptions = [
  "National ID",
  "Proof of Address",
  "Guarantor Letter",
  "Utility Bill",
  "Commercial Registration",
];
