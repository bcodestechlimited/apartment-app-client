import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, formatCurrency } from "@/lib/utils";

export interface MetricCardProps {
  title: string;
  amount: string | number;
  bgColor: string;
  description: string;
}

const MetricCardItem = ({
  title,
  amount,
  bgColor,
  description,
}: MetricCardProps) => {
  return (
    <Card className="shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-1">
        <CardTitle>
          <p className={cn("text-md font-normal text-gray-600", bgColor)}>
            {title}
          </p>
        </CardTitle>
        {/* <div className="p-2 bg-custom-primary/10 rounded-full">
                {stat.icon}
              </div> */}
      </CardHeader>
      <CardContent className="text-start  space-y-2">
        <p className={cn("text-md font-normal text-gray-600", bgColor)}>
          {formatCurrency(amount)}
        </p>
        <p className={cn("text-md font-normal text-gray-600", bgColor)}>
          {description}
        </p>
        {/* <p className="text-xs text-gray-500 mt-1">{stat.description}</p> */}
      </CardContent>
    </Card>
  );
};

export default MetricCardItem;
