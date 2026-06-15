import { type ReactNode } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/section-heading";

const cardBase = cn(
  "group relative overflow-hidden rounded-xl border border-gray-200/80 bg-white/70",
  "dark:border-gray-700/70 dark:bg-gray-900/40",
  "transition-all duration-200 hover:-translate-y-0.5",
  "hover:shadow-[0_8px_24px_-12px_rgba(14,165,233,0.3)]",
  "dark:hover:shadow-[0_8px_24px_-12px_rgba(56,189,248,0.2)]",
  "print:border-gray-300 print:bg-white print:translate-y-0 print:shadow-none"
);

const badgeClass = "rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 shrink-0 self-center";

function LanguageCard({
  code,
  name,
  accent,
  flagGradient,
  badge,
  badgeVariant,
  children,
}: {
  code: string;
  name: string;
  accent: string;
  flagGradient: string;
  badge: string;
  badgeVariant: "native" | "b2";
  children?: ReactNode;
}) {
  return (
    <article className={cn(cardBase, "px-3.5 py-3")}>
      <div
        aria-hidden
        className={cn("absolute inset-y-0 left-0 w-1 bg-gradient-to-b", accent)}
      />
      <div className="flex items-center justify-between gap-3 pl-1">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white shadow-sm",
              flagGradient
            )}
            aria-hidden
          >
            {code}
          </span>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{name}</p>
        </div>
        <span
          className={cn(
            badgeClass,
            badgeVariant === "native" &&
              "bg-emerald-50 text-emerald-700 ring-emerald-200/80 dark:bg-emerald-950/50 dark:text-emerald-300 dark:ring-emerald-800/60",
            badgeVariant === "b2" &&
              "bg-sky-50 text-sky-700 ring-sky-200/80 dark:bg-sky-950/60 dark:text-sky-300 dark:ring-sky-800/60"
          )}
        >
          {badge}
        </span>
      </div>
      {children}
    </article>
  );
}

export default function Languages() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <SectionHeading as="h3">{t.languages}</SectionHeading>
      <div className="space-y-2">
        <LanguageCard
          code="ES"
          name={t.spanish}
          accent="from-red-500 via-amber-400 to-red-500"
          flagGradient="bg-gradient-to-br from-red-500 to-amber-500"
          badge={t.native}
          badgeVariant="native"
        />

        <LanguageCard
          code="EN"
          name={t.english}
          accent="from-sky-500 via-indigo-500 to-violet-500"
          flagGradient="bg-gradient-to-br from-sky-500 to-indigo-600"
          badge={t.languageLevelB2}
          badgeVariant="b2"
        >
          <div className="mt-2.5 space-y-1 border-t border-gray-200/70 pt-2.5 pl-1 dark:border-gray-700/70">
            <p className="flex items-center gap-1.5 text-[11px] leading-snug text-gray-600 dark:text-gray-400">
              <FiMessageCircle
                className="size-3.5 shrink-0 text-sky-500 dark:text-sky-400"
                aria-hidden
              />
              {t.languageCurrentLevel}
            </p>
            <time
              dateTime="2022-06-11"
              className="block pl-5 text-[10px] font-medium text-gray-400 dark:text-gray-500"
            >
              Cambridge · {t.languageExamDate}
            </time>
          </div>
        </LanguageCard>
      </div>
    </div>
  );
}
