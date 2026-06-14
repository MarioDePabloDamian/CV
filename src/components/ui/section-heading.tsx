import { cn } from "@/lib/utils";
import BlurText from "./BlurText";

interface SectionHeadingProps {
  children: React.ReactNode;
  as?: "h2" | "h3";
  className?: string;
  centered?: boolean;
  animated?: boolean;
}

export function SectionHeading({
  children,
  as: Tag = "h2",
  className,
  centered = false,
  animated = false,
}: SectionHeadingProps) {
  const headingClass = cn(
    "relative font-bold text-gray-900 dark:text-gray-100",
    "after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-12 after:rounded-full after:bg-gradient-to-r after:from-sky-500 after:to-indigo-500 after:content-['']",
    "before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-full before:rounded-full before:bg-gray-200 before:content-[''] dark:before:bg-gray-800 print:before:bg-gray-300 print:after:bg-gray-500",
    Tag === "h2" && "text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 pb-2.5",
    Tag === "h3" && "text-lg sm:text-xl mb-3 sm:mb-4 pb-2.5",
    centered && "text-center",
    className
  );

  const text = typeof children === "string" ? children : String(children);

  if (animated && text) {
    return (
      <BlurText
        text={text}
        as={Tag}
        animateBy="words"
        delay={80}
        stepDuration={0.25}
        className={headingClass}
      />
    );
  }

  return <Tag className={headingClass}>{children}</Tag>;
}
