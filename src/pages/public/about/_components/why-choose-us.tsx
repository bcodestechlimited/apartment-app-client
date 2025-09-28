import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Flexible Payment",
      description:
        "Choose from multiple payment options, including monthly and yearly plans, to suit your budget and lifestyle.",
      image: "/images/flexible-payment.svg",
    },
    {
      title: "Verified Listings",
      description:
        "All properties are thoroughly verified to ensure safety, transparency, and a stress-free renting experience.",
      image: "/images/verified-listings.svg",
    },
    {
      title: "24/7 Support",
      description:
        "Our dedicated support team is always available to help you with any issues or questions.",
      image: "/images/support.svg",
    },
    {
      title: "Trusted by Many",
      description:
        "Join thousands of happy tenants and landlords who rely on our platform for secure transactions.",
      image: "/images/trusted.svg",
    },
  ];

  return (
    <div className="space-y-8 mx-4 my-8">
      <div>
        <h2 className="text-2xl font-bold text-start">Why Choose Us</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="shadow-none border border-gray-200 hover:shadow-lg transition p-3"
          >
            <CardHeader className="flex flex-col items-center space-y-4 p-0">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-16 h-16 object-contain"
              />
              <CardTitle className="text-lg font-semibold text-left">
                {feature.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0">
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
