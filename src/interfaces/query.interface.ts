export interface IParams {
  page: number;
  limit: number;
  type?: string;
  [key: string]: any;
  //   availability?: string[];
  //   pricingModel?: "hourly" | "daily" | "weekly" | "monthly";
  //   amenities?: string[];
}
