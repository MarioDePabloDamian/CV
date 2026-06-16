import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";

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
        aria-label={t.selectLanguage}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`touch-target inline-flex items-center justify-center rounded-md font-bold text-xs text-gray-600 transition-colors hover:bg-sky-50 hover:text-sky-700 dark:text-gray-300 dark:hover:bg-sky-950/40 dark:hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
          compact ? "px-2" : "gap-1.5 px-3 text-sm font-semibold"
        }`}
      >
        {currentLang?.code.toUpperCase()}
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
            className="absolute right-0 top-full z-20 mt-2 min-w-[130px] overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-lg dark:border-white/10 dark:bg-gray-950"
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
                  className={`w-full px-4 py-2.5 text-center text-sm font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500 ${
                    language === lang.code
                      ? "bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400"
                      : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5"
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
