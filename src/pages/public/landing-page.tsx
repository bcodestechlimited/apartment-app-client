// src/components/Header.tsx
// src/App.tsx

import PropertyCard from "@/components/landingpage/property-card";
import image1 from "../../assets/images/image1.webp";
// import citylightslogo from "../../assets/images/citylights-logo-main.png";
import citylightslogo from "@/assets/images/citylights-logo-main-light.png";
import facebookicon from "@/assets/images/Facebook - Original.png";
import Instagram from "@/assets/images/Instagram - Original.png";
import Twitter from "@/assets/images/Twitter - Original.png";
import LinkedIn from "@/assets/images/LinkedIn - Original.png";
// import newsLetter from "@/assets/images/newsletter.jpg";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router";

const newListings = [
  {
    title: "1004 Estate",
    price: "₦3.5 million",
    type: "2 Bedroom",
    img: image1,
    details: "2 🛏 | 2 🛁 | 1179 sqft",
  },
  {
    title: "Jurong East",
    price: "₦3.5 million",
    type: "Mini Flat",
    img: image1,
    details: "1 🛏 | 2 🛁 | 1400 sqft",
  },
  {
    title: "1004 Estate",
    price: "₦3.5 million",
    type: "2 Bedroom",
    img: image1,
    details: "2 🛏 | 2 🛁 | 1179 sqft",
  },
  {
    title: "Jurong East",
    price: "₦3.5 million",
    type: "Mini Flat",
    img: image1,
    details: "1 🛏 | 2 🛁 | 1400 sqft",
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
  return (
    <div className="min-h-screen">
      <main className="px-14">
        {/* header */}

        <nav className="flex items-center justify-between p-4 bg-white ">
          <div className="text-2xl font-bold text-gray-800">
            <img src={citylightslogo} alt="" />
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Discover
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              List Property
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              How It Works
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Support
            </a>
          </div>
          <div className="flex space-x-4">
            <Link
              to={"/auth/sign-up"}
              className="text-gray-600 hover:text-gray-900"
            >
              Register
            </Link>
            <Link
              to={"/auth/sign-in"}
              className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
            >
              Login
            </Link>
          </div>
        </nav>
        {/* hero */}

        <section className="relative bg-gray-200 h-[500px] flex items-center justify-center hero-background  rounded-lg">
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              FIND, BOOK, LIVE. THE SMARTER WAY TO RENT APARTMENTS & CO-WORKING
              SPACES
            </h1>
            <p className="text-lg mb-6">
              Discover standard rentals, shared spaces, serviced apartments,
              co-working spaces or short lets with flexible payment plans and
              verified listings
            </p>
            <div className="flex flex-wrap justify-center space-x-4 bg-white p-4 rounded-lg shadow-md text-[#2C3A61]">
              <section>
                <h3>Locations</h3>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select finally" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </section>
              <section>
                <h3>Property Type</h3>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select finally" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </section>
              <section>
                <h3>Rent Range</h3>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select finally" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </section>
              <section>
                <h3>Duration</h3>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select finally" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </section>
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
                Search
              </button>
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
          <div className="flex gap-6 ">
            {newListings.map((listing, idx) => (
              <PropertyCard key={idx} {...listing} />
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-10 px-4 text-left">
          <h2 className="text-2xl font-bold mb-6">Why Choose CityLights</h2>
          <div className="flex gap-6 text-white">
            <div className=" p-6 rounded-lg shadow-md landingpagewhychooseus1">
              <section className="relative top-50 ">
                <h3 className="text-xl font-semibold mb-2  ">
                  Flexible payment plans,
                </h3>
                <p className=" mb-4">
                  Choose from shared apartments, short lets, or fully serviced
                  homes seamless renting on your terms.
                </p>
                <a href="#" className="text-orange-500 hover:underline button">
                  Find out more
                </a>
              </section>
            </div>

            <section className="flex flex-col  gap-6 ">
              <div className="bg-gray-800 text-white p-6 rounded-lg landingpagewhychooseus2 ">
                <main className=" ">
                  <h3 className="text-xl font-semibold mb-2 ">
                    Find Your Ideal Co-Living Space
                  </h3>
                  <p className="mb-4">
                    Choose from shared apartments, short lets, or fully serviced
                    homes seamless renting on your terms
                  </p>
                  <a href="#" className="text-orange-500 hover:underline">
                    Find out more →
                  </a>
                </main>
              </div>

              <div className="bg-gray-800 text-white p-6 rounded-lg landingpagewhychooseus3">
                <h3 className="text-xl font-semibold mb-2">
                  Find Your Ideal Co-Living Space
                </h3>
                <p className="mb-4">
                  Choose from shared apartments, short lets, or fully serviced
                  homes seamless renting on your terms
                </p>
                <a href="#" className="text-orange-500 hover:underline">
                  Find out more →
                </a>
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
