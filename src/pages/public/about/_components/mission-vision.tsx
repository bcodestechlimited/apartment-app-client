import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";

export default function MissionVision() {
  const data = [
    {
      title: "Our Mission",
      description:
        "Our mission is to redefine urban living by making housing flexible, affordable, and accessible. Whether you’re looking for a place to stay short-term or a long-term home, we make it simple to find, verify, and move in with confidence.",
    },
    {
      title: "Our Vision",
      description:
        "We envision a world where finding the right space feels effortless — a trusted platform that empowers tenants, landlords, and agents with transparency, flexibility, and convenience.",
    },
  ];

  return (
    <div className="mx-4 my-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item, index) => (
          <Card
            key={index}
            className="shadow-none border border-gray-200 transition text-start bg-white gap-4"
          >
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-custom-primary">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
