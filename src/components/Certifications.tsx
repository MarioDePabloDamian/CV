import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { certifications } from "../data/credentials";
import { cn } from "@/lib/utils";
import {
  portfolioBlob,
  portfolioDivider,
  portfolioMetaPill,
  portfolioSubtitle,
  portfolioSurface,
} from "@/lib/portfolio-sidebar";
import { SectionHeading } from "./ui/section-heading";

export default function Certifications() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <SectionHeading as="h3">{t.certifications}</SectionHeading>
      <p className={portfolioSubtitle}>{t.certificationsSubtitle}</p>
      <article className={cn(portfolioSurface, "p-3.5 sm:p-4")}>
        <div aria-hidden className={portfolioBlob} />
        <ul className="relative list-none">
          {certifications.map((cert, index) => (
            <li
              key={cert.id}
              className={cn(index > 0 && cn("mt-3 pt-3", portfolioDivider))}
            >
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {t[cert.shortKey]}
                </span>
                <span className={portfolioMetaPill}>{t[cert.categoryKey]}</span>
              </div>
              <p className="mt-1 text-[11px] leading-snug text-gray-600 dark:text-gray-400">
                {t[cert.valueKey]}
              </p>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
