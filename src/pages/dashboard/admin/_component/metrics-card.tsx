import { cn } from "@/lib/utils";
import { Home, Users, ShieldCheck, Hourglass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { metricData } from "../admin-dashboard/_components/stats";
import type { Metric } from "../admin-dashboard/types";

export interface MetricCardProps {
  data: Metric[];
}
export function MetricCard({ data }: MetricCardProps) {
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((stat, index) => (
          <Card
            key={index}
            className={cn(
              `shadow-none transition-shadow border border-custom-primary/10 gap-0`,
              stat.className
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle
                className={cn(
                  "text-md font-normal text-gray-600",
                  stat.className
                )}
              >
                <p>{stat.title}</p>
              </CardTitle>
              {/* <div className="p-2 bg-custom-primary/10 rounded-full">
                {stat.icon}
              </div> */}
            </CardHeader>
            <CardContent className="text-start">
              <p
                className={cn(
                  "text-2xl font-bold text-gray-900",
                  stat.className
                )}
              >
                {stat.value}
              </p>
              {/* <p className="text-xs text-gray-500 mt-1">{stat.description}</p> */}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
