type FilterParams = {
  page?: number;
  limit?: number;
  propertyType?: string;
  minPrice?: string;
  maxPrice?: string;
  numberOfBedrooms?: string;
  numberOfBathrooms?: string;
  facilities?: string;
  amenities?: string;
  pricingModel?: string;
  duration?: string;
  availableFrom?: string;
  state?: string;
  lga?: string;
};

export const getQueryFilters = (
  searchParams: URLSearchParams
): FilterParams => {
  return {
    propertyType: searchParams.get("propertyType") || undefined,
    minPrice: searchParams.get("minPrice") || undefined,
    maxPrice: searchParams.get("maxPrice") || undefined,
    numberOfBedrooms: searchParams.get("numberOfBedrooms") || undefined,
    numberOfBathrooms: searchParams.get("numberOfBathrooms") || undefined,
    facilities: searchParams.get("facilities") || undefined,
    amenities: searchParams.get("amenities") || undefined,
    pricingModel: searchParams.get("pricingModel") || undefined,
    duration: searchParams.get("duration") || undefined,
    availableFrom: searchParams.get("availableFrom") || undefined,
    state: searchParams.get("state") || undefined,
    lga: searchParams.get("lga") || undefined,
  };
};
