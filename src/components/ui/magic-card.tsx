import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

interface MagicCardBaseProps {
  children?: React.ReactNode;
  className?: string;
  gradientSize?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

interface MagicCardGradientProps extends MagicCardBaseProps {
  mode?: "gradient";
  gradientColor?: string;
  gradientOpacity?: number;
}

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor: _gradientColor = "#262626",
  gradientOpacity = 0.6,
  gradientFrom = "#38bdf8",
  gradientTo = "#0ea5e9",
  mode = "gradient",
}: MagicCardGradientProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const gradientSizeRef = useRef(gradientSize);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    gradientSizeRef.current = gradientSize;
  }, [gradientSize]);

  const isDarkTheme = useMemo(() => {
    if (!mounted) return true;
    return theme === "dark";
  }, [theme, mounted]);

  const reset = useCallback(
    (reason: "enter" | "leave" | "global" | "init" = "leave") => {
      if (reason === "enter") return;
      const off = -gradientSizeRef.current;
      mouseX.set(off);
      mouseY.set(off);
    },
    [mouseX, mouseY]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    reset("init");
  }, [reset]);

  const borderBackground = useMotionTemplate`
    linear-gradient(${isDarkTheme ? "hsl(0 0% 3.9%)" : "white"} 0 0) padding-box,
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom},
      ${gradientTo},
      ${isDarkTheme ? "hsl(0 0% 14.9%)" : "hsl(0 0% 89.8%)"} 100%
    ) border-box
  `;

  const spotlightBackground = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${isDarkTheme ? "#0c4a6e" : "#e0f2fe"},
      transparent 100%
    )
  `;

  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-[inherit] border border-transparent",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => reset("leave")}
      style={{ background: borderBackground }}
    >
      <div
        className={cn(
          "absolute inset-px z-20 rounded-[inherit]",
          isDarkTheme ? "bg-gray-950" : "bg-white"
        )}
      />

      {mode === "gradient" && (
        <motion.div
          className="pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: spotlightBackground,
            opacity: gradientOpacity,
          }}
        />
      )}

      <div className="relative z-40">{children}</div>
    </motion.div>
  );
}
