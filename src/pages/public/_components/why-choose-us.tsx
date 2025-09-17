import React from "react";
import blackMan from "@/assets/images/black-man.svg";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Why Choose HavenLease</h2>
      </div>
      <div className="flex gap-2 items-center">
        <img src={blackMan} alt="" className="w-1/2" />

        <div className="text-start flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-custom-primary">
            Flexible payment plans
          </h2>
          <p className="text-muted-foreground">
            Choose a payment plan that fits your budget—pay monthly or yearly.
            No long-term commitments,—just seamless renting on your terms.
          </p>
          <Link
            to="/auth/sign-up"
            className="flex items-center font-semibold text-sm"
          >
            Get Started <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
