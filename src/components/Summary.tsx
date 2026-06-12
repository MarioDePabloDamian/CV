import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { parseRichText } from "../lib/parse-rich-text";
import { SectionHeading } from "./ui/section-heading";

const Summary: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <SectionHeading animated={false}>{t.about}</SectionHeading>
      <p className="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
        {parseRichText(t.summary)}
      </p>
    </div>
  );
};

export default Summary;
