import React from "react";
import { ArrowRight, Bot, ExternalLink, Github, Globe, Sparkles } from "lucide-react";
import { FiPlay } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { SectionHeading } from "./ui/section-heading";
import { BentoCard, BentoGrid } from "./ui/bento-grid";
import { BorderBeam } from "./ui/border-beam";
import { TiltCard } from "./ui/tilt-card";
import { LinkPreview } from "./ui/link-preview";
import { profile } from "../data/profile";
import { getTechStackIcon } from "../data/tech-stack-items";
import { cn } from "../lib/utils";

type ProjectAccent = "sky" | "indigo" | "cyan";

const accentStyles: Record<
  ProjectAccent,
  {
    iconWrap: string;
    icon: string;
    chip: string;
    chipHover: string;
    chipIconWrap: string;
    highlight: string;
    highlightIcon: string;
    highlightText: string;
    cta: string;
    blob: string;
  }
> = {
  sky: {
    iconWrap: "bg-sky-100 dark:bg-sky-900/50 ring-sky-200/80 dark:ring-sky-800/60",
    icon: "text-sky-600 dark:text-sky-400",
    chip: "border-gray-200/90 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-950/80 dark:text-gray-200",
    chipHover:
      "hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 hover:shadow-[0_4px_12px_-4px_rgba(14,165,233,0.3)] dark:hover:border-sky-600 dark:hover:text-sky-300",
    chipIconWrap:
      "bg-gray-100 ring-gray-200/80 group-hover:ring-sky-300 dark:bg-gray-800 dark:ring-gray-700 dark:group-hover:ring-sky-700/60",
    highlight: "border-sky-200/70 bg-sky-50/80 dark:border-sky-900/50 dark:bg-sky-950/25",
    highlightIcon: "text-sky-600 dark:text-sky-400",
    highlightText: "text-sky-800 dark:text-sky-300",
    cta: "bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500",
    blob: "bg-sky-400/20 dark:bg-sky-500/20",
  },
  indigo: {
    iconWrap: "bg-indigo-100 dark:bg-indigo-900/40 ring-indigo-200/80 dark:ring-indigo-800/60",
    icon: "text-indigo-600 dark:text-indigo-400",
    chip: "border-gray-200/90 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-950/80 dark:text-gray-200",
    chipHover:
      "hover:-translate-y-0.5 hover:border-indigo-300 hover:text-indigo-700 hover:shadow-[0_4px_12px_-4px_rgba(99,102,241,0.3)] dark:hover:border-indigo-600 dark:hover:text-indigo-300",
    chipIconWrap:
      "bg-gray-100 ring-gray-200/80 group-hover:ring-indigo-300 dark:bg-gray-800 dark:ring-gray-700 dark:group-hover:ring-indigo-700/60",
    highlight: "border-indigo-200/70 bg-indigo-50/80 dark:border-indigo-900/50 dark:bg-indigo-950/25",
    highlightIcon: "text-indigo-600 dark:text-indigo-400",
    highlightText: "text-indigo-800 dark:text-indigo-300",
    cta: "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500",
    blob: "bg-indigo-400/20 dark:bg-indigo-500/20",
  },
  cyan: {
    iconWrap: "bg-cyan-100 dark:bg-cyan-900/35 ring-cyan-200/80 dark:ring-cyan-800/50",
    icon: "text-cyan-700 dark:text-cyan-400",
    chip: "border-gray-200/90 bg-white text-gray-700 dark:border-gray-700 dark:bg-gray-950/80 dark:text-gray-200",
    chipHover:
      "hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-800 hover:shadow-[0_4px_12px_-4px_rgba(6,182,212,0.3)] dark:hover:border-cyan-600 dark:hover:text-cyan-300",
    chipIconWrap:
      "bg-gray-100 ring-gray-200/80 group-hover:ring-cyan-300 dark:bg-gray-800 dark:ring-gray-700 dark:group-hover:ring-cyan-700/60",
    highlight: "border-cyan-200/70 bg-cyan-50/80 dark:border-cyan-900/50 dark:bg-cyan-950/25",
    highlightIcon: "text-cyan-600 dark:text-cyan-400",
    highlightText: "text-cyan-800 dark:text-cyan-300",
    cta: "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-500",
    blob: "bg-cyan-400/20 dark:bg-cyan-500/20",
  },
};

interface ProjectItem {
  title: string;
  description: string;
  highlight: string;
  icon: React.ElementType;
  demoUrl: string;
  stack: string;
  accent: ProjectAccent;
  featured?: boolean;
  live?: boolean;
  githubUrl?: string;
}

