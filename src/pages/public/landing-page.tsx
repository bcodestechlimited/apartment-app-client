import citylightslogo from "@/assets/images/citylights-logo-main-light.png";
import facebookicon from "@/assets/images/Facebook - Original.png";
import Instagram from "@/assets/images/Instagram - Original.png";
import Twitter from "@/assets/images/Twitter - Original.png";
import LinkedIn from "@/assets/images/LinkedIn - Original.png";
import whyChooseUs1 from "@/assets/images/whychooseus1.png";
import whyChooseUs2 from "@/assets/images/whychooseustwo.png";
import whyChooseUs3 from "@/assets/images/two-guys.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import NewListings from "./_components/new-listings";
import NewProjects from "./_components/newprojects";
import CoWorkingSpaces from "./_components/co-working-spaces";
import Discover from "./_components/discover";
import Newsletter from "./_components/newsletter";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-sky-50">
      <nav className="flex items-center justify-between px-14 py-4 bg-sky-50 ">
        <div className="text-2xl font-bold text-gray-800">
          <img src={citylightslogo} alt="" className="w-14 min-w-12" />
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
            Discover
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
            List Property
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
            How It Works
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-medium">
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

      <main className="px-14">
        {/* Discover Section */}
        <Discover />
        {/* New Listings Section */}
        <NewListings />
        {/* Why Choose Us Section */}
        <section className="py-10 px-4 text-left">
          <h2 className="text-2xl font-bold mb-6">Why Choose CityLights</h2>
          <div className="flex flex-col md:flex-row gap-6 text-white">
            <div
              className={cn(
                `pt-52 pb-10 px-6 md:pt-12 rounded-lg shadow-md relative flex items-end bg-cover bg-center md:w-1/2`
              )}
              style={{ backgroundImage: `url('${whyChooseUs1}')` }}
            >
              {/* <img src={whyChooseUs1} alt="" className="w-100 absolute" /> */}
              <section className=" relative z-20 bottom-0">
                <h3 className="text-xl font-semibold mb-2  ">
                  Flexible payment plans,
                </h3>
                <p className=" mb-4">
                  Choose a payment plan that fits your budget—pay monthly or
                  yearly. No long-term commitments,—just seamless renting on
                  your terms.
                </p>
                <Button className="bg-orange-500 hover:underline button">
                  Find out more
                </Button>
              </section>
            </div>

            <section className="flex flex-col gap-6 md:w-1/2 ">
              <div
                className={cn(
                  `pt-52 pb-10 px-6 md:pt-12 rounded-lg shadow-md relative  flex items-end bg-cover bg-center md:h-1/2`
                )}
                style={{ backgroundImage: `url('${whyChooseUs2}')` }}
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2 ">
                    Find Your Ideal Co-Living Space
                  </h3>
                  <p className="mb-4">
                    Choose from shared apartments, short lets, or fully serviced
                    homes
                  </p>
                  <Button className="bg-orange-500 hover:underline button">
                    Find out more
                  </Button>
                </div>
              </div>

              <div
                className={cn(
                  `pt-52 pb-10 px-6 rounded-lg shadow-md relative flex items-end bg-cover bg-center md:h-1/2`
                )}
                style={{ backgroundImage: `url('${whyChooseUs3}')` }}
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Verified Listings & Tenants
                  </h3>
                  <p className="mb-4">
                    Trustworthy rentals with real-time verification and reviews
                  </p>
                  <Button className="bg-orange-500 hover:underline button">
                    Find out more
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* New Projects */}
        <NewProjects />
        {/* Co-working Spaces */}
        <CoWorkingSpaces />
        {/* Newsletter Section */}
        <Newsletter />
      </main>
      {/* Footer Section */}
      <footer className="bg-[#222222] text-white p-15 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">
              <img
                src={citylightslogo}
                alt="citylightslogo"
                className="mx-auto md:mx-0 md:w-20"
              />
            </h3>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum euismod, nisl sit amet.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-15 mb-10 gap-6">
              {[
                { icon: facebookicon, link: "#" },
                { icon: Twitter, link: "#" },
                { icon: Instagram, link: "#" },
                { icon: LinkedIn, link: "#" },
              ].map(({ icon, link }) => (
                <a
                  key={link}
                  href={link}
                  className="text-gray-400 hover:text-white"
                >
                  <img src={icon} alt={`${link} icon`} />
                </a>
              ))}
            </div>
            <p>&copy; {new Date().getFullYear()}. All rights reserved.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Take a Tour</h3>
            <ul className="space-y-2 leading-12">
              {[
                { title: "Features", link: "#" },
                { title: "Partners", link: "#" },
                { title: "Pricing", link: "#" },
                { title: "Product", link: "#" },
                { title: "Support", link: "#" },
              ].map(({ title, link }) => (
                <li key={title}>
                  <a href={link} className="text-gray-400 hover:text-white">
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Company</h3>
            <ul className="space-y-2 leading-12">
              {[
                { title: "About Us", link: "#" },
                // { title: "Agents", link: "#" },
                { title: "Blog", link: "#" },
                { title: "Media", link: "#" },
                { title: "Contact Us", link: "#" },
              ].map(({ title, link }) => (
                <li key={title}>
                  <a href={link} className="text-gray-400 hover:text-white">
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col text-left">
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p>Subscibe to get latest property, blog news from us</p>
            <form className="space-x-4 relative mt-8 w-full">
              <Input
                type="email"
                placeholder="Email Address"
                className="p-2 pr-14 rounded bg-white text-black placeholder-gray-500 w-full focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
              />
              <Button className="px-4 py-2 cursor-pointer bg-[#004542] rounded-full hover:bg-green-700 absolute top-0.5 right-1 text-sm h-8 w-8 flex items-center justify-center">
                →
              </Button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
