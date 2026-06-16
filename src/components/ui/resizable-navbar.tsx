import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
  type Transition,
} from "motion/react";
import React, { forwardRef, useRef, useState, useEffect, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";

interface NavbarChildProps {
  visible?: boolean;
  fits?: boolean;
}

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

const spring: Transition = { type: "spring", stiffness: 220, damping: 40 };

export function Navbar({ children, className }: NavbarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const [fits, setFits] = useState(true);
  const minWidthRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 80);
  });

  // Synchronous measurement before the browser paints — no flash possible.
  // NavBody starts visible (fits=true), so its offsetWidth reflects real content width.
  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) return;
    const navBody = container.querySelector<HTMLElement>("[data-nav-body]");
    if (navBody) {
      // Temporarily remove width constraints to read the element's natural content width.
      navBody.style.setProperty("width", "max-content", "important");
      navBody.style.setProperty("max-width", "none", "important");
      const natural = navBody.offsetWidth;
      navBody.style.removeProperty("width");
      navBody.style.removeProperty("max-width");
      if (natural > 0) minWidthRef.current = natural + 8;
    }
    setFits(container.offsetWidth >= minWidthRef.current);
  }, []);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const onResize = () => setFits(container.offsetWidth >= minWidthRef.current);
    const ro = new ResizeObserver(onResize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "sticky inset-x-0 top-0 z-50 w-full pt-[env(safe-area-inset-top,0px)] print:hidden",
        className
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<NavbarChildProps>,
              { visible, fits }
            )
          : child
      )}
    </div>
  );
}

export function NavBody({
  children,
  className,
  visible,
  fits,
}: NavbarProps & NavbarChildProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-nav-body
      animate={{
        width: visible ? "min(100%, 60rem)" : "100%",
        y: visible ? 10 : 0,
      }}
      transition={reduce ? { duration: 0 } : spring}
      style={{ display: fits ? undefined : "none" }}
      className={cn(
        "relative z-[60] mx-auto flex w-full items-center justify-between rounded-full px-4 py-2",
        visible
          ? "border border-gray-200/70 bg-white/80 shadow-[0_8px_30px_-12px_rgba(14,165,233,0.35)] backdrop-blur-md dark:border-white/10 dark:bg-gray-950/80"
          : "border border-transparent",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface NavItem {
  name: string;
  link: string;
}

export function NavItems({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <nav
      onMouseLeave={() => setHovered(null)}
      className={cn("flex items-center gap-1 text-sm font-medium", className)}
    >
      {items.map((item, idx) => (
        <a
          key={item.link}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          className="relative px-3.5 py-2 text-gray-600 transition-colors hover:text-sky-700 dark:text-gray-300 dark:hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-full"
        >
          {hovered === idx && (
            <motion.span
              layoutId="nav-hover-pill"
              className="absolute inset-0 -z-10 rounded-full bg-sky-100 dark:bg-sky-950/50"
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            />
          )}
          {item.name}
        </a>
      ))}
    </nav>
  );
}

export function MobileNav({
  children,
  className,
  visible,
  fits,
}: NavbarProps & NavbarChildProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      animate={{
        width: visible ? "calc(100% - 1.5rem)" : "100%",
        y: visible ? 8 : 0,
      }}
      transition={reduce ? { duration: 0 } : spring}
      style={{ display: fits ? "none" : undefined }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col px-4 py-2.5",
        visible
          ? "rounded-2xl border border-gray-200/70 bg-white/85 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-gray-950/85"
          : "border-b border-gray-200/80 dark:border-white/10",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function MobileNavHeader({ children, className }: NavbarProps) {
  return (
    <div className={cn("flex w-full items-center justify-between gap-2", className)}>
      {children}
    </div>
  );
}

export function MobileNavMenu({
  children,
  isOpen,
  className,
}: NavbarProps & { isOpen: boolean }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn("w-full overflow-hidden", className)}
        >
          <div className="mt-2 flex flex-col gap-1 border-t border-gray-200/80 pt-2 dark:border-white/10">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const MobileNavToggle = forwardRef<
  HTMLButtonElement,
  { isOpen: boolean; onClick: () => void; label: string }
>(function MobileNavToggle({ isOpen, onClick, label }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={isOpen}
      className="touch-target inline-flex items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
    >
      <span className="relative block h-4 w-5">
        <span
          className={cn(
            "absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300",
            isOpen && "top-1.5 rotate-45"
          )}
        />
        <span
          className={cn(
            "absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current transition-all duration-300",
            isOpen && "opacity-0"
          )}
        />
        <span
          className={cn(
            "absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current transition-all duration-300",
            isOpen && "top-1.5 -rotate-45"
          )}
        />
      </span>
    </button>
  );
});