const Projects: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const projects: ProjectItem[] = [
    {
      title: t.pilatesTitle,
      description: t.pilatesDesc,
      highlight: t.pilatesStatus,
      icon: Globe,
      demoUrl: "https://pilateslucialotero.es",
      stack: "Next.js · FastAPI · PostgreSQL · Stripe · Docker · Nginx",
      accent: "sky",
      featured: true,
      live: true,
    },
    {
      title: t.openclawTitle,
      description: t.openclawDesc,
      highlight: t.openclawStatus,
      icon: Bot,
      demoUrl: profile.links.openclaw,
      stack: "OpenClaw · Docker · Traefik",
      accent: "indigo",
      live: true,
    },
    {
      title: t.blackjackTitle,
      description: t.blackjackDesc,
      highlight: t.blackjackStatus,
      icon: FiPlay,
      demoUrl: "https://blackjackforall.com",
      stack: "Cloudflare · Next.js · Rust",
      accent: "cyan",
      live: true,
    },
  ];

  return (
    <div>
      <SectionHeading className="mb-6 pb-3" animated={false}>
        {t.personalProjects}
      </SectionHeading>

      <BentoGrid className="md:grid-cols-6">
        {projects.map((project, idx) => {
          const IconComponent = project.icon;
          const styles = accentStyles[project.accent];
          const stackItems = project.stack.split(" · ").map((item) => item.trim());

          return (
            <TiltCard
              key={idx}
              className={cn(
                "rounded-xl print:break-inside-avoid",
                project.featured ? "md:col-span-6" : "md:col-span-3"
              )}
            >
            <BentoCard
              variant="flat"
              className={cn(
                "h-full p-5 sm:p-6 transition-shadow duration-300 print:break-inside-avoid",
                project.featured
                  ? "hover:shadow-[0_28px_70px_-30px_rgba(14,165,233,0.5)]"
                  : "hover:shadow-[0_22px_55px_-28px_rgba(14,165,233,0.45)]"
              )}
              background={
                <>
                  <div
                    className={cn(
                      "absolute -right-12 -top-12 size-44 rounded-full blur-3xl",
                      styles.blob
                    )}
                  />
                  {project.featured && (
                    <BorderBeam
                      size={120}
                      duration={8}
                      colorFrom="#38bdf8"
                      colorTo="#6366f1"
                    />
                  )}
                </>
              }
            >
              <div className="flex items-start gap-3.5 mb-4">
                <div
                  className={cn(
                    "flex shrink-0 items-center justify-center rounded-xl ring-1",
                    project.featured ? "size-12" : "size-11",
                    styles.iconWrap
                  )}
                >
                  <IconComponent
                    className={cn(project.featured ? "size-6" : "size-5", styles.icon)}
                    aria-hidden
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={cn(
                        "font-semibold text-gray-900 dark:text-gray-100 leading-snug",
                        project.featured
                          ? "text-lg sm:text-xl"
                          : "text-base sm:text-[1.05rem]"
                      )}
                    >
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-sky-700 dark:border-sky-800/60 dark:bg-sky-950/40 dark:text-sky-300">
                        {t.projectFeatured}
                      </span>
                    )}
                  </div>
                  {project.live && (
                    <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <span className="relative flex size-1.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70 motion-safe:animate-ping" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                      </span>
                      {t.projectLive}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {stackItems.map((item) => {
                  const stackIcon = getTechStackIcon(item);
                  return (
                    <span
                      key={item}
                      className={cn(
                        "group inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 print:translate-y-0 print:shadow-none",
                        styles.chip,
                        styles.chipHover
                      )}
                    >
                      {stackIcon ? (
                        <span
                          className={cn(
                            "flex size-4 shrink-0 items-center justify-center rounded-full ring-1",
                            styles.chipIconWrap
                          )}
                        >
                          <img
                            src={stackIcon}
                            alt=""
                            className="size-2.5 object-contain dark:brightness-110"
                            loading="lazy"
                            decoding="async"
                          />
                        </span>
                      ) : null}
                      {item}
                    </span>
                  );
                })}
              </div>

              <p
                className={cn(
                  "text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 flex-1",
                  project.featured && "sm:text-[0.95rem]"
                )}
              >
                {project.description}
              </p>

              <div
                className={cn(
                  "flex items-start gap-2 rounded-lg border px-3 py-2.5 mb-5",
                  styles.highlight
                )}
              >
                <Sparkles
                  className={cn("size-3.5 shrink-0 mt-0.5", styles.highlightIcon)}
                  aria-hidden
                />
                <p
                  className={cn(
                    "text-xs font-medium leading-relaxed",
                    styles.highlightText
                  )}
                >
                  {project.highlight}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-200/70 dark:border-gray-800/80">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                  >
                    <Github size={14} aria-hidden />
                    {t.github}
                  </a>
                )}
                {project.demoUrl && (
                  <LinkPreview
                    url={project.demoUrl}
                    title={project.title}
                    description={project.description}
                    buttonText={t.demo}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors cursor-pointer",
                      styles.cta
                    )}
                  >
                    <ExternalLink size={14} aria-hidden />
                    {t.demo}
                    <ArrowRight className="size-3 opacity-80" aria-hidden />
                  </LinkPreview>
                )}
              </div>
            </BentoCard>
            </TiltCard>
          );
        })}
      </BentoGrid>
    </div>
  );
};

export default Projects;
