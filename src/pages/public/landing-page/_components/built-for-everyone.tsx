import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { Link } from "react-router";
import forTenants1 from "@/assets/images/for-tenants-1.png";
import forTenants2 from "@/assets/images/for-tenants-2.png";
import forTenants3 from "@/assets/images/for-tenants-3.png";
import forTenants4 from "@/assets/images/for-tenants-4.png";
import greenArrow from "@/assets/images/green-arrow.png";

export default function BuiltForEveryone() {
  const [tab, setTab] = useState("tenants");

  const tenants = [
    {
      title: "Monthly Rent Payments",
      desc: "Choose a payment plan that fits your lifestyle. Break free from the traditional lump-sum yearly rent and enjoy the ease of paying in smaller, manageable installments",
      img: forTenants1,
      link: "/properties",
      linkText: "Get Started now",
    },
    {
      title: "Seamless Marketplace",
      desc: "Whether it’s a few nights, a few months, or a long-term stay, find flexible living arrangements that suit students, professionals, and families alike",
      img: forTenants2,
      link: "/properties",
      linkText: "Explore now",
    },
    {
      title: "Verified Landlords & Listings",
      desc: "Every listing is vetted for authenticity, and all payments are handled securely within the platform — giving you peace of mind with every booking",
      img: forTenants3,
      link: "/properties",
      linkText: "Explore now",
    },
    {
      title: "Access to Co-Working Spaces",
      desc: "Stay productive wherever you live by booking modern co-working spaces and private offices designed for freelancers, startups, and remote workers",
      img: forTenants4,
      link: "/properties",
      linkText: "Book a space",
    },
  ];

  const landlords = [
    {
      title: "List Properties",
      desc: "Create attractive listings in minutes.",
      img: forTenants2,
      link: "/properties",
      linkText: "Get Started now",
    },
    {
      title: "Tenant Screening",
      desc: "Background checks & references.",
      img: forTenants4,
      link: "/properties",
      linkText: "Get Started now",
    },
    {
      title: "Automated Payments",
      desc: "Set up recurring rent collection.",
      img: forTenants3,
      link: "/properties",
      linkText: "Get Started now",
    },
    {
      title: "Portfolio Insights",
      desc: "Track income, occupancy & more.",
      img: forTenants1,
      link: "/properties",
      linkText: "Get Started now",
    },
  ];

  const items = tab === "tenants" ? tenants : landlords;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8 text-center">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
          Built for everyone in the Housing Market
        </h2>
        <p className="mt-3 text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((c, idx) => (
          <Card
            key={idx}
            className="group p-2 gap-2 overflow-hidden rounded-lg border-gray-100 shadow-none hover:shadow-md transition-all cursor-pointer"
          >
            <div className="min-h-64 w-full overflow-hidden">
              <img
                src={c.img}
                alt={c.title}
                className="w-full h-full object-cover transition-transform duration-500  rounded-lg"
              />
            </div>
            <CardContent className="p-0 text-start flex flex-col gap-0">
              <h3 className="text-xl font-semibold py-2">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
              <Link to={c.link} className="my-4 pl-2 flex items-center gap-2">
                <span className="text-custom-primary text-sm font-semibold">
                  {c.linkText}
                </span>{" "}
                <img src={greenArrow} alt="" className="w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
