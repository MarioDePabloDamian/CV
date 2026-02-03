import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { HiChevronDown } from "react-icons/hi";

interface Language {
  code: "es" | "en";
  name: string;
}

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
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
        className="flex items-center justify-center gap-2 px-4 h-10 bg-white dark:bg-gray-950 border-2 border-sky-400 dark:border-sky-500 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-sky-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
        aria-label="Seleccionar idioma"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="font-semibold text-sky-600 dark:text-sky-400 text-sm">
          {currentLang?.name}
        </span>
        <HiChevronDown
          className={`transition-transform text-sky-600 dark:text-sky-400 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={18}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-950 border-2 border-sky-400 dark:border-sky-500 rounded-lg shadow-xl z-20 min-w-[130px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 hover:bg-sky-50 dark:hover:bg-gray-900 transition-colors duration-300 first:rounded-t-lg last:rounded-b-lg text-center font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset ${
                  language === lang.code
                    ? "bg-sky-50 dark:bg-gray-900 text-sky-600 dark:text-sky-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                aria-label={`Seleccionar ${lang.name}`}
                aria-pressed={language === lang.code}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;
