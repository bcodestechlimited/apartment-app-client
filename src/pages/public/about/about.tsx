import Footer from "../_shared/footer";
import Navbar from "../_shared/navbar";
import HeroSection from "./_components/hero-section";
import MissionVision from "./_components/mission-vision";
import SmarterWay from "./_components/smarter-way";
import WhyChooseUs from "./_components/why-choose-us";

export default function About() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <MissionVision />
      {/* <WhyChooseUs /> */}
      <SmarterWay />
      <Footer />
    </div>
  );
}
