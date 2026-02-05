"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const rotateDirection = useCallback((currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  }, [clockwise]);

  const movingMap: Record<Direction, string> = useMemo(() => {
    // Colores azules más intensos según el tema
    const color = isDark ? "rgb(56, 189, 248)" : "rgb(14, 165, 233)"; // sky-400 para dark, sky-500 para light
    const transparentColor = isDark ? "rgba(56, 189, 248, 0)" : "rgba(14, 165, 233, 0)";
    // Aumentar el porcentaje del gradiente para que sea más visible
    return {
      TOP: `radial-gradient(30% 60% at 50% 0%, ${color} 0%, ${transparentColor} 100%)`,
      LEFT: `radial-gradient(25% 55% at 0% 50%, ${color} 0%, ${transparentColor} 100%)`,
      BOTTOM: `radial-gradient(30% 60% at 50% 100%, ${color} 0%, ${transparentColor} 100%)`,
      RIGHT: `radial-gradient(25% 55% at 100% 50%, ${color} 0%, ${transparentColor} 100%)`,
    };
  }, [isDark]);

  const highlight = useMemo(
    () => {
      const highlightColor = isDark ? "#38bdf8" : "#0ea5e9"; // sky-400 para dark, sky-500 para light
      const transparentColor = isDark ? "rgba(56, 189, 248, 0)" : "rgba(14, 165, 233, 0)";
      return `radial-gradient(75% 181.15942028985506% at 50% 50%, ${highlightColor} 0%, ${transparentColor} 100%)`;
    },
    [isDark]
  );

  useEffect(() => {
    if (hovered) return;
    
    const interval = setInterval(() => {
      setDirection((prevState) => rotateDirection(prevState));
    }, duration * 1000);
    
    return () => clearInterval(interval);
  }, [hovered, duration, rotateDirection]);
  return (
    <Tag
      onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
        setHovered(true);
        if (props.onMouseEnter) {
          props.onMouseEnter(e);
        }
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
        setHovered(false);
        if (props.onMouseLeave) {
          props.onMouseLeave(e);
        }
      }}
      className={cn(
        "relative flex rounded-full content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(1px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className={cn(
        "absolute z-[1] flex-none inset-[2px] rounded-[100px]",
        isDark ? "bg-gray-900" : "bg-white"
      )} />
    </Tag>
  );
}
