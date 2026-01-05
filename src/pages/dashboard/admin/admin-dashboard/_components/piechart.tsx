// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// const revenueData = [
//   { category: "Category A", value: 35, color: "hsl(var(--chart-1))" },
//   { category: "Category B", value: 25, color: "hsl(var(--chart-2))" },
//   { category: "Category C", value: 20, color: "hsl(var(--chart-3))" },
//   { category: "Category D", value: 20, color: "hsl(var(--chart-4))" },
// ];

// const chartConfig = {
//   "Category A": {
//     label: "Category A",
//     color: "hsl(var(--chart-1))",
//   },
//   "Category B": {
//     label: "Category B",
//     color: "hsl(var(--chart-2))",
//   },
//   "Category C": {
//     label: "Category C",
//     color: "hsl(var(--chart-3))",
//   },
//   "Category D": {
//     label: "Category D",
//     color: "hsl(var(--chart-4))",
//   },
// } as const;

// export function RevenuePieChart() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="text-lg font-semibold">
//           Revenue Breakdown
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="space-y-4">
//             {revenueData.map((item, index) => (
//               <div key={index} className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div
//                     className="w-4 h-4 rounded-full"
//                     style={{
//                       backgroundColor: `var(--color-${item.category.replace(
//                         " ",
//                         "-"
//                       )})`,
//                     }}
//                   />
//                   <span className="text-gray-700">{item.category}</span>
//                 </div>
//                 <span className="font-medium">{item.value}%</span>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-center items-center">
//             <ChartContainer
//               config={chartConfig}
//               className="h-[200px] w-full max-w-[200px]"
//             >
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={revenueData}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={80}
//                     paddingAngle={2}
//                     dataKey="value"
//                     nameKey="category"
//                     labelLine={false}
//                   >
//                     {revenueData.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={`var(--color-${entry.category.replace(
//                           " ",
//                           "-"
//                         )})`}
//                         strokeWidth={0}
//                       />
//                     ))}
//                   </Pie>
//                   <ChartTooltip
//                     content={
//                       <ChartTooltipContent
//                         labelKey="category"
//                         formatter={(value, name) => [`${value}%`, name]}
//                       />
//                     }
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </ChartContainer>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const revenueData = [
  { category: "Category A", value: 35, color: "bg-blue-500" },
  { category: "Category B", value: 25, color: "bg-green-500" },
  { category: "Category C", value: 20, color: "bg-purple-500" },
  { category: "Category D", value: 20, color: "bg-orange-500" },
];

export function RevenuePieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Revenue Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {revenueData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${item.color}`} />
                <span className="text-gray-700">{item.category}</span>
              </div>
              <span className="font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
        <div className="flex h-3 rounded-full overflow-hidden">
          {revenueData.map((item) => (
            <div
              key={item.category}
              className={`${item.color}`}
              style={{ width: `${item.value}%` }}
              title={`${item.category}: ${item.value}%`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
