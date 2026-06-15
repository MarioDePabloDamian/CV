import React from "react";
import { SectionCard } from "./ui/section-card";
import Header from "./Header";
import Hero from "./Hero";
import { ScrollProgress } from "./ui/scroll-progress";
import SEO from "./SEO";
import { ContactCtas } from "./ContactCtas";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { profile } from "../data/profile";
import HowIBuild from "./HowIBuild";
import Experience from "./Experience";
import Projects from "./Projects";
import Education from "./Education";
import TechStack from "./TechStack";
import SoftSkills from "./SoftSkills";
import Certifications from "./Certifications";
import Languages from "./Languages";

const CV: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const year = new Date().getFullYear();

  return (
    <div className="relative min-h-screen w-full bg-gray-50 dark:bg-gray-950">
      <div
        aria-hidden
        className="no-print pointer-events-none fixed inset-0 z-0 h-dvh w-full bg-gray-50 dark:bg-gray-950"
      >
        <div className="absolute inset-0 bg-[radial-gradient(60rem_60rem_at_12%_-12%,rgba(56,189,248,0.16),transparent_60%),radial-gradient(55rem_55rem_at_100%_8%,rgba(99,102,241,0.13),transparent_55%),radial-gradient(45rem_45rem_at_50%_120%,rgba(6,182,212,0.10),transparent_60%)] dark:bg-[radial-gradient(60rem_60rem_at_12%_-12%,rgba(56,189,248,0.14),transparent_60%),radial-gradient(55rem_55rem_at_100%_8%,rgba(99,102,241,0.14),transparent_55%),radial-gradient(45rem_45rem_at_50%_120%,rgba(6,182,212,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-grid-soft opacity-[0.5] [mask-image:radial-gradient(80%_60%_at_50%_0%,black,transparent)] dark:opacity-30" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-950" />
      </div>

      <ScrollProgress />

      <div className="relative z-10 min-h-screen">
        <SEO />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-sky-600 focus:text-white focus:rounded-md"
        >
          {t.skipToContent}
        </a>

        <Header />

        <Hero />

        <main className="page-container py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:col-span-8 space-y-4 sm:space-y-6 min-w-0">
              <div className="lg:hidden">
                <SectionCard padding="md" beam={false} interactive={false}>
                  <TechStack />
                </SectionCard>
              </div>

              <SectionCard id="experience" padding="lg" beam={false} interactive={false}>
                <Experience />
              </SectionCard>

              <SectionCard id="projects" padding="lg" beam={false} interactive={false}>
                <Projects />
              </SectionCard>

              <div className="no-print hidden lg:block">
                <SectionCard padding="lg" beam={false} interactive={false}>
                  <HowIBuild />
                </SectionCard>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-4 sm:space-y-6 min-w-0 lg:sticky lg:top-[calc(7.5rem+env(safe-area-inset-top,0px))] lg:self-start">
              <div className="hidden lg:block">
                <SectionCard id="skills" padding="md" beam={false} interactive={false}>
                  <TechStack />
                </SectionCard>
              </div>
              <SectionCard padding="md" beam={false} interactive={false}>
                <Education />
              </SectionCard>
              <SectionCard padding="md" beam={false} interactive={false}>
                <Certifications />
              </SectionCard>
              <SectionCard padding="md" beam={false} interactive={false}>
                <Languages />
              </SectionCard>
              <SectionCard padding="md" beam={false} interactive={false}>
                <SoftSkills />
              </SectionCard>
            </aside>
          </div>
        </main>

        <footer
          id="contact"
          className="relative mt-8 sm:mt-12 overflow-hidden border-t border-gray-200 bg-white py-12 sm:py-16 pb-[max(2rem,env(safe-area-inset-bottom))] text-gray-700 dark:border-white/10 dark:bg-gray-950 dark:text-gray-300"
        >
          <div
            aria-hidden
            className="no-print pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_20rem_at_50%_-20%,rgba(56,189,248,0.18),transparent_70%)]"
          />
          <div className="page-container relative text-center">
            <p className="mx-auto max-w-[34ch] bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-xl font-extrabold leading-tight text-transparent sm:text-2xl dark:from-sky-400 dark:to-indigo-400 print:text-gray-900">
              {t.hireFooterCta}
            </p>
            <div className="mt-6 flex justify-center">
              <ContactCtas layout="footer" />
            </div>
            <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
              © {year} {profile.fullName} — {t.footerRole}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CV;
