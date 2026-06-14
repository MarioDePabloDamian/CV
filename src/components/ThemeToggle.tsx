import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <AnimatedThemeToggler
      theme={theme}
      onThemeChange={setTheme}
      duration={700}
      className="touch-target flex items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      aria-label={theme === "light" ? t.themeToDark : t.themeToLight}
      aria-pressed={theme === "dark"}
    />
  );
};

export default ThemeToggle;
