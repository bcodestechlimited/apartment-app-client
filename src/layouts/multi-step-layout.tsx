import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Outlet, useLocation, useNavigate } from "react-router";

export default function MultiStepForm() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      step: 1,
      document: null,
      preferences: [],
      // ...
    },
  });

  const steps = [
    {
      index: 1,
      path: "/onboarding/tenant/setup-profile",
      header: "Set up your profile",
      paragraph: null,
    },
    {
      index: 2,
      path: "/onboarding/tenant/verify-identity",
      header: "Verify your identity",
      paragraph: null,
    },
    {
      index: 3,
      path: "/onboarding/tenant/looking-for",
      header: "What are youlooking for and where?",
      paragraph:
        "This will help us tailor and curate recommendations that fit your preferences.",
    },
  ];

  const currentStep = useMemo(() => {
    const currStep = steps.find((s) => s.path === pathname)?.index || 0;
    if (!currStep) {
      return 0;
    }

    return currStep === 0 ? currStep : currStep - 1;
  }, [pathname]);

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
                const stepIndex = step.index - 1;
                if (currentStep !== stepIndex) {
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
