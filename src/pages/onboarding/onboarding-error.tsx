import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function OnboardingError() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Something went wrong with the onboarding</h1>
      <p>Please click on the link to start afresh</p>
      <Link to="/onboarding/role-selection">
        <Button className=" bg-custom-primary cursor-pointer">Restart Onboarding</Button>
      </Link>
    </div>
  );
}
