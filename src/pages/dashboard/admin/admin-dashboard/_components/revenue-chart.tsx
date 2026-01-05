import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revenueData } from "./stats";

const RADIAN = Math.PI / 180;
// Custom label to hide values (optional, Recharts default uses a line)
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  // You can customize the label appearance here if needed
  // For this design, we will rely on the legend and tooltip.
  return null;
};

export function RevenueChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Revenue Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="h-[250px] w-full flex justify-center">
          <PieChart width={250} height={250}>
            <Pie
              data={revenueData}
              cx="50%"
              cy="50%"
              innerRadius={80} // Creates the donut hole
              outerRadius={120} // Outer size of the donut
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
            >
              {revenueData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${value}%`} />
          </PieChart>
        </div>
        {/* Custom Legend to match the design */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm">
          {revenueData.map((entry, index) => (
            <div
              key={index}
              className="flex items-center text-muted-foreground"
            >
              <div
                className="w-2 h-2 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></div>
              {entry.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
