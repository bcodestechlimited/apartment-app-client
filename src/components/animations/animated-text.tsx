import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface AnimatedTextProps {
  words: string[];
  interval?: number; // optional delay between words
}

export default function AnimatedText({
  words,
  interval = 3000,
}: AnimatedTextProps) {
  const [index, setIndex] = useState(0);

  // Compute longest word to stabilize width
  const longestWord = useMemo(
    () => words.reduce((a, b) => (a.length > b.length ? a : b), ""),
    [words]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div
      className={cn(`relative inline-block overflow-hidden`, {
        "w-full": !longestWord,
      })}
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={words[index]}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="bg-gradient-to-r from-[#FF612D]/50 to-[#FF612D] bg-clip-text text-transparent inline-block"
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
