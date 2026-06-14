import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
  /** Decorative layer rendered behind the content. Hidden on print. */
  background?: ReactNode;
  /**
   * Elevation treatment.
   * - "elevated": standalone bento with layered shadow (default).
   * - "flat": subtle border + faint tint, no heavy shadow. Use when nested
   *   inside an already-elevated container (e.g. a SectionCard) to avoid
   *   double framing.
   */
  variant?: "elevated" | "flat";
}

const variantStyles: Record<NonNullable<BentoCardProps["variant"]>, string> = {
  elevated: cn(
    "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.04),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
    "transform-gpu dark:bg-gray-900/95 dark:[border:1px_solid_rgba(255,255,255,.08)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
    "transition-shadow duration-300 hover:shadow-xl",
    "print:rounded-lg print:shadow-none print:[box-shadow:none] print:border print:border-gray-300"
  ),
  flat: cn(
    "border border-gray-200 bg-gray-50/70 dark:border-gray-700/70 dark:bg-gray-900/40",
    "transition-colors duration-300 hover:border-sky-300/80 dark:hover:border-sky-700/70",
    "print:rounded-lg print:bg-white print:border-gray-300"
  ),
};

/**
 * Bento layout primitive (adapted from MagicUI for a hiring CV).
 * Recruiter-friendly: content is always visible (no hover-to-reveal) and the
 * grid collapses to a single readable column on print.
 */
export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 gap-4 sm:gap-5 print:block print:space-y-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  className,
  background,
  variant = "elevated",
  ...props
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {background ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 print:hidden"
        >
          {background}
        </div>
      ) : null}
      <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-colors duration-300 group-hover:bg-black/[.02] group-hover:dark:bg-white/[.03] print:hidden" />
    </div>
  );
}

export default BentoGrid;
