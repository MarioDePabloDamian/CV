import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate, useSearchParams } from "react-router";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider = ({ children, initialLanguage }: LanguageProviderProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [language, setLanguageState] = useState<Language>(() => {
    // Usar el idioma inicial de la URL o el guardado en localStorage o español por defecto
    return initialLanguage || (localStorage.getItem("language") as Language) || "es";
  });

  useEffect(() => {
    // Guardar idioma en localStorage cuando cambia
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("lang", lang);
    navigate(`/?${newSearchParams.toString()}`, { replace: true });
  };

  const toggleLanguage = () => {
    const newLang = language === "es" ? "en" : "es";
    setLanguage(newLang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
