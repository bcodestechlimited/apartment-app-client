// import React from "react";
// import { TrendingUp } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// const occupancyData = [
//   { month: "Jan", value: 400 },
//   { month: "Feb", value: 600 },
//   { month: "Mar", value: 800 },
//   { month: "Apr", value: 700 },
//   { month: "May", value: 900 },
//   { month: "Jun", value: 1000 },
//   { month: "Jul", value: 1200 },
//   { month: "Aug", value: 1100 },
//   { month: "Sep", value: 1300 },
//   { month: "Oct", value: 1200 },
//   { month: "Nov", value: 1400 },
//   { month: "Dec", value: 1500 },
// ];

// const chartConfig = {
//   occupancy: {
//     label: "Occupancy",
//     color: "hsl(var(--chart-1))",
//   },
// } as const;

// export function OverviewChart() {
//   const maxValue = Math.max(...occupancyData.map((d) => d.value));

//   return (
//     <Card>
//       <CardHeader className="flex flex-row items-center justify-between">
//         <CardTitle className="text-lg font-semibold">Occupancy Rate</CardTitle>
//         <div className="flex items-center space-x-2">
//           <TrendingUp className="h-5 w-5 text-green-500" />
//           <span className="text-sm font-normal text-green-600">+12.5%</span>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig} className="h-[300px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={occupancyData}
//               margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
//             >
//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 vertical={false}
//                 stroke="hsl(var(--border))"
//               />
//               <XAxis
//                 dataKey="month"
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
//                 tickMargin={10}
//               />
//               <YAxis
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
//                 domain={[0, maxValue]}
//                 ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400, 1600]}
//               />
//               <ChartTooltip
//                 content={
//                   <ChartTooltipContent
//                     labelKey="month"
//                     formatter={(value) => [`${value} units`, "Occupancy"]}
//                   />
//                 }
//               />
//               <Bar
//                 dataKey="value"
//                 fill="var(--color-occupancy)"
//                 radius={[4, 4, 0, 0]}
//                 maxBarSize={40}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartContainer>
//         <div className="flex justify-between text-sm text-muted-foreground mt-4 px-2">
//           {[0, 200, 400, 600, 800, 1000, 1200, 1400, 1600].map((value) => (
//             <span key={value}>{value}</span>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import React from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const occupancyData = [
  { month: "Jan", value: 400 },
  { month: "Feb", value: 600 },
  { month: "Mar", value: 800 },
  { month: "Apr", value: 700 },
  { month: "May", value: 900 },
  { month: "Jun", value: 1000 },
  { month: "Jul", value: 1200 },
  { month: "Aug", value: 1100 },
  { month: "Sep", value: 1300 },
  { month: "Oct", value: 1200 },
  { month: "Nov", value: 1400 },
  { month: "Dec", value: 1500 },
];

const chartConfig = {
  occupancy: {
    label: "Occupancy",
    color: "hsl(var(--chart-1))",
  },
} as const;

export function OverviewChart() {
  const maxValue = Math.max(...occupancyData.map((d) => d.value));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Occupancy Rate</CardTitle>
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <span className="text-sm font-normal text-green-600">+12.5%</span>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={occupancyData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                domain={[0, maxValue]}
                ticks={[0, 200, 400, 600, 800, 1000, 1200, 1400, 1600]}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelKey="month"
                    formatter={(value) => [`${value} units`, "Occupancy"]}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--color-occupancy)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="flex justify-between text-sm text-muted-foreground mt-4 px-2">
          {[0, 200, 400, 600, 800, 1000, 1200, 1400, 1600].map((value) => (
            <span key={value}>{value}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
