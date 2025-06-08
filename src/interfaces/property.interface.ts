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
  description: string;
  numberOfRooms: number;
  amenities: string[];
  pictures: File[];
}
export interface IAddPropertyCoWorkingSpace {
  type:
    | "serviced-apartment"
    | "shared-apartment"
    | "standard-rental"
    | "short-lets"
    | "co-working-space"
    | "other";
  description: string;
  amenities: string[];
  availability: string[];
  pictures: File[];
  pricingModel?: "hourly" | "daily" | "weekly" | "monthly";
  seatingCapacity: number;
}
