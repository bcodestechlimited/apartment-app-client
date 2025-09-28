import { images } from "@/constants/images";
import facebookicon from "@/assets/images/Facebook - Original.png";
import Instagram from "@/assets/images/Instagram - Original.png";
import Twitter from "@/assets/images/Twitter - Original.png";
import LinkedIn from "@/assets/images/LinkedIn - Original.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-[#222222] text-white p-8 ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">
            <img
              src={images.havenLeaseLogoWhite}
              alt="Haven Lease Logo"
              className="mx-auto md:mx-0 w-16 h-16"
            />
          </h3>
          <p className="text-gray-400">
            At HavenLease, we are redefining urban living by making quality
            homes easy to access, affordable, and stress-free.
          </p>
          <div className="flex justify-center md:justify-start space-x-4 my-8 gap-6">
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
          <ul className="leading-8">
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
          <ul className="leading-8">
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
          <h3 className="text-xl font-semibold mb-4">Subscribe</h3>
          <div>
            <p className="font-light text-muted-foreground">
              Subscibe to get latest property, blog news from us
            </p>
            <form className="space-x-4 relative mt-4 w-full">
              <Input
                type="email"
                placeholder="Email Address"
                className="p-2 pr-14 rounded bg-white text-black placeholder-gray-500 w-full focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
              />
              <Button className="px-4 py-2 cursor-pointer bg-custom-primary rounded-full hover:bg-custom-primary/90 absolute top-0.5 right-1 text-sm h-8 w-8 flex items-center justify-center">
                →
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-muted-foreground">Built By BCT Limited</p>
      </div>
    </footer>
  );
}
