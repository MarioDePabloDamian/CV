import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function ScrollProgress({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const pct =
        scrollHeight > clientHeight
          ? scrollTop / (scrollHeight - clientHeight)
          : 0;
      bar.style.transform = `scaleX(${pct})`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        "fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-sky-500 via-indigo-500 to-cyan-400 print:hidden",
        className
      )}
    />
  );
}
