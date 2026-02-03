import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { ExpandableCard } from "./ui/expandable-card";

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
          description: t.project1Desc,
          responsibilities: [
            t.resp1,
            t.resp3,
            t.resp4,
            t.resp5,
            t.resp6,
            t.resp7,
            t.resp8,
          ],
        },
        {
          name: t.project2,
          description: t.project2Desc,
          responsibilities: [t.resp11, t.resp12, t.resp13],
        },
        {
          name: t.project3,
          description: t.project3Desc,
          responsibilities: [t.resp14, t.resp15, t.resp16],
        },
      ],
    },
  ];

  const parseText = (text: string) => {
    const parts = text.split(/(<strong>.*?<\/strong>)/g);
    return parts.map((part, partIdx) => {
      if (part.startsWith("<strong>") && part.endsWith("</strong>")) {
        const text = part.replace(/<\/?strong>/g, "");
        return (
          <strong
            key={partIdx}
            className="font-bold text-black dark:text-gray-100"
          >
            {text}
          </strong>
        );
      }
      return <span key={partIdx}>{part}</span>;
    });
  };


  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-3 border-b-2 border-sky-300 dark:border-sky-600">
        {t.experience}
      </h2>
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="cv-experience-item">
            <div className="mb-6">
              <div className="jobtitle block text-base font-semibold mb-1 text-gray-900 dark:text-gray-100">
                {exp.title}
              </div>
              <div className="text-black dark:text-gray-300 text-sm">
                <span className="font-semibold">{exp.company}</span>
                <span className="mx-1">|</span>
                <span className="text-sm">{exp.period}</span>
              </div>
            </div>

            {/* Lista de proyectos en cards - una sola columna */}
            <div className="flex flex-col gap-4 relative" style={{ zIndex: 1 }}>
              {exp.projects.map((project, pIdx) => {
                return (
                  <ExpandableCard
                    key={pIdx}
                    id={`project-${pIdx}`}
                    title={project.name}
                    description={parseText(project.description)}
                    expandedContent={
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t.description}
                          </h3>
                          <div className="text-black dark:text-gray-300 text-sm leading-6">
                            {parseText(project.description)}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {t.responsibilities}
                          </h3>
                          <ul className="space-y-3 text-black dark:text-gray-300 list-none">
                            {project.responsibilities.map((resp, rIdx) => (
                              <li key={rIdx} className="text-sm leading-6 flex gap-3">
                                <span className="text-sky-500 dark:text-sky-400 flex-shrink-0 w-2 h-2 rounded-full bg-sky-500 dark:bg-sky-400 mt-[0.5rem]"></span>
                                <span className="flex-1">{parseText(resp)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    }
                    className="shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                      {t.viewDetails}
                    </span>
                  </ExpandableCard>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Experience;
