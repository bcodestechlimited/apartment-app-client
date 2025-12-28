import { cn } from "@/lib/utils";
import { Home, Users, ShieldCheck, Hourglass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCardItem from "./metric-card-item";

export interface MetricCardProps {
  data: {
    approved: number;
    pending: number;
    rejected: number;
    total: number;
  };
}

export function MetricCard({ data }: MetricCardProps) {
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCardItem
          bgColor="text-custom-primary"
          title="Total Documents"
          value={data?.total}
        />
        <MetricCardItem
          bgColor="text-purple-700"
          title="Pending Documents"
          value={data?.pending}
        />
        <MetricCardItem
          bgColor="text-blue-700"
          title="Approved Documents"
          value={data?.approved}
        />
        <MetricCardItem
          bgColor="text-red-700"
          title="Rejected Documents"
          value={data?.rejected}
        />
      </div>
    </div>
  );
}
