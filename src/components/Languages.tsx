import { MessageCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { cn } from "@/lib/utils";
import {
  portfolioBlob,
  portfolioBrandPill,
  portfolioDivider,
  portfolioMetaPill,
  portfolioSurface,
} from "@/lib/portfolio-sidebar";
import { SectionHeading } from "./ui/section-heading";

export default function Languages() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <SectionHeading as="h3">{t.languages}</SectionHeading>
      <article className={cn(portfolioSurface, "p-3.5 sm:p-4")}>
        <div aria-hidden className={portfolioBlob} />

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br",
                "from-sky-500 to-indigo-600 text-[10px] font-bold text-white shadow-sm shadow-sky-500/20"
              )}
              aria-hidden
            >
              ES
            </span>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t.spanish}</p>
          </div>
          <span className={portfolioBrandPill}>{t.native}</span>
        </div>

        <div className={cn("relative mt-3 pt-3", portfolioDivider)}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-start gap-2.5">
              <span
                className={cn(
                  "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br",
                  "from-sky-500 to-indigo-600 text-[10px] font-bold text-white shadow-sm shadow-sky-500/20"
                )}
                aria-hidden
              >
                EN
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {t.english}
                </p>
                <time
                  dateTime="2022-06-11"
                  className="mt-0.5 block text-[10px] font-medium text-gray-500 dark:text-gray-400"
                >
                  Cambridge · {t.languageExamDate}
                </time>
              </div>
            </div>
            <span className={portfolioMetaPill}>{t.languageLevelB2}</span>
          </div>
          <p className="mt-2.5 flex items-center gap-1.5 text-[11px] leading-snug text-gray-600 dark:text-gray-400">
            <MessageCircle
              className="size-3.5 shrink-0 text-sky-500 dark:text-sky-400"
              aria-hidden
            />
            {t.languageCurrentLevel}
          </p>
        </div>
      </article>
    </div>
  );
}
