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
        "relative overflow-hidden rounded-xl",
        "before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-gradient-to-b before:from-sky-400 before:via-indigo-500 before:to-cyan-400 before:content-[''] print:before:bg-sky-500",
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
        <MagicCard className="rounded-xl">{inner}</MagicCard>
      ) : (
        <div
          className={cn(
            "group relative rounded-xl bg-white dark:bg-gray-900/95",
            "[box-shadow:0_0_0_1px_rgba(0,0,0,.04),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
            "dark:[border:1px_solid_rgba(255,255,255,.08)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
            "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-28px_rgba(14,165,233,0.45)] dark:hover:shadow-[0_24px_60px_-28px_rgba(56,189,248,0.35)]",
            "print:translate-y-0 print:rounded-lg print:border print:border-gray-300 print:shadow-none print:[box-shadow:none]"
          )}
        >
          {inner}
        </div>
      )}
    </BlurFade>
  );
}
