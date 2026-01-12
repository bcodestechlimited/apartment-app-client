import { Button } from "@/components/ui/button";
import workspaceImage from "@/assets/images/workspaces.svg";
import { Link } from "react-router";

export default function BrowseWorkspaces() {
  return (
    <div className="bg-[#FFFBF5] py-8">
      <div className="max-w-custom">
        <div className="">
          <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center ">
            <img src={workspaceImage} alt="" className="rounded-lg w-full" />
            <div className="flex flex-col gap-4 items-center md:items-start md:text-start">
              <h2 className="text-xl font-semibold">
                Work Amarter, Anywhere You Are
              </h2>
              <p className="text-custom-grey">
                Our platform isn't just about finding apartments — it's also
                about helping you stay productive. Discover modern co-working
                spaces designed for freelancers, startups, and remote teams.
              </p>

              <Link to="/properties?propertyType=co-working-space">
                <Button className="bg-custom-primary rounded-full px-8 font-light text-xs hover:bg-custom-primary/90 cursor-pointer">
                  Browse workspaces
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
