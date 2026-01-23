import NewListings from "./_components/new-listings";
import Discover from "./_components/discover";
import Newsletter from "./_components/newsletter";
import { useQuery } from "@tanstack/react-query";
import { authService } from "@/api/auth.api";
import BrowseWorkspaces from "./_components/browse-workspaces";
import BuiltForEveryone from "./_components/built-for-everyone";
import FAQs from "./_components/faqs";
import { useAuthStore } from "@/store/useAuthStore";

const LandingPage = () => {
  const query = useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authService.getUser(),
    retry: false,
  });

  const { user } = useAuthStore();

  return (
    <div>
      <Discover />
      <NewListings user={user} />
      <BrowseWorkspaces user={user} />
      <BuiltForEveryone user={user} />
      <FAQs />
      <Newsletter />
    </div>
  );
};

export default LandingPage;
