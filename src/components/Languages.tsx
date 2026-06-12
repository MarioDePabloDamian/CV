import React from "react";
import { HiLanguage } from "react-icons/hi2";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { SectionHeading } from "./ui/section-heading";

const Languages: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <SectionHeading as="h3" animated={false}>{t.languages}</SectionHeading>
      <div className="text-gray-800 dark:text-gray-300 text-sm space-y-3">
        <div className="flex items-center gap-2">
          <HiLanguage
            className="text-sky-600 dark:text-sky-400 shrink-0"
            size={18}
          />
          <div>
            {t.spanish}: {t.native}
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <HiLanguage
              className="text-sky-600 dark:text-sky-400 shrink-0"
              size={18}
            />
            <span>{t.english}:</span>
            <span className="font-medium">{t.level}</span>
          </div>

          {/* Progress bar - 6 segments */}
          <div className="flex gap-0.5 mb-2">
            {/* First 4 completely filled */}
            {[1, 2, 3, 4].map((level) => (
              <div key={level} className="h-3 flex-1 bg-sky-400 rounded-sm" />
            ))}

            {/* 5th partially filled (50% - light blue, 50% - gray) */}
            <div className="h-3 flex-1 rounded-sm relative overflow-hidden">
              <div
                className="absolute inset-0 bg-sky-400"
                style={{ width: "50%" }}
              ></div>
              <div
                className="absolute inset-0 bg-gray-300 dark:bg-gray-600 right-0"
                style={{ width: "50%", left: "50%" }}
              ></div>
            </div>

            {/* 6th completely empty (gray) */}
            <div className="h-3 flex-1 bg-gray-300 dark:bg-gray-600 rounded-sm" />
          </div>

          <div className="text-xs">{t.levelDescription}</div>
        </div>
      </div>
    </div>
  );
};

export default Languages;
