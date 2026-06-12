import React from "react";
import { Briefcase, Calendar, Building2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { parseRichText } from "../lib/parse-rich-text";
import { SectionHeading } from "./ui/section-heading";

const Experience: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const experiences = [
    {
      title: t.experienceTitle,
      company: t.experienceCompany,
      period: t.experiencePeriod,
      projects: [
        {
          name: t.project1,
          subtitle: t.project1Designation,
          description: t.project1Desc,
          responsibilities: [
            t.resp1,
            t.resp3,
            t.resp4,
            t.resp6,
            t.resp7,
            t.resp8,
            t.resp9,
          ],
        },
        {
          name: t.project2,
          subtitle: t.project2Designation,
          description: t.project2Desc,
          responsibilities: [t.resp11, t.resp12, t.resp13],
        },
        {
          name: t.project3,
          subtitle: t.project3Designation,
          description: t.project3Desc,
          responsibilities: [t.resp14, t.resp15, t.resp16],
        },
        {
          name: t.project3Card1Title,
          subtitle: t.project3Card1Designation,
          description: t.project3Card1Content,
          responsibilities: [t.resp17, t.resp18],
        },
        {
          name: t.project3Card2Title,
          subtitle: t.project3Card2Designation,
          description: t.project3Card2Content,
          responsibilities: [t.resp19, t.resp20],
        },
      ],
    },
  ];

  return (
    <div>
      <SectionHeading className="mb-6 pb-3" animated={false}>
        {t.experience}
      </SectionHeading>

      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <article key={idx} className="cv-experience-item">
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

            <div className="space-y-5">
              {exp.projects.map((project, pIdx) => (
                <section
                  key={pIdx}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30 p-4 sm:p-5 print:break-inside-avoid"
                >
                  <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {project.name}
                  </h4>
                  {"subtitle" in project && project.subtitle && (
                    <p className="text-xs text-sky-600 dark:text-sky-400 font-medium mb-2">
                      {project.subtitle}
                    </p>
                  )}
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    {parseRichText(project.description)}
                  </p>
                  <ul className="space-y-2 list-none">
                    {project.responsibilities.map((resp, rIdx) => (
                      <li
                        key={rIdx}
                        className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex gap-2.5"
                      >
                        <span
                          className="shrink-0 w-1.5 h-1.5 rounded-full bg-sky-500 mt-2"
                          aria-hidden
                        />
                        <span>{parseRichText(resp)}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Experience;
