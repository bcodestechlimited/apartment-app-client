export interface Metric {
  title?: string;
  value?: string;

  className?: string;
}

export interface Property {
  id: string;
  property: string;
  location: string;
  landlord: string;
  occupancyRate: number; // Stored as decimal for sorting
  revenue: number; // Stored as full value for sorting
  bookings: number;
  category: "Serviced" | "Shared" | "Short let";
}

export interface RevenueCategory {
  name: string;
  value: number;
  color: string;
}
