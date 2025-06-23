import image1 from "../../assets/images/image1.webp";
// import citylightslogo from "../../assets/images/citylights-logo-main.png";
import citylightslogo from "@/assets/images/citylights-logo-main-light.png";
import facebookicon from "@/assets/images/Facebook - Original.png";
import Instagram from "@/assets/images/Instagram - Original.png";
import Twitter from "@/assets/images/Twitter - Original.png";
import LinkedIn from "@/assets/images/LinkedIn - Original.png";
// import newsLetter from "@/assets/images/newsletter.jpg";

import whyChooseUs1 from "@/assets/images/whychooseus1.png";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PublicPropertyCard } from "@/components/shared/propertyCard";
import { Button } from "@/components/ui/button";
import {
  NIGERIAN_STATES,
  NIGERIAN_STATE_CITIES,
} from "@/constants/nigerian-states";
import { useState } from "react";
import { pricingModels, propertyTypes } from "@/interfaces/property.interface";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

const newListings = [
  {
    _id: "1",
    title: "1004 Estate",
    price: 3500000,
    address: "Lekki Phase 1, Lagos",
    state: "Lagos",
    lga: "Lekki",
    type: "2 Bedroom",
    pictures: [image1],
    description: "2 | 2 | 1179 sqft",
    amenities: ["Wi-Fi", "Air-Conditioner", "Power-Backup", "Coffee"],
    facilities: ["Parking", "Gym", "Swimming Pool", "Security"],
    numberOfBedRooms: "2",
    numberOfBathrooms: "2",
    isVerified: true,
    isAvailable: true,
    pricingModel: "hourly",
    availabilityDate: "2023-01-01",
  },
  {
    _id: "2",
    title: "Jurong East",
    price: 3500000,
    address: "Lekki Phase 1, Lagos",
    state: "Lagos",
    lga: "Lekki",
    type: "Mini Flat",
    pictures: [image1],
    description: "1 | 2 | 1400 sqft",
    amenities: ["Wi-Fi", "Air-Conditioner", "Power-Backup", "Coffee"],
    facilities: ["Parking", "Gym", "Swimming Pool", "Security"],
    numberOfBedRooms: "1",
    numberOfBathrooms: "2",
    isVerified: false,
    isAvailable: true,
    pricingModel: "hourly",
    availabilityDate: "2023-01-01",
  },
  {
    _id: "3",
    title: "1004 Estate",
    price: 3500000,
    address: "Lekki Phase 1, Lagos",
    state: "Lagos",
    lga: "Lekki",
    type: "2 Bedroom",
    pictures: [image1],
    description: "2 | 2 | 1179 sqft",
    amenities: ["Wi-Fi", "Air-Conditioner", "Power-Backup", "Coffee"],
    facilities: ["Parking", "Gym", "Swimming Pool", "Security"],
    numberOfBedRooms: "1",
    numberOfBathrooms: "2",
    isVerified: true,
    isAvailable: true,
    pricingModel: "hourly",
    availabilityDate: "2023-01-01",
  },
  {
    _id: "4",
    title: "Jurong East",
    price: 3500000,
    address: "Lekki Phase 1, Lagos",
    state: "Lagos",
    lga: "Lekki",
    type: "Mini Flat",
    pictures: [image1],
    description: "1 | 2 | 1400 sqft",
    amenities: ["Wi-Fi", "Air-Conditioner", "Power-Backup", "Coffee"],
    facilities: ["Parking", "Gym", "Swimming Pool", "Security"],
    numberOfBedRooms: "1",
    numberOfBathrooms: "2",
    isVerified: true,
    isAvailable: true,
    pricingModel: "hourly",
    availabilityDate: "2023-01-01",
  },
];

const spaces = [
  {
    title: "1004 Phase 1",
    location: "Lekki Phase 1",
    image: image1,
  },
  {
    title: "Shared Duplex",
    location: "Alimosho Lagos",
    image: image1,
  },
  {
    title: "3 Bedroom",
    location: "Ikate Lagos",
    image: image1,
  },
  {
    title: "Studio",
    location: "Yaba Lagos",
    image: image1,
  },
];

const projects = [
  {
    title: "Short Let",
    location: "Lekki Phase 1",
    image: image1,
  },
  {
    title: "Shared Aprt",
    location: "Alimosho Lagos",
    image: image1,
  },
  {
    title: "Serviced Aprt",
    location: "Ikate Lagos",
    image: image1,
  },
  {
    title: "Yaba Let",
    location: "Yaba Lagos",
    image: image1,
  },
];

