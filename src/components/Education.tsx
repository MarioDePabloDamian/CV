import { FiCheck, FiMapPin } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { educationHighlights } from "../data/credentials";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/section-heading";

const cardClass = cn(
  "rounded-xl border border-gray-200/80 bg-white/70 dark:border-gray-700/70 dark:bg-gray-900/40",
  "print:border-gray-300 print:bg-white"
);

export default function Education() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <SectionHeading as="h3">{t.education}</SectionHeading>
      <p className="mb-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        {t.educationSubtitle}
      </p>
      <article className={cn(cardClass, "relative overflow-hidden p-3.5 sm:p-4")}>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-gradient-to-br from-sky-400/15 to-indigo-500/10 blur-2xl"
        />
        <div className="relative flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]",
              "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-sm"
            )}
          >
            {t.educationDegreeBadge}
          </span>
          <time
            dateTime="2025-06"
            className="text-[11px] font-medium tabular-nums text-gray-500 dark:text-gray-400"
          >
            {t.educationDate}
          </time>
        </div>
        <h4 className="relative mt-2.5 text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100">
          {t.educationTitle}
        </h4>
        <p className="relative mt-1 flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
          <span className="font-medium text-gray-800 dark:text-gray-300">{t.educationSchool}</span>
          <span aria-hidden className="text-gray-300 dark:text-gray-600">·</span>
          <span className="inline-flex items-center gap-0.5">
            <FiMapPin className="size-3 shrink-0" aria-hidden />
            {t.educationCity}
          </span>
        </p>
        <ul className="relative mt-3 space-y-1.5 list-none">
          {educationHighlights.map((key) => (
            <li
              key={key}
              className="flex items-start gap-2 text-[11px] leading-snug text-gray-700 dark:text-gray-300"
            >
              <FiCheck
                className="mt-0.5 size-3.5 shrink-0 text-sky-600 dark:text-sky-400"
                aria-hidden
              />
              <span>{t[key]}</span>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
