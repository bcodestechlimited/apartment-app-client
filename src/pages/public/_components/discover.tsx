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

export default function Discover() {
  const [selectedState, setSelectedState] =
    useState<(typeof NIGERIAN_STATES)[number]>("");

  return (
    <section className="bg-gray-200 flex items-center justify-center hero-background rounded-lg ">
      <div className=" flex flex-col gap-6 text-center text-white py-12 px-6 md:py-24">
        <h1 className="text-3xl md:text-5xl font-medium mb-4">
          FIND, BOOK, LIVE. THE SMARTER WAY TO RENT APARTMENTS & CO-WORKING
          SPACES
        </h1>
        <p className="text-lg mb-6">
          Discover standard rentals, shared spaces, serviced apartments,
          co-working spaces or short lets with flexible payment plans and
          verified listings
        </p>
        <div className="flex flex-wrap items-center justify-center space-x-4 bg-white p-4 rounded-lg shadow-md text-[#2C3A61]/70 w-full">
          <div className="grid grid-cols-5 items-center gap-4 text-sm w-full">
            <div className="flex flex-col gap-2 items-center border-r-2 border-gray-300 pr-4">
              <h3 className="font-bold">State</h3>
              <Select
                onValueChange={(value) => {
                  setSelectedState(value);
                }}
              >
                <SelectTrigger className="border-0 shadow-none w-full focus:ring-0 focus:border-0 focus-visible:ring-0">
                  <SelectValue placeholder="Select your city" />
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
            {/* <Separator orientation="vertical" className="h-full" /> */}
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
            {/* <Separator orientation="vertical" /> */}
            <div className="flex flex-col gap-2 items-center border-r-2 border-gray-300 pr-4">
              <h3 className="font-bold">Rent Range</h3>
              <Select>
                <SelectTrigger className="border-0 shadow-none w-full">
                  <SelectValue placeholder="Select rent range" />
                </SelectTrigger>
                <SelectContent>
                  {pricingModels.map((propertyType) => (
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
            {/* <Separator orientation="vertical" /> */}
            {/* <div className="flex flex-col gap-2 items-center">
              <h3 className="font-bold">Duration</h3>
              <Select>
                <SelectTrigger className="border-0 shadow-none w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div> */}

            <Button className="w-fit px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 justify-self-center cursor-pointer">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
