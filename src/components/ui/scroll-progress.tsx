import { motion, useScroll, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className={cn(
        "fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-400 print:hidden",
        className
      )}
    />
  );
}
