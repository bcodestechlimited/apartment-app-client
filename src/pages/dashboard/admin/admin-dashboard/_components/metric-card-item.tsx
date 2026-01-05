import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MetricCardProps {
  title: string;
  value: string | number;
  bgColor: string;
}

const MetricCardItem = ({ title, value, bgColor }: MetricCardProps) => {
  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>
          <p className={cn("text-md font-normal text-gray-600", bgColor)}>
            {title}
          </p>
        </CardTitle>
        {/* <div className="p-2 bg-custom-primary/10 rounded-full">
                {stat.icon}
              </div> */}
      </CardHeader>
      <CardContent className="text-start">
        <p className={cn("text-2xl font-normal text-gray-600", bgColor)}>
          {value}
        </p>
        {/* <p className="text-xs text-gray-500 mt-1">{stat.description}</p> */}
      </CardContent>
    </Card>
  );
};

export default MetricCardItem;
