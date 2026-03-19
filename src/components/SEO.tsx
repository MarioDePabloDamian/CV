import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

const SEO: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const baseUrl = "https://mariodepablo.es";
    const currentUrl = `${baseUrl}/?lang=${language}`;
    const title =
      language === "es"
        ? "Mario de Pablo Damián - Fullstack Developer & DevOps Engineer"
        : "Mario de Pablo Damián - Fullstack Developer & DevOps Engineer";
    const description =
      language === "es"
        ? "CV de Mario de Pablo Damián - Desarrollador Fullstack y DevOps Engineer con experiencia en React, FastAPI, Docker, y sistemas de observabilidad industrial."
        : "CV of Mario de Pablo Damián - Fullstack Developer and DevOps Engineer with experience in React, FastAPI, Docker, and industrial observability systems.";

    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("author", "Mario de Pablo Damián");
    updateMetaTag("keywords", "Fullstack Developer, DevOps Engineer, React, FastAPI, Docker, TypeScript, CV, Portfolio");

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:site_name", "Mario de Pablo Damián", true);
    updateMetaTag("og:locale", language === "es" ? "es_ES" : "en_US", true);
    updateMetaTag("og:image", `${baseUrl}/FotoCV.jpg`, true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", `${baseUrl}/FotoCV.jpg`);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);

    // Language alternates with query parameters
    const updateAlternate = (lang: string) => {
      let alternate = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
      if (!alternate) {
        alternate = document.createElement("link");
        alternate.setAttribute("rel", "alternate");
        alternate.setAttribute("hreflang", lang);
        document.head.appendChild(alternate);
      }
      alternate.setAttribute("href", `${baseUrl}/?lang=${lang}`);
    };

    updateAlternate("es");
    updateAlternate("en");
    updateAlternate("x-default");

    // Update html lang attribute
    document.documentElement.lang = language;

    // JSON-LD structured data
    let jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.setAttribute("type", "application/ld+json");
      document.head.appendChild(jsonLd);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Mario de Pablo Damián",
      jobTitle: "Fullstack Developer & DevOps Engineer",
      url: baseUrl,
      sameAs: [
        "https://github.com/Mariosos1",
        "https://www.linkedin.com/in/mario-de-pablo-damian/",
      ],
      email: "mariodepablo2005@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rivas-Vaciamadrid",
        addressRegion: "Madrid",
        postalCode: "28521",
        addressCountry: "ES",
      },
      knowsLanguage: ["Spanish", "English"],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Davante MEDAC Albalá",
      },
    };

    jsonLd.textContent = JSON.stringify(structuredData);
  }, [language]);

  return null;
};

export default SEO;
