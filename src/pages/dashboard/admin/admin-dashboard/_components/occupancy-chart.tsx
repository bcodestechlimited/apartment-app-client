import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis, // Keep YAxis from Recharts for custom styling
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"; // Import required chart components
import { occupancyData } from "./stats";

// 1. Define the Chart Configuration
// This maps the data key 'rate' to a label and color (using a CSS variable)
const chartConfig = {
  rate: {
    label: "Occupancy Rate",
    // Use a custom color variable that matches the design (e.g., indigo/violet)
    color: "hsl(240, 50%, 50%)", // Example HSL for Indigo-like color
  },
} satisfies ChartConfig;

// Use the existing occupancyData
// const occupancyData = [ ... ]

export function OccupancyChart() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex justify-between items-center">
          Occupancy Rate
          <div className="flex text-xs items-center space-x-2 text-muted-foreground">
            <span className="flex items-center">
              <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1"></span>
              Revenue
            </span>
            <span className="text-xs">
              Monthly <span className="text-gray-400">| Annually</span>
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="[&>div]:h-[300px]">
        {" "}
        {/* Ensure ChartContainer has height */}
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={occupancyData}
            margin={{ top: 10, right: 0, left: 10, bottom: 0 }}
          >
            <defs>
              {/* Using CSS variable from chartConfig for fill color */}
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-rate)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-rate)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            {/* XAxis: uses the 'month' key */}
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              // Format month to use the short name (Jan, Feb, etc.)
              tickFormatter={(value) => value.slice(0, 3)}
            />

            {/* YAxis: We keep YAxis here for the numerical ticks */}
            <YAxis
              axisLine={false}
              tickLine={false}
              className="text-xs"
              tickMargin={8}
            />

            {/* Tooltip: using shadcn/ui ChartTooltip */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />

            {/* Area: dataKey must match the chartConfig key ('rate') */}
            <Area
              dataKey="rate"
              type="monotone" // Matches the smooth curve in the design
              fill="url(#colorRate)"
              fillOpacity={1}
              stroke="var(--color-rate)" // Use the defined stroke color
              strokeWidth={2}
              // Add a larger active dot for emphasis on hover
              activeDot={{
                r: 6,
                fill: "var(--color-rate)",
                stroke: "white",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* Removed CardFooter as it's not in your original design */}
    </Card>
  );
}
