import NewListings from "./_components/new-listings";
import NewProjects from "./_components/newprojects";
import CoWorkingSpaces from "./_components/co-working-spaces";
import Discover from "./_components/discover";
import Newsletter from "./_components/newsletter";
import WhyChooseUs from "./_components/why-choose-us";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import Navbar from "../_shared/navbar";
import Footer from "../_shared/footer";
import BrowseWorkspaces from "./_components/browse-workspaces";
import BuiltForEveryone from "./_components/built-for-everyone";
import FAQs from "./_components/faqs";

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
    <div className="min-h-screen bg-custom-light-blue">
      <div>
        <Navbar />
        <main className="">
          <Discover />
          <NewListings />
          {/* <WhyChooseUs /> */}
          <BrowseWorkspaces />
          <BuiltForEveryone />
          {/* <NewProjects /> */}
          {/* <CoWorkingSpaces /> */}
          <FAQs />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
