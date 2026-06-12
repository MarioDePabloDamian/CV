import { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { profile } from "../data/profile";

const KNOWS_ABOUT = [
  "React",
  "Python",
  "FastAPI",
  "Docker",
  "Apigee",
  "n8n",
  "DevOps",
  "PostgreSQL",
  "Elasticsearch",
  "Zabbix",
  "CI/CD",
];

const SEO: React.FC = () => {
  const { language } = useLanguage();

  useEffect(() => {
    const currentUrl = `${profile.siteUrl}/?lang=${language}`;
    const title =
      language === "es"
        ? `${profile.fullName} | DevOps & Fullstack Developer — CV`
        : `${profile.fullName} | DevOps & Fullstack Developer — Resume`;
    const description =
      language === "es"
        ? `CV de ${profile.fullName}: DevOps & Fullstack en ${profile.employer.name}. React, FastAPI, Docker, n8n. Madrid.`
        : `Resume of ${profile.fullName}: DevOps & Fullstack at ${profile.employer.name}. React, FastAPI, Docker, n8n. Madrid.`;

    document.title = title;

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

    updateMetaTag("description", description);
    updateMetaTag("author", profile.fullName);
    updateMetaTag(
      "keywords",
      "DevOps Engineer, Fullstack Developer, React, FastAPI, Docker, n8n, Kubernetes, Madrid, CV"
    );

    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:url", currentUrl, true);
    updateMetaTag("og:type", "profile", true);
    updateMetaTag("og:site_name", profile.fullName, true);
    updateMetaTag("og:locale", language === "es" ? "es_ES" : "en_US", true);
    updateMetaTag("og:image", `${profile.siteUrl}/FotoCV.jpg`, true);

    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", `${profile.siteUrl}/FotoCV.jpg`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", currentUrl);

    const updateAlternate = (lang: string) => {
      let alternate = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
      if (!alternate) {
        alternate = document.createElement("link");
        alternate.setAttribute("rel", "alternate");
        alternate.setAttribute("hreflang", lang);
        document.head.appendChild(alternate);
      }
      alternate.setAttribute("href", `${profile.siteUrl}/?lang=${lang}`);
    };

    updateAlternate("es");
    updateAlternate("en");
    updateAlternate("x-default");

    document.documentElement.lang = language;

    let jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.setAttribute("type", "application/ld+json");
      document.head.appendChild(jsonLd);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.fullName,
      jobTitle: "DevOps Engineer & Fullstack Developer",
      url: profile.siteUrl,
      email: `mailto:${profile.email}`,
      telephone: profile.phone.tel,
      sameAs: [profile.links.github, profile.links.linkedin],
      knowsAbout: KNOWS_ABOUT,
      worksFor: {
        "@type": "Organization",
        name: profile.employer.name,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: profile.address.locality,
        addressRegion: profile.address.region,
        postalCode: profile.address.postalCode,
        addressCountry: profile.address.country,
      },
      knowsLanguage: ["es", "en"],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Davante MEDAC Albalá",
      },
      hasCredential: [
        { "@type": "EducationalOccupationalCredential", name: "Cambridge English First" },
        { "@type": "EducationalOccupationalCredential", name: "Elastic Observability Engineer" },
        { "@type": "EducationalOccupationalCredential", name: "React Certification" },
        { "@type": "EducationalOccupationalCredential", name: "FastAPI Certification" },
        { "@type": "EducationalOccupationalCredential", name: "Odoo Certification" },
      ],
    };

    jsonLd.textContent = JSON.stringify(structuredData);
  }, [language]);

  return null;
};

export default SEO;
