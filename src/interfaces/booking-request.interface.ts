import type { IProperty } from "./property.interface";
import type { IUser } from "./user.interface";

export interface IBookingRequest {
  _id: string;
  property: IProperty;
  tenant: IUser;
  landlord: IUser;
  moveInDate: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  netPrice: number; // Price after discounts or fees
  serviceChargeAmount: number; // Additional fees for the booking
  paymentDue?: Date;
  status: "pending" | "approved" | "declined" | "expired";
  paymentStatus: "pending" | "success" | "failed";
  paymentMethod?: string; // e.g., "card", "bank_transfer"
  paymentAmount?: number;
  paymentCurrency?: string;
  paymentReference?: string; // Reference for the payment transaction
  paymentProvider?: string; // e.g., "paystack", "flutterwave"
  createdAt: string;
  updatedAt: string;
}
