import React from "react";
import { ArrowRight, Bot, ExternalLink, Github, Globe, Sparkles } from "lucide-react";
import { FiPlay } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { SectionHeading } from "./ui/section-heading";
import { profile } from "../data/profile";
import { cn } from "../lib/utils";

type ProjectAccent = "sky" | "indigo" | "cyan";

const accentStyles: Record<
  ProjectAccent,
  {
    iconWrap: string;
    icon: string;
    chip: string;
    highlight: string;
    highlightIcon: string;
    highlightText: string;
    cta: string;
  }
> = {
  sky: {
    iconWrap: "bg-sky-100 dark:bg-sky-900/50 ring-sky-200/80 dark:ring-sky-800/60",
    icon: "text-sky-600 dark:text-sky-400",
    chip: "bg-sky-50 text-sky-800 border-sky-100 dark:bg-sky-950/50 dark:text-sky-200 dark:border-sky-900/60",
    highlight: "border-sky-200/70 bg-sky-50/80 dark:border-sky-900/50 dark:bg-sky-950/25",
    highlightIcon: "text-sky-600 dark:text-sky-400",
    highlightText: "text-sky-800 dark:text-sky-300",
    cta: "bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500",
  },
  indigo: {
    iconWrap: "bg-indigo-100 dark:bg-indigo-900/40 ring-indigo-200/80 dark:ring-indigo-800/60",
    icon: "text-indigo-600 dark:text-indigo-400",
    chip: "bg-indigo-50 text-indigo-800 border-indigo-100 dark:bg-indigo-950/40 dark:text-indigo-200 dark:border-indigo-900/60",
    highlight: "border-indigo-200/70 bg-indigo-50/80 dark:border-indigo-900/50 dark:bg-indigo-950/25",
    highlightIcon: "text-indigo-600 dark:text-indigo-400",
    highlightText: "text-indigo-800 dark:text-indigo-300",
    cta: "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500",
  },
  cyan: {
    iconWrap: "bg-cyan-100 dark:bg-cyan-900/35 ring-cyan-200/80 dark:ring-cyan-800/50",
    icon: "text-cyan-700 dark:text-cyan-400",
    chip: "bg-cyan-50 text-cyan-900 border-cyan-100 dark:bg-cyan-950/35 dark:text-cyan-200 dark:border-cyan-900/50",
    highlight: "border-cyan-200/70 bg-cyan-50/80 dark:border-cyan-900/50 dark:bg-cyan-950/25",
    highlightIcon: "text-cyan-600 dark:text-cyan-400",
    highlightText: "text-cyan-800 dark:text-cyan-300",
    cta: "bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-500",
  },
};

const Projects: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const projects: Array<{
    title: string;
    description: string;
    highlight: string;
    icon: React.ElementType;
    demoUrl: string;
    stack: string;
    accent: ProjectAccent;
    githubUrl?: string;
  }> = [
    {
      title: t.pilatesTitle,
      description: t.pilatesDesc,
      highlight: t.pilatesStatus,
      icon: Globe,
      demoUrl: "https://pilateslucialotero.es",
      stack: "Next.js · FastAPI · PostgreSQL · Stripe · Docker · Nginx",
      accent: "sky",
    },
    {
      title: t.openclawTitle,
      description: t.openclawDesc,
      highlight: t.openclawStatus,
      icon: Bot,
      demoUrl: profile.links.openclaw,
      stack: "OpenClaw · Docker · Traefik",
      accent: "indigo",
    },
    {
      title: t.blackjackTitle,
      description: t.blackjackDesc,
      highlight: t.blackjackStatus,
      icon: FiPlay,
      demoUrl: "https://blackjackforall.com",
      stack: "Cloudflare · Next.js · Rust",
      accent: "cyan",
    },
  ];

  return (
    <div>
      <SectionHeading className="mb-6 pb-3" animated={false}>
        {t.personalProjects}
      </SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        {projects.map((project, idx) => {
          const IconComponent = project.icon;
          const styles = accentStyles[project.accent];
          const stackItems = project.stack.split(" · ").map((item) => item.trim());

          return (
            <article
              key={idx}
              className="flex flex-col h-full rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 p-4 sm:p-5 print:break-inside-avoid"
            >
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-3.5 mb-4">
                  <div
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-xl ring-1",
                      styles.iconWrap
                    )}
                  >
                    <IconComponent className={cn("size-5", styles.icon)} aria-hidden />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-[1.05rem] font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {stackItems.map((item) => (
                    <span
                      key={item}
                      className={cn(
                        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] sm:text-[11px] font-medium leading-tight",
                        styles.chip
                      )}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4 flex-1">
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
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <Github size={14} aria-hidden />
                      {t.github}
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors",
                        styles.cta
                      )}
                    >
                      <ExternalLink size={14} aria-hidden />
                      {t.demo}
                      <ArrowRight className="size-3 opacity-80" aria-hidden />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
