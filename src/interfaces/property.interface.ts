export const amenities = ["Air Conditioner", "Kitchen", "Wi-Fi", "TV"];
export const facilities = ["Parking", "Gym", "Swimming Pool", "Security"];
export const pricingModels = ["Hourly", "Daily", "Weekly", "Monthly", "Yearly"];

export interface IProperty {
  _id: string;
  title: string;
  address: string;
  state: string;
  lga: string;
  price: number;
  type: string;
  description: string;
  availabilityDate?: string;
  pricingModel?: "hourly" | "daily" | "weekly" | "monthly";
  numberOfBedRooms?: string;
  numberOfBathrooms?: string;
  seatingCapacity?: string;
  amenities: string[];
  facilities: string[];
  pictures: string[];
  isVerified: boolean;
}

export interface IAddProperty {
  // type:
  //   | "serviced-apartment"
  //   | "shared-apartment"
  //   | "standard-rental"
  //   | "short-lets"
  //   | "co-working-space"
  //   | "other";
  type: string;
  price: number;
  availabilityDate: string;
  address: string;
  state: string;
  lga: string;
  description: string;
  numberOfBedRooms: string;
  numberOfBathrooms: string;
  pricingModel: string;
  amenities: string[];
  facilities: string[];
  pictures: File[];
}
export interface IAddPropertyCoWorkingSpace {
  type: string;
  price: number;
  address: string;
  state: string;
  city: string;
  lga: string;
  availabilityDate: string;
  description: string;
  numberOfBedRooms: string;
  numberOfBathrooms: string;
  pricingModel: string;
  amenities: string[];
  facilities: string[];
  pictures: File[];
}
