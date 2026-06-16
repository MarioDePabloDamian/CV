import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

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

function readStoredLanguage(): Language {
  const saved = localStorage.getItem("language");
  return saved === "es" || saved === "en" ? saved : "es";
}

export const LanguageProvider = ({
  children,
  initialLanguage,
}: LanguageProviderProps) => {
  const [language, setLanguageState] = useState<Language>(
    () => initialLanguage ?? readStoredLanguage()
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState(null, "", url.toString());
  }, []);

  const toggleLanguage = useCallback(
    () => setLanguage(language === "es" ? "en" : "es"),
    [language, setLanguage]
  );

  const value = useMemo(
    () => ({ language, toggleLanguage, setLanguage }),
    [language, toggleLanguage, setLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
