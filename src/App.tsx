import { Routes, Route, Navigate, useParams } from "react-router";
import CV from "./components/CV";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

type Language = "es" | "en";

function CVWithLanguage() {
  const { lang } = useParams<{ lang: string }>();
  
  // Si el idioma no es válido, redirigir a /es
  if (lang !== "es" && lang !== "en") {
    return <Navigate to="/es" replace />;
  }
  
  const validLanguage: Language = lang === "en" ? "en" : "es";

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
        <Route path="/" element={<Navigate to="/es" replace />} />
        <Route path="/:lang" element={<CVWithLanguage />} />
        <Route path="*" element={<Navigate to="/es" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
