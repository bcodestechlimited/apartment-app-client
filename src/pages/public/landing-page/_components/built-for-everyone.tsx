import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Link } from "react-router";

export default function BuiltForEveryone() {
  const [tab, setTab] = useState("tenants");

  const tenants = [
    {
      title: "Monthly Rent Payments",
      desc: "Choose a payment plan that fits your lifestyle. Break free from the traditional lump-sum yearly rent and enjoy the ease of paying in smaller, manageable installments",
      img: "https://images.unsplash.com/photo-1560184897-ea8a4a3c5f0b?auto=format&fit=crop&w=1200&q=60",
      link: "/properties",
      linkText: "Get Started now",
    },
    {
      title: "Seamless Marketplace",
      desc: "Whether it’s a few nights, a few months, or a long-term stay, find flexible living arrangements that suit students, professionals, and families alike",
      img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=60",
      link: "/properties",
      linkText: "Explore now",
    },
    {
      title: "Verified Landlords & Listings",
      desc: "Every listing is vetted for authenticity, and all payments are handled securely within the platform — giving you peace of mind with every booking",
      img: "https://images.unsplash.com/photo-1581091012184-7f9f4a3c9c22?auto=format&fit=crop&w=1200&q=60",
      link: "/properties",
      linkText: "Explore now",
    },
    {
      title: "Access to Co-Working Spaces",
      desc: "Stay productive wherever you live by booking modern co-working spaces and private offices designed for freelancers, startups, and remote workers",
      img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=60",
      link: "/properties",
      linkText: "Book a space",
    },
  ];

  const landlords = [
    {
      title: "List Properties",
      desc: "Create attractive listings in minutes.",
      img: "https://images.unsplash.com/photo-1505691723518-36a3f1aa6a63?auto=format&fit=crop&w=1200&q=60",
      link: "/properties",
      linkText: "Get Started now",
    },
    {
      title: "Tenant Screening",
      desc: "Background checks & references.",
      img: "https://images.unsplash.com/photo-1556741533-f6acd647d2fb?auto=format&fit=crop&w=1200&q=60",
      link: "/properties",
      linkText: "Get Started now",
    },
    {
      title: "Automated Payments",
      desc: "Set up recurring rent collection.",
      img: "https://images.unsplash.com/photo-1542228262-4b6a7a9b8b8c?auto=format&fit=crop&w=1200&q=60",
      link: "/properties",
      linkText: "Get Started now",
    },
    {
      title: "Portfolio Insights",
      desc: "Track income, occupancy & more.",
      img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=60",
      link: "/properties",
      linkText: "Get Started now",
    },
  ];

  const items = tab === "tenants" ? tenants : landlords;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8 text-center">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight">
          Built for everyone in the Housing Market
        </h2>
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          Whether you're searching for your next home or looking to manage
          properties, our platform is designed to make renting smarter, safer,
          and more flexible.
        </p>
      </header>

      <div className="border-b mb-8 w-fit mx-auto">
        <div className="relative flex justify-center gap-8 border-b border-muted">
          {[
            { key: "tenants", label: "For Tenants" },
            { key: "landlords", label: "For Landlords" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative pb-2 text-lg font-medium transition-colors duration-200 px-9 cursor-pointer ${
                tab === key ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {label}
              {tab === key && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-0.5 w-full h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((c, idx) => (
          <Card
            key={idx}
            className="group p-2 gap-2 overflow-hidden rounded-lg shadow-none hover:shadow-md transition-all cursor-pointer"
          >
            <div className="h-44 w-full overflow-hidden">
              <img
                src={c.img}
                alt={c.title}
                className="w-full h-full object-cover transition-transform duration-500  rounded-lg"
              />
            </div>
            <CardContent className="p-0 text-start flex flex-col gap-0">
              <h3 className="text-lg font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <Link to={c.link} className="mt-4 pl-2">
                <span className="text-custom-primary text-sm font-medium">
                  {c.linkText}
                </span>{" "}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
