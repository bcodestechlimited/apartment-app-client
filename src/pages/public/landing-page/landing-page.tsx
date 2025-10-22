import NewListings from "./_components/new-listings";
import Discover from "./_components/discover";
import Newsletter from "./_components/newsletter";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import BrowseWorkspaces from "./_components/browse-workspaces";
import BuiltForEveryone from "./_components/built-for-everyone";
import FAQs from "./_components/faqs";

const LandingPage = () => {
  const query = useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authService.getUser(),
    retry: false,
  });

  return (
    <div>
      <Discover />
      <NewListings />
      <BrowseWorkspaces />
      <BuiltForEveryone />
      <FAQs />
      <Newsletter />
    </div>
  );
};

export default LandingPage;
