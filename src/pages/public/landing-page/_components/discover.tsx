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

export default function Discover() {
  const [selectedState, setSelectedState] =
    useState<(typeof NIGERIAN_STATES)[number]>("");

  return (
    <div className="bgw-full py-8">
      <div className="max-w-custom">
        <section className="flex items-center justify-center hero-background rounded-2xl overflow-hidden">
          <div className="flex flex-col gap-6 text-center text-white py-12 px-6 md:py-24">
            {/* Heading - slides in first */}
            <AnimationWrapper delay={0.1} yOffset={-40} duration={0.8}>
              <h1 className="text-3xl md:text-5xl font-medium mb-4">
                THE SMARTER WAY TO RENT APARTMENTS.
              </h1>
            </AnimationWrapper>

            {/* Subtitle - fades in slightly after heading */}
            <AnimationWrapper delay={0.3} yOffset={20} duration={0.8}>
              <p className="text-lg mb-6">
                Discover standard rentals, shared spaces, serviced apartments,
                co-working spaces or short lets with flexible payment plans and
                verified listings
              </p>
            </AnimationWrapper>

            {/* Filter Bar - staggered animation for each filter option */}
            <AnimationWrapper
              delay={0.5}
              stagger={0.15}
              className="flex flex-wrap items-center justify-center space-x-4 bg-white p-4 rounded-lg shadow-md text-[#2C3A61]/70 w-full"
            >
              <div className="grid grid-cols-5 items-center gap-4 text-sm w-full">
                {/* State */}
                <div className="flex flex-col gap-2 items-center border-r-2 border-gray-300 pr-4">
                  <h3 className="font-bold">State</h3>
                  <Select
                    onValueChange={(value) => {
                      setSelectedState(value);
                    }}
                  >
                    <SelectTrigger className="border-0 shadow-none w-full focus:ring-0 focus:border-0 focus-visible:ring-0">
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
                <div className="flex flex-col gap-2 items-center border-r-2 border-gray-300 pr-4">
                  <h3 className="font-bold">City</h3>
                  <Select>
                    <SelectTrigger className="border-0 shadow-none w-full focus:ring-0 focus:border-0 focus-visible:ring-0">
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
                <div className="flex flex-col gap-2 items-center border-r-2 border-gray-300 pr-4">
                  <h3 className="font-bold">Property Type</h3>
                  <Select>
                    <SelectTrigger className="border-0 shadow-none w-full">
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
                <div className="flex flex-col gap-2 items-center border-r-2 border-gray-300 pr-4">
                  <h3 className="font-bold">Rent Range</h3>
                  <Select>
                    <SelectTrigger className="border-0 shadow-none w-full">
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
                <div className="flex justify-center">
                  <Button className="w-fit px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 justify-self-center cursor-pointer">
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
