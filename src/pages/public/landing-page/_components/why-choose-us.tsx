import blackMan from "@/assets/images/black-man.svg";
import { Link } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const slides = [
  {
    id: 1,
    title: "Flexible payment plans",
    description:
      "Choose a payment plan that fits your budget—pay monthly or yearly. No long-term commitments, just seamless renting on your terms.",
    image: blackMan,
  },
  {
    id: 2,
    title: "Secure and safe transactions",
    description:
      "We prioritize your security with top-notch encryption and fraud prevention, ensuring your transactions are always safe.",
    image: blackMan,
  },
  {
    id: 3,
    title: "Find homes easily",
    description:
      "Browse thousands of properties and find your perfect home with advanced filtering and a seamless search experience.",
    image: blackMan,
  },
];

export default function WhyChooseUs() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Why Choose HavenLease</h2>
      </div>
      <div className="relative overflow-hidden">
        <div
          className=" flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => {
            return (
              <div className="flex items-center justify-items-center gap-8 min-w-full">
                <img
                  src={slide.image}
                  alt=""
                  className="w-1/2 bg-gradient-to-t from-custom-primary via-gray-50 to-gray-200 rounded-xl"
                />

                <div className="flex h-full flex-1">
                  <div className="text-start flex flex-col flex-1 justify-center gap-2 md:max-w-sm mx-auto">
                    <h2 className="text-2xl md:text-3xl font-semibold">
                      {slide.title}
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-lg">
                      {slide.description}
                    </p>
                    <Link
                      to="/auth/sign-up"
                      className="flex items-center font-semibold text-lg text-custom-primary"
                    >
                      Get Started now <ArrowRight className="ml-2" />
                    </Link>
                  </div>

                  <div className="flex justify-end gap-2 mt-auto ml-auto">
                    <ChevronLeft
                      size={30}
                      className="bg-gray-300 text-gray-500 p-1 rounded-full cursor-pointer"
                      onClick={prevSlide}
                    />
                    <ChevronRight
                      size={30}
                      className="bg-custom-primary text-white p-1 rounded-full cursor-pointer"
                      onClick={nextSlide}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
