import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { BlurFade } from "./blur-fade";
import { BorderBeam } from "./border-beam";
import { MagicCard } from "./magic-card";

interface SectionCardProps {
  children: ReactNode;
  id?: string;
  className?: string;
  padding?: "sm" | "md" | "lg";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  beam?: boolean;
  interactive?: boolean;
}

const paddingMap = {
  sm: "p-4 sm:p-5",
  md: "p-5 sm:p-6 md:p-7",
  lg: "p-5 sm:p-7 md:p-8",
};

export function SectionCard({
  children,
  id,
  className,
  padding = "md",
  delay = 0,
  direction = "up",
  beam = false,
  interactive = false,
}: SectionCardProps) {
  const inner = (
    <div
      id={id}
      className={cn(
        "relative overflow-hidden rounded-lg border-l-4 border-sky-400 dark:border-sky-500 shadow-lg transition-shadow duration-300 hover:shadow-xl",
        paddingMap[padding],
        className
      )}
    >
      {beam && (
        <BorderBeam
          size={100}
          duration={10}
          colorFrom="#38bdf8"
          colorTo="#0ea5e9"
          borderWidth={1}
        />
      )}
      {children}
    </div>
  );

  return (
    <BlurFade inView delay={delay} direction={direction}>
      {interactive ? (
        <MagicCard className="rounded-lg">{inner}</MagicCard>
      ) : (
        <div className="relative rounded-lg bg-white/95 dark:bg-gray-950/88 supports-[backdrop-filter]:backdrop-blur-sm border border-gray-200/80 dark:border-white/10 shadow-md dark:shadow-lg dark:shadow-black/20">
          {inner}
        </div>
      )}
    </BlurFade>
  );
}
