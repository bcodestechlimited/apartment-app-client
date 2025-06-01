import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Outlet, useLocation, useNavigate } from "react-router";

const OPTIONS = [
  "Standard rental",
  "Short let",
  "Serviced apartment",
  "Shared apartment",
  "Lekki",
  "Yaba",
  "Ikoyi",
  "Oniru",
  "Short term",
  "Long term",
  "Monthly",
  "Daily",
];

export default function MultiStepForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      // Add all the fields needed across all steps
      firstname: "",
      lastname: "",
      phoneNumber: "",
      email: "",
      step: 1,
      document: null,
      preferences: OPTIONS,
      // ...
    },
  });

  const steps = [
    {
      index: 1,
      path: "/onboarding/setup-profile",
      header: "Set up your profile",
      paragraph: null,
    },
    {
      index: 2,
      path: "/onboarding/verify-identity",
      header: "Verify your identity",
      paragraph: null,
    },
    {
      index: 3,
      path: "/onboarding/looking-for",
      header: "What are youlooking for and where?",
      paragraph:
        "This will help us tailor and curate recommendations that fit your preferences.",
    },
  ];

  const currentStep = useMemo(() => {
    const currStep = steps.find((s) => s.path === pathname)?.index  || 0;
    return currStep || 0;
    // return steps.find((s) => s.path === pathname)?.index || 0;
  }, [pathname]);

  console.log({ currentStep });

  return (
    <div className="w-full">
      <div className="text-center mb-16 flex flex-col gap-4 max-w-sm mx-auto">
        <div>
          <h2 className="text-lg font-semibold text-black mb-2">
            {steps[currentStep].header}
          </h2>
          {steps[currentStep].paragraph && (
            <p className="text-sm text-gray-600">
              {steps[currentStep].paragraph}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {steps.map((step) => (
            <div
              onClick={() => {
                console.log("ff");
                console.log({ step });

                const stepIndex = step.index - 1;
                console.log(currentStep !== stepIndex);

                if (currentStep !== stepIndex) {
                  console.log("heree");

                  methods.reset({ ...methods.getValues(), step: stepIndex });
                  navigate(step.path);
                }
              }}
              key={step.index}
              className={`w-24 h-1 rounded-full mx-auto cursor-pointer ${
                steps[currentStep].index === step.index
                  ? "bg-black"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <FormProvider {...methods}>
        <Outlet />
      </FormProvider>
    </div>
  );
}
