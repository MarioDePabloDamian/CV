import React from "react";
import { ArrowRight, Briefcase, Github, Linkedin, Mail, MapPin, Sparkles, Wifi } from "lucide-react";
import profilePhoto from "../assets/FotoCV.jpg";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { profile, mailto } from "../data/profile";
import { parseRichText } from "../lib/parse-rich-text";
import { cn } from "@/lib/utils";
import { BlurFade } from "./ui/blur-fade";
import { LayoutTextFlip } from "./ui/layout-text-flip";

function HeroPortrait({
  title,
  className,
  size = "lg",
}: {
  title: string;
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full",
        size === "lg" ? "max-w-[300px]" : "max-w-[220px] sm:max-w-[240px]",
        className
      )}
    >
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-sky-400/40 via-indigo-400/30 to-cyan-400/40 opacity-70 blur-2xl"
      />
      <div className="relative rounded-[1.75rem] border border-white/40 bg-gradient-to-br from-sky-400 to-indigo-600 p-[2px] shadow-2xl shadow-indigo-500/20 dark:border-white/10">
        <div className="overflow-hidden rounded-[1.65rem] bg-white dark:bg-gray-950">
          <img
            src={profilePhoto}
            alt={title}
            className="aspect-square w-full object-cover"
            width="300"
            height="300"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      <div className="absolute -bottom-4 -left-4 z-10 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/90 px-3 py-2 text-xs font-semibold text-gray-800 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/90 dark:text-gray-100">
        <Sparkles size={14} className="text-sky-500" aria-hidden />
        {profile.employer.name}
      </div>
    </div>
  );
}

const Hero: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [locationCity, locationModality] = t.heroLocation
    .split("·")
    .map((part) => part.trim());

  return (
    <section
      id="main-content"
      aria-labelledby="main-heading"
      className="no-print relative overflow-hidden scroll-mt-20 lg:scroll-mt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-soft [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]"
      />
      <div
        aria-hidden
        className="aurora-blob pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-sky-400/30 dark:bg-sky-500/20"
      />
      <div
        aria-hidden
        className="aurora-blob pointer-events-none absolute -right-16 top-10 size-72 rounded-full bg-indigo-400/25 dark:bg-indigo-500/20"
        style={{ animationDelay: "-6s" }}
      />

      <div className="page-container relative py-10 sm:py-14 lg:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <div className="min-w-0">
            <BlurFade inView direction="up">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:border-sky-800/60 dark:bg-sky-950/40 dark:text-sky-300">
                  <Briefcase size={12} className="shrink-0" aria-hidden />
                  {t.availableBadge}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/70 px-3 py-1 text-xs font-medium text-gray-600 backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/50 dark:text-gray-300">
                  <MapPin size={12} className="text-sky-500 shrink-0" aria-hidden />
                  {locationCity}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:border-emerald-800/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                  <Wifi size={12} className="shrink-0" aria-hidden />
                  {locationModality}
                </span>
              </div>
            </BlurFade>

            <BlurFade inView direction="up" delay={0.08}>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400">
                {t.title}
              </p>
              <h1
                id="main-heading"
                className="mt-2 text-4xl font-extrabold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white"
              >
                <span className="text-gradient-brand">{t.subtitle}</span>
              </h1>
            </BlurFade>

            <BlurFade inView direction="up" delay={0.12} className="mt-6 lg:hidden">
              <HeroPortrait title={t.title} size="md" />
            </BlurFade>

            <BlurFade inView direction="up" delay={0.16}>
              <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-gray-700 sm:text-lg dark:text-gray-300">
                {parseRichText(t.summary)}
              </p>
              <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {t.heroTagline}
              </p>
              <p className="mt-3 text-sm font-semibold text-gray-500 dark:text-gray-400">
                {t.heroOpenTo}{" "}
                <LayoutTextFlip
                  text=""
                  words={["Backend", "DevOps", "Fullstack", "Cloud"]}
                  className="font-bold text-sky-600 dark:text-sky-400"
                />
              </p>
            </BlurFade>

            <BlurFade inView direction="up" delay={0.24}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href={mailto}
                  className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
                >
                  <Mail size={16} aria-hidden />
                  {t.contactMe}
                </a>
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white/70 px-5 py-3 text-sm font-semibold text-gray-800 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400 hover:text-sky-700 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-200 dark:hover:border-sky-600 dark:hover:text-sky-300"
                >
                  {t.heroViewProjects}
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.viewLinkedIn}
                    className="inline-flex size-11 items-center justify-center rounded-xl border border-gray-300 bg-white/70 text-gray-700 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400 hover:text-sky-600 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-200 dark:hover:border-sky-600 dark:hover:text-sky-400"
                  >
                    <Linkedin size={18} aria-hidden />
                  </a>
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="inline-flex size-11 items-center justify-center rounded-xl border border-gray-300 bg-white/70 text-gray-700 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-400 hover:text-sky-600 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-200 dark:hover:border-sky-600 dark:hover:text-sky-400"
                  >
                    <Github size={18} aria-hidden />
                  </a>
                </div>
              </div>
            </BlurFade>

          </div>

          <BlurFade
            inView
            direction="right"
            delay={0.12}
            className="hidden lg:block"
          >
            <HeroPortrait title={t.title} />
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default Hero;
