import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { HiChevronDown } from "react-icons/hi";

interface Language {
  code: "es" | "en";
  name: string;
}

interface LanguageSelectorProps {
  compact?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ compact = false }) => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = [
    { code: "es", name: "Español" },
    { code: "en", name: "English" },
  ];

  const currentLang = languages.find((lang) => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center gap-1 bg-white dark:bg-gray-950 border border-sky-300 dark:border-sky-600 rounded-md hover:bg-sky-50 dark:hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 transition-colors ${
          compact ? "touch-target px-2.5 text-xs font-bold" : "gap-2 px-4 h-10 border-2 border-sky-400 dark:border-sky-500 rounded-lg shadow-md hover:shadow-lg"
        }`}
        aria-label={t.selectLanguage}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="font-semibold text-sky-600 dark:text-sky-400 text-sm">
          {compact ? currentLang?.code.toUpperCase() : currentLang?.name}
        </span>
        {!compact && (
          <HiChevronDown
            className={`transition-transform text-sky-600 dark:text-sky-400 ${
              isOpen ? "rotate-180" : ""
            }`}
            size={18}
          />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <ul
            role="listbox"
            aria-label={t.selectLanguage}
            className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-950 border-2 border-sky-400 dark:border-sky-500 rounded-lg shadow-xl z-20 min-w-[130px]"
          >
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  role="option"
                  aria-selected={language === lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 hover:bg-sky-50 dark:hover:bg-gray-900 transition-colors duration-300 first:rounded-t-lg last:rounded-b-lg text-center font-semibold text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-inset ${
                    language === lang.code
                      ? "bg-sky-50 dark:bg-gray-900 text-sky-600 dark:text-sky-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {lang.name}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
