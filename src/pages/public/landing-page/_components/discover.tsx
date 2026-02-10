import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  NIGERIAN_STATES,
  NIGERIAN_STATE_CITIES,
} from "@/constants/nigerian-states";
import { useState } from "react";
import { pricingModels, propertyTypes } from "@/interfaces/property.interface";
import AnimationWrapper from "@/components/animations/animation-wrapper";
import AnimatedText from "@/components/animations/animated-text";
import { Search, Check, ChevronsUpDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export default function Discover() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedPricingModel, setSelectedPricingModel] = useState<string>("");
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>("");

  // Combobox open states
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);

  return (
    <div className="w-full py-8">
      <div className="max-w-custom">
        <section className="flex items-center justify-center hero-background rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 w-full bg-black/20 backdrop-blur-xs z-0"></div>
          <div className="flex flex-col gap-6 text-center text-white py-16 pt-12 px-6 md:pt-29 z-10">
            {/* Heading - slides in first */}
            <AnimationWrapper
              delay={0.1}
              yOffset={-40}
              duration={0.8}
              className="text-5xl lg:text-5xl flex items-center justify-center mb-4"
            >
              <h1 className="font-medium flex flex-col md:flex-col gap-3 items-center tracking-wide transition-all ease-in-out duration-300">
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

            {/* Filter Bar */}
            <AnimationWrapper
              delay={0.5}
              stagger={0.15}
              className="flex flex-wrap items-center justify-center md:space-x-4 pt-10 md:pt-18 backdrop-blur-xs bg-white/10 md:p-6 rounded md:rounded-full shadow-md text-white w-full relative"
            >
              <div className="grid grid-cols-2 md:grid-cols-5 items-center gap-2 text-sm w-full">
                <CategoryTabs />

                {/* --- STATE COMBOBOX --- */}
                <div className="flex flex-col gap-2 items-center  border-r border-gray-400 pr-4 w-full">
                  <h3 className="font-bold px-4">State</h3>
                  <Popover open={openState} onOpenChange={setOpenState}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={openState}
                        className="w-full justify-between hover:bg-transparent hover:text-white text-white/90 font-normal px-4 cursor-pointer"
                      >
                        {selectedState ? selectedState : "Select your state"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search state..." />
                        <CommandList>
                          <CommandEmpty>No state found.</CommandEmpty>
                          <CommandGroup>
                            {NIGERIAN_STATES.map((state) => (
                              <CommandItem
                                key={state}
                                value={state}
                                onSelect={() => {
                                  // We use 'state' here to ensure correct casing
                                  setSelectedState(state);
                                  setSelectedCity(""); // Reset city when state changes
                                  setOpenState(false);
                                }}
                                className="text-sm cursor-pointer"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedState === state
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {state}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* --- CITY COMBOBOX --- */}
                <div className="flex flex-col gap-2 items-center border-r border-gray-400 pr-4 w-full">
                  <h3 className="font-bold">City</h3>
                  <Popover open={openCity} onOpenChange={setOpenCity}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={openCity}
                        disabled={!selectedState} // Disable if no state selected
                        className="w-full justify-between hover:bg-transparent hover:text-white text-white/90 font-normal  cursor-pointer"
                      >
                        {selectedCity ? selectedCity : "Select your city"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search city..." />
                        <CommandList>
                          <CommandEmpty>No city found.</CommandEmpty>
                          <CommandGroup>
                            {selectedState &&
                              NIGERIAN_STATE_CITIES[selectedState]?.map(
                                (city) => (
                                  <CommandItem
                                    key={city}
                                    value={city}
                                    onSelect={() => {
                                      // We use 'city' here to ensure correct casing
                                      setSelectedCity(city);
                                      setOpenCity(false);
                                    }}
                                    className="text-sm cursor-pointer"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        selectedCity === city
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                    {city}
                                  </CommandItem>
                                ),
                              )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Property Type (Kept as Select) */}
                <div className="flex flex-col gap-2 items-center border-r border-gray-400 pr-4">
                  <h3 className="font-bold">Property Type</h3>
                  <Select
                    value={selectedPropertyType}
                    onValueChange={(value) => {
                      setSelectedPropertyType(value);
                    }}
                  >
                    <SelectTrigger className="border-0 shadow-none w-full data-[placeholder]:text-white/90 cursor-pointer focus:ring-0">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((propertyType) => (
                        <SelectItem
                          key={propertyType}
                          value={String(propertyType)}
                          className="capitalize cursor-pointer"
                        >
                          {propertyType.replace("-", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rent Range (Kept as Select) */}
                <div className="flex flex-col gap-2 items-center border-gray-300 pr-4">
                  <h3 className="font-bold">Rent Range</h3>
                  <Select
                    value={selectedPricingModel}
                    onValueChange={(value) => {
                      setSelectedPricingModel(value);
                    }}
                  >
                    <SelectTrigger className="border-0 shadow-none w-full data-[placeholder]:text-white/90 cursor-pointer focus:ring-0">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      {pricingModels.map((model) => (
                        <SelectItem
                          key={model}
                          value={String(model)}
                          className="capitalize cursor-pointer"
                        >
                          {model.replace("-", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Search Button */}
                <div className="flex justify-center py-5 md:py-0 col-span-2 md:col-span-1">
                  <Link
                    to={`/properties?propertyType=${selectedPropertyType}&state=${selectedState}&city=${selectedCity}&pricingModel=${selectedPricingModel}`}
                  >
                    <Button className="w-full md:w-fit !px-6 py-2 bg-custom-primary rounded-full justify-self-center cursor-pointer">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </Link>
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
  const [selected] = useState();

  return (
    <div className="absolute hidden md:block -top-5 left-0 right-0 mx-auto w-[80%]">
      <ul className="relative flex items-center justify-between bg-white/90 backdrop-blur-md text-muted-foreground text-xs sm:text-sm px-4 py-4 rounded-full border border-white/20 shadow-sm">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={cn(
              "relative  px-2 transition-colors duration-300",
              selected === tab
                ? "text-custom-primary font-medium"
                : "hover:text-foreground",
            )}
            // onClick={() => setSelected(tab)}
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
