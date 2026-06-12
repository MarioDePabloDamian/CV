import React from "react";
import { SectionCard } from "./ui/section-card";
import Header from "./Header";
import Summary from "./Summary";
import Experience from "./Experience";
import Projects from "./Projects";
import Education from "./Education";
import TechStack from "./TechStack";
import SoftSkills from "./SoftSkills";
import Certifications from "./Certifications";
import Languages from "./Languages";
import SEO from "./SEO";
import { ContactCtas } from "./ContactCtas";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { translations } from "../translations/translations";
import { profile } from "../data/profile";
import AnimatedShaderBackground from "./ui/animated-shader-background";

const CV: React.FC = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];
  const year = new Date().getFullYear();
  const isDark = theme === "dark";

  return (
    <div className="relative min-h-screen w-full">
      <div
        className={`no-print fixed inset-0 z-0 h-dvh w-full ${
          isDark ? "bg-black" : "bg-gray-50"
        }`}
      >
        <AnimatedShaderBackground variant={isDark ? "dark" : "light"} />
      </div>

      <div className="relative z-10 min-h-screen">
        <SEO />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-600 focus:text-white focus:rounded-md"
        >
          {t.skipToContent}
        </a>

        <Header />

        <main id="main-content" className="page-container py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:col-span-8 space-y-4 sm:space-y-6 min-w-0">
              <SectionCard id="about" padding="lg" beam={false} interactive={false}>
                <Summary />
              </SectionCard>

              <SectionCard id="experience" padding="lg" beam={false} interactive={false}>
                <Experience />
              </SectionCard>

              <SectionCard id="projects" padding="lg" beam={false} interactive={false}>
                <Projects />
              </SectionCard>
            </div>

            <aside className="lg:col-span-4 space-y-4 sm:space-y-6 min-w-0 lg:sticky lg:top-[calc(4.25rem+env(safe-area-inset-top,0px))] lg:self-start">
              <SectionCard id="skills" padding="md" beam={false} interactive={false}>
                <TechStack />
              </SectionCard>
              <SectionCard padding="md" beam={false} interactive={false}>
                <SoftSkills />
              </SectionCard>
              <SectionCard padding="md" beam={false} interactive={false}>
                <Education />
              </SectionCard>
              <SectionCard padding="md" beam={false} interactive={false}>
                <Certifications />
              </SectionCard>
              <SectionCard padding="md" beam={false} interactive={false}>
                <Languages />
              </SectionCard>
            </aside>
          </div>
        </main>

        <footer className="mt-8 sm:mt-12 py-8 sm:py-10 pb-[max(2rem,env(safe-area-inset-bottom))] border-t bg-white/95 dark:bg-black/70 supports-[backdrop-filter]:backdrop-blur-md text-gray-700 dark:text-white border-gray-200 dark:border-white/10">
          <div className="page-container text-center space-y-4 px-1">
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
              {t.hireFooterCta}
            </p>
            <ContactCtas layout="footer" />
            <p className="text-gray-500 dark:text-gray-500 text-sm pt-2">
              © {year} {profile.fullName} — {t.footerRole}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CV;
