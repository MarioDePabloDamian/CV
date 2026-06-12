import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/section-heading";
import { IconCloud } from "./ui/icon-cloud";
import { techStackCategories, techStackCloudItems } from "../data/tech-stack-items";
import { useIconCloudSize } from "../hooks/use-icon-cloud-size";

const TechStack: React.FC = () => {
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

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {techStackCategories.map((category) => (
          <div
            key={category.id}
            className={cn(
              "rounded-lg border border-sky-100 dark:border-sky-800 bg-sky-50/40 dark:bg-sky-950/20 px-3 py-2.5",
              "sm:col-span-2"
            )}
          >
            <dt className="text-[10px] font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              {categoryTitles[category.id]}
            </dt>
            <dd className="flex flex-wrap gap-1.5 mt-2">
              {category.items.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-sky-100 dark:border-sky-800 hover:text-sky-700 dark:hover:text-sky-300 hover:border-sky-300 dark:hover:border-sky-600 active:bg-sky-50 dark:active:bg-sky-950/40 transition-colors"
                >
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
