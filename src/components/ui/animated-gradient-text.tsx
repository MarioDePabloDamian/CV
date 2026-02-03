"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  spread?: number;
}

export const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  children,
  className,
  spread = 20,
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkDarkMode();
    
    // Observar cambios en el tema
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    return () => observer.disconnect();
  }, []);

  // Colores según el tema
  const baseColor = isDark ? "rgb(209, 213, 219)" : "rgb(31, 41, 55)"; // gray-300 / gray-800
  const gradientColor = isDark ? "rgb(56, 189, 248)" : "rgb(14, 165, 233)"; // sky-400 / sky-500

  return (
    <span
      className={cn(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent",
        "[background-repeat:no-repeat,padding-box] font-semibold",
        "animate-[gradient-shift_6s_linear_infinite]",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(270deg, transparent calc(50% - ${spread * 1.5}px), ${gradientColor} calc(50% - ${spread * 0.5}px), ${gradientColor} calc(50% + ${spread * 0.5}px), transparent calc(50% + ${spread * 1.5}px)), linear-gradient(${baseColor}, ${baseColor})`,
      }}
    >
      {children}
    </span>
  );
};
