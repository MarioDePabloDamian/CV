import React, { forwardRef, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface NavbarChildProps {
  visible?: boolean;
  ready?: boolean;
}

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

const NAV_SPRING = "max-width 0.45s cubic-bezier(0.22,1,0.36,1), width 0.45s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)";

export function Navbar({ children, className }: NavbarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  // "ready" suppresses the transition on first render so the pill doesn't
  // animate from the wrong state when the page loads already scrolled.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Sync with current scroll position immediately (no animation on mount)
    setVisible(window.scrollY > 80);
    // Allow transitions only after the first paint
    requestAnimationFrame(() => setReady(true));

    const update = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
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
              { visible, ready }
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
  ready,
}: NavbarProps & NavbarChildProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: visible ? "620px" : "9999px",
        transform: visible ? "translateY(10px)" : "none",
        transition: ready && !reduceMotion ? NAV_SPRING : "none",
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full items-center justify-between rounded-full px-4 py-2 lg:flex",
        visible
          ? "border border-gray-200/70 bg-white/80 shadow-[0_8px_30px_-12px_rgba(14,165,233,0.35)] backdrop-blur-md dark:border-white/10 dark:bg-gray-950/80"
          : "border border-transparent",
        className
      )}
    >
      {children}
    </div>
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
  return (
    <nav className={cn("flex items-center gap-1 text-sm font-medium", className)}>
      {items.map((item) => (
        <a
          key={item.link}
          href={item.link}
          className="relative px-3.5 py-2 text-gray-600 transition-colors hover:text-sky-700 dark:text-gray-300 dark:hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-full hover:bg-sky-100 dark:hover:bg-sky-950/50"
        >
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
  ready,
}: NavbarProps & NavbarChildProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      style={{
        width: visible ? "calc(100% - 1.5rem)" : "100%",
        transform: visible ? "translateY(8px)" : "none",
        transition: ready && !reduceMotion ? NAV_SPRING : "none",
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full flex-col px-4 py-2.5 lg:hidden",
        visible
          ? "rounded-2xl border border-gray-200/70 bg-white/85 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-gray-950/85"
          : "border-b border-gray-200/80 dark:border-white/10",
        className
      )}
    >
      {children}
    </div>
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
    <div
      className={cn("grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none", className)}
      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="mt-2 flex flex-col gap-1 border-t border-gray-200/80 pt-2 dark:border-white/10">
          {children}
        </div>
      </div>
    </div>
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
