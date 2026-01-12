import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import newsletterBg from "@/assets/images/newsletter.png";
import { Link } from "react-router";

export default function SmarterWay() {
  return (
    <section
      className="relative py-24 px-4 text-white rounded-lg mb-14 overflow-hidden mx-4 my-6"
      style={{
        backgroundImage: `url(${newsletterBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-custom-primary from-40% to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-left max-w-xl">
        <h2 className="text-2xl font-medium">Join a smarter way of living</h2>
        <p className="mb-4 md:max-w-md">
          Whether you're moving in, sharing a space, or listing a property —
          we're here to make it seamless{" "}
        </p>
        <div className="flex gap-4">
          <Link to="/properties">
            <Button className="bg-white text-custom-primary hover:bg-gray-100 cursor-pointer">
              Discover Apartmens
            </Button>
          </Link>
          <Button className="bg-transparent border border-white hover:bg-transparent cursor-pointer">
            List Apartments
          </Button>
        </div>
      </div>
    </section>
  );
}
