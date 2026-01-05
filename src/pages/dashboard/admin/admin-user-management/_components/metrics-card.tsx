// import { cn, formatPrettyDate } from "@/lib/utils";
// import { Home, Users, ShieldCheck, Hourglass } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import MetricCardItem from "./metric-card-item";

// export interface MetricCardProps {
//   data: {
//     lastPayoutAmount: number;
//     pendingPayouts: number;
//     totalEarnings: number;
//     lastPayoutDate: string;
//   };
// }

// export function MetricCard({ data }: MetricCardProps) {
//   return (
//     <div className="">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         <MetricCardItem
//           bgColor="text-custom-primary"
//           title="Total Earnings"
//           amount={data?.totalEarnings}
//           description="Total Earnings made by this landlord"
//         />
//         <MetricCardItem
//           bgColor="text-purple-700"
//           title="Pending Payouts"
//           amount={data?.pendingPayouts}
//           description="Payouts that are yet to be paid"
//         />
//         <MetricCardItem
//           bgColor="text-blue-700"
//           title="Last Payout"
//           amount={data?.lastPayoutAmount}
//           description={`Last Payout on ${formatPrettyDate(
//             data?.lastPayoutDate
//           )}`}
//         />
//         {/* <MetricCardItem
//           bgColor="text-red-700"
//           title="Rejected Documents"
//           value={data?.rejected}
//         /> */}
//       </div>
//     </div>
//   );
// }

// metrics-card.tsx
import { formatPrettyDate } from "@/lib/utils";
import MetricCardItem from "./metric-card-item";

export interface MetricItem {
  title: string;
  amount: number;
  description: string;
  bgColor: string;
}

export interface MetricCardProps {
  metrics: MetricItem[];
}

export function MetricCard({ metrics }: MetricCardProps) {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((item, index) => (
        <MetricCardItem
          key={index}
          title={item.title}
          amount={item.amount}
          description={item.description}
          bgColor={item.bgColor}
        />
      ))}
    </div>
  );
}
