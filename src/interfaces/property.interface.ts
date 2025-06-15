export const amenities = ["Air Conditioner", "Kitchen", "Wi-Fi", "TV"];
export const facilities = ["Parking", "Gym", "Swimming Pool", "Security"];
export const pricingModels = ["Hourly", "Daily", "Weekly", "Monthly", "Yearly"];

export interface IProperty {
  _id: string;
  title: string;
  address: string;
  price: number;
  type: string;
  description: string;
  availability?: string[];
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
  price?: number;
  location: string;
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
  price?: number;
  location: string;
  description: string;
  numberOfBedRooms: string;
  numberOfBathrooms: string;
  pricingModel: string;
  amenities: string[];
  facilities: string[];
  pictures: File[];
}
