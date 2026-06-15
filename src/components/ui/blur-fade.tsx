import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  blur?: string;
}

export function BlurFade({
  children,
  className,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  blur = "0px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!inView);

  useEffect(() => {
    if (!inView) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  const isX = direction === "left" || direction === "right";
  const sign = direction === "right" || direction === "down" ? -1 : 1;
  const translate = isX
    ? `translateX(${sign * offset}px)`
    : `translateY(${sign * offset}px)`;

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : translate,
        filter: visible && blur !== "0px" ? "none" : blur !== "0px" ? `blur(${blur})` : undefined,
        transition: `opacity ${duration}s ease ${0.04 + delay}s, transform ${duration}s ease ${0.04 + delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
