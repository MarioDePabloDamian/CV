import { Routes, Route, Navigate, useSearchParams } from "react-router";
import CV from "./components/CV";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

type Language = "es" | "en";

function CVWithLanguage() {
  const [searchParams] = useSearchParams();
  const langParam = searchParams.get("lang");
  
  // Si el idioma no es válido, redirigir a ?lang=es
  let validLanguage: Language = "es";
  if (langParam === "es" || langParam === "en") {
    validLanguage = langParam;
  } else if (langParam) {
    // Si hay un lang pero no es válido, redirigir a ?lang=es
    return <Navigate to="/?lang=es" replace />;
  }

  return (
    <LanguageProvider initialLanguage={validLanguage}>
      <div className="min-h-screen">
        <CV />
      </div>
    </LanguageProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<CVWithLanguage />} />
        <Route path="*" element={<Navigate to="/?lang=es" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
