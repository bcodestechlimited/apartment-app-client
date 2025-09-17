// components/animation/AnimationWrapper.tsx
import { motion, type Variants } from "motion/react";

interface AnimationWrapperProps {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  yOffset?: number;
  duration?: number;
}

/**
 * Reusable animation wrapper
 */
export default function AnimationWrapper({
  children,
  className,
  delay = 0,
  stagger = 0.2,
  yOffset = 40,
  duration = 0.8,
}: AnimationWrapperProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: stagger,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {Array.isArray(children)
        ? children.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
