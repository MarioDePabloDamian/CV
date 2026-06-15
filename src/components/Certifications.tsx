import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { certifications } from "../data/credentials";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/section-heading";

const cardClass = cn(
  "rounded-xl border border-gray-200/80 bg-white/70 dark:border-gray-700/70 dark:bg-gray-900/40",
  "print:border-gray-300 print:bg-white"
);

export default function Certifications() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <SectionHeading as="h3">{t.certifications}</SectionHeading>
      <p className="mb-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        {t.certificationsSubtitle}
      </p>
      <ul className="space-y-2 list-none">
        {certifications.map((cert) => (
          <li
            key={cert.id}
            className={cn(
              cardClass,
              "group relative overflow-hidden pl-3.5 pr-3 py-2.5",
              "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(14,165,233,0.35)]",
              "dark:hover:shadow-[0_8px_24px_-12px_rgba(56,189,248,0.25)]"
            )}
          >
            <div
              aria-hidden
              className={cn(
                "absolute inset-y-0 left-0 w-1 bg-gradient-to-b",
                cert.accent
              )}
            />
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {t[cert.shortKey]}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em]",
                  "bg-sky-50 text-sky-700 ring-1 ring-sky-200/80",
                  "dark:bg-sky-950/60 dark:text-sky-300 dark:ring-sky-800/60"
                )}
              >
                {t[cert.categoryKey]}
              </span>
            </div>
            <p className="mt-1 text-[11px] leading-snug text-gray-600 dark:text-gray-400">
              {t[cert.valueKey]}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
