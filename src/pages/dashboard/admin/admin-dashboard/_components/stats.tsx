import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Home, Users, ShieldCheck, Hourglass } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      title: "Total Listings",
      value: "1,250",
      icon: <Home className="w-6 h-6 text-custom-primary" />,
      description: "All active property listings",
      className: "text-custom-primary",
    },
    {
      title: "Total Tenants",
      value: "3,420",
      icon: <Users className="w-6 h-6 text-custom-primary" />,
      description: "Registered tenants on the platform",
      className: "text-yellow-700",
    },
    {
      title: "Verified Landlords",
      value: "865",
      icon: <ShieldCheck className="w-6 h-6 text-custom-primary" />,
      description: "Landlords successfully verified",
      className: "text-blue-700",
    },
    {
      title: "Pending Verifications",
      value: "42",
      icon: <Hourglass className="w-6 h-6 text-custom-primary" />,
      description: "Landlords awaiting verification",
      className: "text-purple-700",
    },
  ];

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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
                {stat.title}
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
