import React from "react";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
      aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
      aria-pressed={theme === "dark"}
    >
      {theme === "light" ? (
        <FiMoon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <FiSun className="w-5 h-5 text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
