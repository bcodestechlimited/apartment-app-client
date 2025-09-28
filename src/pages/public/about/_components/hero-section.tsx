import manAndWoman from "@/assets/images/man-and-woman.svg";

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-b md:bg-gradient-to-r from-custom-primary via-custom-primary/40 to-gray-50 flex flex-col md:flex-row items-center justify-between gap-8 px-4 py-6 mx-4 my-6 rounded-xl">
      <div className="flex flex-col gap-4 text-center md:text-start">
        <h2 className="text-2xl font-semibold text-white md:max-w-xs">
          Making Living Smarter, Simpler, and More Flexible
        </h2>
        <p className="text-white md:max-w-sm">
          We connect tenants and landlords with seamless housing solutions —
          from shared apartments to serviced living and short lets
        </p>
      </div>
      <img src={manAndWoman} alt="Man and Woman" />
    </div>
  );
}
