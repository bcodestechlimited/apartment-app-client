export interface IProperty {
  _id: string;
  type:
    | "serviced-apartment"
    | "shared-apartment"
    | "standard-rental"
    | "short-lets"
    | "co-working-space"
    | "other";
  description: string;
  availability: string[];
  pricingModel?: "hourly" | "daily" | "weekly" | "monthly";
  numberOfRooms: number;
  seatingCapacity?: number;
  amenities: string[];
  pictures: File[];
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
