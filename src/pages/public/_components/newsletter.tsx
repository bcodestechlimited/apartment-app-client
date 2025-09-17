import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import newsletterBg from "@/assets/images/newsletter.png";

export default function Newsletter() {
  return (
    <section
      className="relative py-24 px-4 text-white rounded-lg mb-14 overflow-hidden"
      style={{
        backgroundImage: `url(${newsletterBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-custom-primary from-20% to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-left max-w-xl">
        <h2 className="text-2xl font-medium">
          Get exclusive property insights
        </h2>
        <p className="mb-4">
          Sign up for our newsletter and get exclusive property insights
        </p>
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 max-w-sm bg-white p-2 rounded">
          <Input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded text-gray-800 bg-white w-full border-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none "
          />
          <Button className=" py-2 btn-primary rounded-md ml-auto">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
}
