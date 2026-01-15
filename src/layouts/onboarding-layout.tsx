import { motion } from "motion/react";
import { Link, Outlet } from "react-router";
import { images } from "@/constants/images";
export const OnboardingLayout = () => {
  return (
    <div className="bg-custom-primary min-h-screen flex flex-col justify-center items-center px-4">
      {/* Animated Logo */}
      <Link to="/">
        <motion.img
          src={images.havenLeaseLogoWhite}
          alt="Haven Lease Logo"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -30, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-24 h-24 cursor-pointer"
        />
      </Link>

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
      <Link to="/">
        <motion.img
          src={images.havenLeaseLogoGreen}
          alt="Haven Lease Logo"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -30, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-24 h-24 cursor-pointer"
        />
      </Link>

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
