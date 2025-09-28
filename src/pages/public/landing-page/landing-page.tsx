import facebookicon from "@/assets/images/Facebook - Original.png";
import Instagram from "@/assets/images/Instagram - Original.png";
import Twitter from "@/assets/images/Twitter - Original.png";
import LinkedIn from "@/assets/images/LinkedIn - Original.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NewListings from "./_components/new-listings";
import NewProjects from "./_components/newprojects";
import CoWorkingSpaces from "./_components/co-working-spaces";
import Discover from "./_components/discover";
import Newsletter from "./_components/newsletter";
import { images } from "@/constants/images";
import WhyChooseUs from "./_components/why-choose-us";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import Navbar from "../_shared/navbar";
import Footer from "../_shared/footer";

const LandingPage = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authService.getUser(),
    retry: false,
  });

  return (
    <div className="min-h-screen bg-sky-50">
      <div className="max-w-[1920px] mx-auto">
        <Navbar />
        <main className="px-4">
          <Discover />
          <NewListings />
          <WhyChooseUs />
          <NewProjects />
          <CoWorkingSpaces />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
