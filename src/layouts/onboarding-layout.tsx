import { motion } from "motion/react";
import cityLightsLogo from "@/assets/images/citylights-logo-main.png";
import cityLightsLogoLight from "@/assets/images/citylights-logo-main-light.png";
import { Outlet } from "react-router";
export const OnboardingLayout = () => {
  return (
    <div className="bg-custom-primary min-h-screen flex flex-col justify-center items-center px-4">
      {/* Animated Logo */}
      <motion.img
        src={cityLightsLogo}
        alt="CityLights Logo"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: -100, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-24 h-24 mb-6"
      />

      {/* Animated Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex flex-col items-center w-full max-w-sm"
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export const OnboardingLayoutLight = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center px-4">
      {/* Animated Logo */}
      <motion.img
        src={cityLightsLogoLight}
        alt="CityLights Logo"
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: -30, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-24 h-24"
      />

      {/* Animated Form Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex flex-col items-center w-full mx-auto"
      >
        <Outlet />
      </motion.div>
    </div>
  );
};
