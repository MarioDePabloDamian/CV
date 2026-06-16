import React, { useEffect, useMemo, useRef, useState } from "react";
import { Briefcase, Calendar, Building2, Tag } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { parseRichText } from "../lib/parse-rich-text";
import { SectionHeading } from "./ui/section-heading";

interface TimelineProject {
  name: string;
  subtitle?: string;
  description: string;
  responsibilities: string[];
}

const ProjectTimeline: React.FC<{ projects: TimelineProject[] }> = ({
  projects,
}) => {
  const ref = useRef<HTMLOListElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setHeight(el.scrollHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 30%", "end 75%"],
  });
  const beamHeight = useTransform(scrollYProgress, [0, 1], [0, height]);

  return (
    <ol ref={ref} className="relative space-y-5 sm:space-y-6">
      <div
        aria-hidden
        className="absolute left-[12px] top-3 bottom-3 w-[2px] rounded-full bg-gray-200 dark:bg-gray-700/70 print:bg-gray-300"
      />
      <motion.div
        aria-hidden
        style={{ height: beamHeight }}
        className="absolute left-[12px] top-3 w-[2px] rounded-full bg-gradient-to-b from-sky-500 via-sky-400 to-sky-300/0 dark:from-sky-400 dark:via-sky-500 motion-reduce:hidden print:hidden"
      />

      {projects.map((project, pIdx) => {
        const isFirst = pIdx === 0;
        return (
          <li key={project.name} className="relative flex gap-4 sm:gap-5">
            <div className="relative z-10 flex w-[26px] shrink-0 justify-center">
              <span
                aria-hidden
                className={
                  isFirst
                    ? "mt-[1.2rem] flex size-[22px] items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-sky-600 ring-4 ring-white dark:ring-gray-900 print:bg-gray-700 print:ring-white"
                    : "mt-[1.2rem] flex size-[18px] items-center justify-center rounded-full border-2 border-sky-400 bg-white ring-4 ring-white dark:border-sky-500/80 dark:bg-gray-900 dark:ring-gray-900 print:border-gray-500 print:bg-white print:ring-white"
                }
              >
                <span
                  className={
                    isFirst
                      ? "size-1.5 rounded-full bg-white"
                      : "size-1.5 rounded-full bg-sky-500 print:bg-gray-700"
                  }
                />
              </span>
            </div>

            <section className="min-w-0 flex-1 rounded-xl border border-gray-200 dark:border-gray-700/80 bg-white/70 dark:bg-gray-900/40 p-4 sm:p-5 transition-colors duration-300 hover:border-sky-300 dark:hover:border-sky-600/70 print:break-inside-avoid print:border-gray-300 print:bg-white">
              <h4 className="text-[15px] sm:text-[17px] font-bold leading-snug text-gray-900 dark:text-gray-100">
                {project.name}
              </h4>
              {project.subtitle && (
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-0.5 text-[11px] font-semibold text-sky-700 dark:border-sky-800/60 dark:bg-sky-950/40 dark:text-sky-300">
                  <Tag size={11} className="shrink-0" aria-hidden />
                  {project.subtitle}
                </span>
              )}

              <p className="max-w-[72ch] 2xl:max-w-none mt-3.5 text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                {parseRichText(project.description)}
              </p>

              <ul className="max-w-[72ch] 2xl:max-w-none mt-3.5 space-y-2.5 list-none border-t border-gray-200 dark:border-gray-700/70 pt-3.5">
                {project.responsibilities.map((resp, rIdx) => (
                  <li
                    key={`${project.name}-r${rIdx}`}
                    className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex gap-2.5"
                  >
                    <span
                      className="shrink-0 size-1.5 rounded-full bg-sky-500 mt-[0.5rem]"
                      aria-hidden
                    />
                    <span>{parseRichText(resp)}</span>
                  </li>
                ))}
              </ul>
            </section>
          </li>
        );
      })}
    </ol>
  );
};

const Experience: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const experiences = useMemo(() => [
    {
      title: t.experienceTitle,
      company: t.experienceCompany,
      period: t.experiencePeriod,
      projects: [
        {
          name: t.project1,
          subtitle: t.project1Designation,
          description: t.project1Desc,
          responsibilities: [t.resp1, t.resp3, t.resp7, t.resp9],
        },
        {
          name: t.project2,
          subtitle: t.project2Designation,
          description: t.project2Desc,
          responsibilities: [t.resp11, t.resp13],
        },
        {
          name: t.project3Card2Title,
          subtitle: t.project3Card2Designation,
          description: t.project3Card2Content,
          responsibilities: [t.resp20],
        },
        {
          name: t.project3,
          subtitle: t.project3Designation,
          description: t.project3Desc,
          responsibilities: [t.resp14, t.resp15],
        },
        {
          name: t.project3Card1Title,
          subtitle: t.project3Card1Designation,
          description: t.project3Card1Content,
          responsibilities: [t.resp17],
        },
      ],
    },
  ], [t]);

  return (
    <div>
      <SectionHeading className="mb-6 pb-3">
        {t.experience}
      </SectionHeading>

      <div className="space-y-8">
        {experiences.map((exp) => (
          <article key={exp.company} className="cv-experience-item">
            <header className="mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 shrink-0">
                  <Briefcase size={20} aria-hidden />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {exp.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-gray-700 dark:text-gray-300">
                      <Building2 size={14} className="text-sky-500" aria-hidden />
                      {exp.company}
                    </span>
                    <span className="text-gray-400" aria-hidden>
                      •
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar size={14} className="text-sky-500" aria-hidden />
                      {exp.period}
                    </span>
                  </div>
                </div>
              </div>
            </header>

            <ProjectTimeline projects={exp.projects} />
          </article>
        ))}
      </div>
    </div>
  );
};

export default Experience;
