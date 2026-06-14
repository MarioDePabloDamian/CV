import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/section-heading";
import { IconCloud } from "./ui/icon-cloud";
import { techStackCategories, techStackCloudItems } from "../data/tech-stack-items";
import { useIconCloudSize } from "../hooks/use-icon-cloud-size";

interface TechStackProps {
  showCloud?: boolean;
}

const TechStack: React.FC<TechStackProps> = ({ showCloud = true }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const cloudSize = useIconCloudSize();

  const categoryTitles: Record<(typeof techStackCategories)[number]["id"], string> = {
    development: t.techCategoryDevelopment,
    infrastructure: t.techCategoryInfrastructure,
    observability: t.techCategoryObservability,
  };

  return (
    <div>
      <SectionHeading as="h3" animated={false}>
        {t.skillsTechnical}
      </SectionHeading>

      {showCloud && (
        <div className="no-print flex flex-col items-center mb-4 sm:mb-5 w-full">
          <IconCloud
            items={techStackCloudItems.map((item) => ({
              src: item.icon,
              label: item.name,
            }))}
            size={cloudSize}
            className="mx-auto w-full max-w-[min(100%,280px)] h-auto aspect-square"
          />
        </div>
      )}

      <dl className="grid grid-cols-1 gap-3">
        {techStackCategories.map((category) => (
          <div
            key={category.id}
            className={cn(
              "rounded-xl border border-gray-200/80 bg-white/70 px-3.5 py-3 dark:border-gray-700/70 dark:bg-gray-900/40",
              "print:border-gray-300 print:bg-white"
            )}
          >
            <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
              {categoryTitles[category.id]}
            </dt>
            <dd className="mt-2.5 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  className={cn(
                    "group inline-flex items-center gap-1.5 rounded-full border border-gray-200/90 bg-white px-2.5 py-1 text-[11px] font-medium text-gray-700 shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
                    "transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 hover:shadow-[0_4px_12px_-4px_rgba(14,165,233,0.35)]",
                    "dark:border-gray-700 dark:bg-gray-950/80 dark:text-gray-200 dark:hover:border-sky-600 dark:hover:text-sky-300",
                    "print:translate-y-0 print:border-gray-300 print:shadow-none"
                  )}
                >
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-gray-100 ring-1 ring-gray-200/80 group-hover:ring-sky-200 dark:bg-gray-800 dark:ring-gray-700 dark:group-hover:ring-sky-800/60">
                    <img
                      src={item.icon}
                      alt=""
                      className="size-2.5 object-contain dark:brightness-110"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  {item.name}
                </a>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default TechStack;
