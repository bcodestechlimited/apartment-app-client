import MetricCardItem from "./metric-card-item";

export interface MetricCardProps {
  data: {
    totalTenants: number;
    verifiedLandlords: number;
    totalActiveTenants: number;
    totalListings: number;
  };
}

export function MetricCard({ data }: MetricCardProps) {
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCardItem
          bgColor="text-custom-primary"
          title="Total Listings"
          value={data?.totalListings}
        />
        <MetricCardItem
          bgColor="text-purple-700"
          title="Total Tenants"
          value={data?.totalTenants}
        />
        <MetricCardItem
          bgColor="text-blue-700"
          title="Active Tenants"
          value={data?.totalActiveTenants}
        />
        <MetricCardItem
          bgColor="text-yellow-700"
          title="Verified Landlords"
          value={data?.verifiedLandlords}
        />
      </div>
    </div>
  );
}
