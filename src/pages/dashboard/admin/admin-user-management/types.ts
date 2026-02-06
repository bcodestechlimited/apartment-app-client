export interface Report {
  createdAt: string;
  reason: string;
  reporter: {
    firstName: string;
    lastName: string;
  };
  status: "Pending" | "Reached";
  action: string;
  _id: string;
}

export interface Booking {
  property: string;
  location: string;
  duration: string;
  status: "Active" | "Pending" | "Cancelled";
  paymentStatus: "Cleared" | "Outstanding" | "Refund issued" | "Overdue";
  landlord: string;
  moveInDate: string;
  moveOutDate: string;
}
