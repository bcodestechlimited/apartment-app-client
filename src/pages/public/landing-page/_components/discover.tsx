import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  NIGERIAN_STATES,
  NIGERIAN_STATE_CITIES,
} from "@/constants/nigerian-states";
import { useState } from "react";
import { pricingModels, propertyTypes } from "@/interfaces/property.interface";
import AnimationWrapper from "@/components/animations/animation-wrapper";
import AnimatedText from "@/components/animations/animated-text";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

export default function Discover() {
  const [selectedState, setSelectedState] =
    useState<(typeof NIGERIAN_STATES)[number]>("");

  const navigate = useNavigate();

  return (
    <div className="w-full py-8">
      <div className="max-w-custom">
        <section className="flex items-center justify-center hero-background rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 w-full bg-black/20 backdrop-blur-xs z-0">
              DDD
            </div>
          <div className="flex flex-col gap-6 text-center text-white py-16 pt-12 px-6 md:pt-29 z-10">

            {/* Heading - slides in first */}
            <AnimationWrapper
              delay={0.1}
              yOffset={-40}
              duration={0.8}
              className="text-5xl lg:text-5xl flex items-center justify-center mb-4"
            >
              <h1 className="font-medium flex flex-col md:flex-row gap-3 items-center tracking-wide transition-all ease-in-out duration-300">
                THE SMARTER WAY TO RENT{" "}
                <AnimatedText
                  words={[
                    "APARTMENTS•",
                    "SHARED APARTMENTS•",
                    "FURNISHED APARTMENTS•",
                  ]}
                />
              </h1>
            </AnimationWrapper>

            {/* Subtitle - fades in slightly after heading */}
            <AnimationWrapper delay={0.3} yOffset={20} duration={0.8}>
              <p className="text-lg md:text-xl mb-6">
                Discover standard rentals, shared spaces, serviced apartments,
                co-working spaces or short lets with flexible payment plans and
                verified listings
              </p>
            </AnimationWrapper>

            {/* Filter Bar - staggered animation for each filter option */}
            <AnimationWrapper
              delay={0.5}
              stagger={0.15}
              className="flex flex-wrap items-center justify-center space-x-4 pt-18 backdrop-blur-xs bg-white/10 p-6 rounded md:rounded-full shadow-md text-white w-full relative"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 items-center gap-2 text-sm w-full">
                <CategoryTabs />
                {/* State */}
                <div className="flex flex-col gap-2 items-center md:items-start border-r border-gray-400 pr-4">
                  <h3 className="font-bold px-4">State</h3>
                  <Select
                    onValueChange={(value) => {
                      setSelectedState(value);
                    }}
                  >
                    <SelectTrigger className="border-0 shadow-none w-full focus:ring-0 focus:border-0 focus-visible:ring-0 data-[placeholder]:text-white/90">
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {NIGERIAN_STATES.map((state) => (
                        <SelectItem key={state} value={String(state)}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* City */}
                <div className="flex flex-col gap-2 items-center border-r border-gray-400 pr-4">
                  <h3 className="font-bold">City</h3>
                  <Select>
                    <SelectTrigger className="border-0 shadow-none w-full focus:ring-0 focus:border-0 focus-visible:ring-0 data-[placeholder]:text-white/90">
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {NIGERIAN_STATE_CITIES[selectedState]?.map((lga) => (
                        <SelectItem key={lga} value={String(lga)}>
                          {lga}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Property Type */}
                <div className="flex flex-col gap-2 items-center border-r border-gray-400 pr-4">
                  <h3 className="font-bold">Property Type</h3>
                  <Select>
                    <SelectTrigger className="border-0 shadow-none w-full data-[placeholder]:text-white/90">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((propertyType) => (
                        <SelectItem
                          key={propertyType}
                          value={String(propertyType)}
                          className="capitalize"
                        >
                          {propertyType.replace("-", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rent Range */}
                <div className="flex flex-col gap-2 items-center border-gray-300 pr-4">
                  <h3 className="font-bold">Rent Range</h3>
                  <Select>
                    <SelectTrigger className="border-0 shadow-none w-full data-[placeholder]:text-white/90">
                      <SelectValue placeholder="Select rent range" />
                    </SelectTrigger>
                    <SelectContent>
                      {pricingModels.map((model) => (
                        <SelectItem
                          key={model}
                          value={String(model)}
                          className="capitalize"
                        >
                          {model.replace("-", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div className="flex justify-center col-span-2 md:col-span-1">
                  <Button
                    onClick={() => {
                      navigate("/properties");
                    }}
                    className="w-full md:w-fit !px-6 py-2 bg-custom-primary rounded-full justify-self-center cursor-pointer"
                  >
                    <Search />
                    Search
                  </Button>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </section>
      </div>
    </div>
  );
}

const tabs = [
  "Short Let",
  "Shared Apartments",
  "Serviced Apartments",
  "Standard Rentals",
  "Co-working Spaces",
];

function CategoryTabs() {
  const [selected, setSelected] = useState(tabs[0]);

  return (
    <div className="absolute -top-5 left-0 right-0 mx-auto w-[80%]">
      <ul className="relative flex items-center justify-between bg-white/90 backdrop-blur-md text-muted-foreground text-xs sm:text-sm px-4 py-4 rounded-full border border-white/20 shadow-sm">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={cn(
              "relative cursor-pointer px-2 transition-colors duration-300",
              selected === tab
                ? "text-custom-primary font-medium"
                : "hover:text-foreground"
            )}
            onClick={() => setSelected(tab)}
          >
            {tab}
            {selected === tab && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 -bottom-1 h-[2px] bg-custom-primary rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
