export const amenities = [
  "Air Conditioner",
  "Kitchen",
  "Wi-Fi",
  "TV",
  "Washer",
  "Gym",
  "Private Bath",
];
export const facilities = ["Parking", "Gym", "Swimming Pool", "Security"];
export const propertyTypes = [
  "Standard Rental",
  "Short Let",
  "Serviced Apartment",
  "Shared Apartment",
  "Co-working Space",
  "Other",
];
export const pricingModels = ["Hourly", "Daily", "Weekly", "Monthly", "Yearly"];
export const duration = ["Short Term", "Long Term"];
export const numberOfBathroomsArray = ["1", "2", "3", "4", "5"];
export const numberOfBedRoomsArray = ["1", "2", "3", "4", "5"];

export interface IProperty {
  _id: string;
  title: string;
  address: string;
  state: string;
  lga: string;
  price: number;
  type: string;
  description: string;
  availabilityDate: string;
  // pricingModel?: "hourly" | "daily" | "weekly" | "monthly" | "yearly" ;
  pricingModel?: string;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  seatingCapacity?: string;
  amenities: string[];
  facilities: string[];
  pictures: string[];
  isVerified: boolean;
  isAvailable: boolean;
  requestedBy: string[];
}

export interface IAddProperty {
  // type:
  //   | "serviced-apartment"
  //   | "shared-apartment"
  //   | "standard-rental"
  //   | "short-lets"
  //   | "co-working-space"
  //   | "other";
  title: string;
  description: string;
  type: string;
  address: string;
  state: string;
  lga: string;
  price: number;
  availabilityDate: string;
  numberOfBedRooms?: string;
  numberOfBathrooms?: string;
  seatingCapacity?: string;
  pricingModel: string;
  amenities: string[];
  facilities: string[];
  pictures: File[];
}
export interface IEditProperty {
  // type:
  //   | "serviced-apartment"
  //   | "shared-apartment"
  //   | "standard-rental"
  //   | "short-lets"
  //   | "co-working-space"
  //   | "other";
  title: string;
  description: string;
  type: string;
  price: number;
  availabilityDate: Date | string | undefined;
  address: string;
  state: string;
  lga: string;
  numberOfBedRooms: string;
  numberOfBathrooms: string;
  pricingModel: string;
  amenities: string[];
  facilities: string[];
  // pictures: File[];
  existingPictures: string[];
  newPictures: File[];
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
