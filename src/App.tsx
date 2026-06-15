import CV from "./components/CV";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

type Language = "es" | "en";

// Read once at module level — window.location doesn't change during runtime
const _langParam = new URLSearchParams(window.location.search).get("lang");
const _urlLanguage: Language | undefined =
  _langParam === "es" || _langParam === "en" ? _langParam : undefined;

function App() {
  return (
    <ThemeProvider>
      {/* When no ?lang= in URL, initialLanguage is undefined so LanguageProvider
          falls back to localStorage — preserving the user's saved preference. */}
      <LanguageProvider initialLanguage={_urlLanguage}>
        <CV />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
