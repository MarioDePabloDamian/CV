import { useRef } from "react";
import { Moon, SunDim } from "lucide-react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  theme: "light" | "dark";
  onThemeChange: (theme: "light" | "dark") => void;
  duration?: number;
}

export function AnimatedThemeToggler({
  className,
  theme,
  onThemeChange,
  duration = 700,
  ...props
}: AnimatedThemeTogglerProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isDark = theme === "dark";

  const changeTheme = async () => {
    const next = isDark ? "light" : "dark";

    const apply = () => {
      // Toggle the class synchronously so the view-transition snapshot
      // captures the new theme; keep the context in sync afterwards.
      document.documentElement.classList.toggle("dark", next === "dark");
      onThemeChange(next);
    };

    if (
      !buttonRef.current ||
      typeof document.startViewTransition !== "function" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      apply();
      return;
    }

    await document.startViewTransition(() => {
      flushSync(apply);
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={changeTheme}
      className={cn(className)}
      {...props}
    >
      {isDark ? (
        <SunDim className="size-5 text-yellow-500" />
      ) : (
        <Moon className="size-5 text-gray-700" />
      )}
    </button>
  );
}

export default AnimatedThemeToggler;