const LandingPage = () => {
  const [selectedState, setSelectedState] =
    useState<(typeof NIGERIAN_STATES)[number]>("");

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="px-14">
        <nav className="flex items-center justify-between p-4 bg-white ">
          <div className="text-2xl font-bold text-gray-800">
            <img src={citylightslogo} alt="" className="w-14 min-w-12" />
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Discover
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              List Property
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              How It Works
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Support
            </a>
          </div>
          <div className="flex space-x-4">
            <Link
              to={"/auth/sign-up"}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Register
            </Link>
            <Link
              to={"/auth/sign-in"}
              className="px-4 py-1 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Login
            </Link>
          </div>
        </nav>

        <section className="bg-gray-200 flex items-center justify-center hero-background  rounded-lg">
          <div className=" flex flex-col gap-6 text-center text-white py-12 px-6">
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
              <div className="grid grid-cols-6 items-center gap-4 text-sm w-full">
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
                <div className="flex flex-col gap-2 items-center">
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
                </div>

                <Button className="w-fit px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 justify-self-center cursor-pointer">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* New Listings Section */}
        <section className="py-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">New Listings</h2>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              View more →
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newListings.map((listing) => (
              <PublicPropertyCard property={listing} />
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-10 px-4 text-left">
          <h2 className="text-2xl font-bold mb-6">Why Choose CityLights</h2>
          <div className="flex gap-6 text-white">
            <div
              className={cn(
                `p-6 rounded-lg shadow-md  flex items-end bg-cover bg-center`
              )}
              style={{ backgroundImage: `url('${whyChooseUs1}')` }}
            >
              {/* <img src={whyChooseUs1} alt="" className="w-100 absolute" /> */}
              <section className=" relative z-20">
                <h3 className="text-xl font-semibold mb-2  ">
                  Flexible payment plans,
                </h3>
                <p className=" mb-4">
                  Choose from shared apartments, short lets, or fully serviced
                  homes seamless renting on your terms.
                </p>
                <Button className="bg-orange-500 hover:underline button">
                  Find out more
                </Button>
              </section>
            </div>

            <section className="flex flex-col  gap-6 ">
              <div className="bg-gray-800 text-white p-6 rounded-lg landingpagewhychooseus2 pt-32 ">
                <h3 className="text-xl font-semibold mb-2 ">
                  Find Your Ideal Co-Living Space
                </h3>
                <p className="mb-4">
                  Choose from shared apartments, short lets, or fully serviced
                  homes seamless renting on your terms
                </p>
                <Button className="bg-orange-500 hover:underline button">
                  Find out more
                </Button>
              </div>

              <div className="bg-gray-800 text-white p-6 rounded-lg landingpagewhychooseus3 pt-32">
                <h3 className="text-xl font-semibold mb-2">
                  Find Your Ideal Co-Living Space
                </h3>
                <p className="mb-4">
                  Choose from shared apartments, short lets, or fully serviced
                  homes seamless renting on your terms
                </p>
                <Button className="bg-orange-500 hover:underline button">
                  Find out more
                </Button>
              </div>
            </section>
          </div>
        </section>

        {/* New Projects */}
        <section className="py-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              New projects in popular areas
            </h2>
            <a href="#" className="text-orange-500 hover:underline">
              View More →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-gray-600">{project.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Co-working Spaces */}
        <section className="py-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Find co-working spaces around you
            </h2>
            <a href="#" className="text-orange-500 hover:underline">
              View More →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {spaces.map((space, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={space.image}
                  alt={space.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{space.title}</h3>
                  <p className="text-gray-600">{space.location}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* Newsletter Section */}
        <section className="py-12 px-4 bg-green-600 text-white  rounded-lg mb-14 newsletter">
          <div className="pr-[560px] py-[40px] pl-[40px] text-left">
            <h2 className="text-2xl font-bold mb-4">
              GET EXCLUSIVE PROPERTY INSIGHTS
            </h2>
            <p className="mb-6">
              Sign up for our newsletter and get exclusive property insights
            </p>
            <div className="flex  space-x-4 absolute">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded text-gray-800 w-150 bg-white"
              />
              <button className="px-4 py-2 bg-[#004542] rounded hover:bg-orange-600">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      {/* Footer Section */}
      <footer className="bg-[#222222] text-white p-15 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-4">
              <img src={citylightslogo} alt="citylightslogo" />
            </h3>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum euismod, nisl sit amet.
            </p>
            <div className="flex space-x-4 mt-15 mb-10 gap-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <img src={facebookicon} alt="facebookicon" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <img src={Twitter} alt="Twittericon" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <img src={Instagram} alt="Instagramicon" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <img src={LinkedIn} alt="LinkedInicon" />
              </a>
            </div>
            <p>&copy; 2021. All rights reserved.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Take a Tour</h3>
            <ul className="space-y-2 leading-12">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Partners
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Product
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Company</h3>
            <ul className="space-y-2 leading-12">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Agents
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Media
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p>Subscibe to get latest property, blog news from us</p>
            <div className="flex space-x-4 absolute mt-8">
              <input
                type="email"
                placeholder="Email Address"
                className="p-2 rounded-lg bg-white text-black placeholder-gray-500"
              />
              <button className="px-4 py-2 bg-[#004542] rounded-full hover:bg-green-700 relative top-1 right-20 text-sm h-8 w-8 flex items-center justify-center">
                →
              </button>
            </div>
          </div>
        </div>
      </footer>
      {/* Add more sections like NewProjects, CoWorkingSpaces, Newsletter, and Footer */}
    </div>
  );
};

export default LandingPage;
