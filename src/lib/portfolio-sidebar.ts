import { cn } from "@/lib/utils";

/** Estilos compartidos para bloques de la sidebar del portfolio */
export const portfolioSubtitle =
  "mb-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400";

export const portfolioSurface = cn(
  "relative overflow-hidden rounded-xl border border-gray-200/80 bg-white/70",
  "dark:border-gray-700/70 dark:bg-gray-900/40",
  "print:border-gray-300 print:bg-white"
);

export const portfolioBlob = cn(
  "pointer-events-none absolute -right-6 -top-6 size-24 rounded-full",
  "bg-gradient-to-br from-sky-400/15 to-indigo-500/10 blur-2xl"
);

export const portfolioBrandPill = cn(
  "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]",
  "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-sm"
);

export const portfolioMetaPill = cn(
  "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold",
  "bg-sky-50 text-sky-700 ring-1 ring-sky-200/80",
  "dark:bg-sky-950/50 dark:text-sky-300 dark:ring-sky-800/60"
);

export const portfolioDivider = "border-t border-gray-200/70 dark:border-gray-700/70";

export const portfolioChip = cn(
  "inline-flex items-center gap-1.5 rounded-full border border-gray-200/90 bg-white px-2.5 py-1.5",
  "text-[11px] font-medium text-gray-700 shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
  "transition-colors duration-200 hover:border-sky-300 hover:text-sky-700",
  "dark:border-gray-700 dark:bg-gray-950/80 dark:text-gray-200",
  "dark:hover:border-sky-600 dark:hover:text-sky-300",
  "print:border-gray-300 print:shadow-none"
);

export const portfolioChipIcon = cn(
  "flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br",
  "from-sky-500 to-indigo-600 text-white shadow-sm shadow-sky-500/20"
);
