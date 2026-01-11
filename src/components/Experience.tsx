import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";

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

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 pb-3 border-b-2 border-sky-300 dark:border-sky-600">
        {t.experience}
      </h2>
      <div className="space-y-8">
        {experiences.map((exp, idx) => (
          <div key={idx} className="cv-experience-item">
            <div className="mb-4">
              <div className="jobtitle block text-base font-semibold mb-1 text-gray-900 dark:text-gray-100">
                {exp.title}
              </div>
              <div className="text-black dark:text-gray-300 text-sm">
                <span className="font-semibold">{exp.company}</span>
                <span className="mx-1">|</span>
                <span className="text-sm">{exp.period}</span>
              </div>
            </div>

            {exp.projects.map((project, pIdx) => {
              // Parse description for <strong> tags
              const descParts = project.description.split(/(<strong>.*?<\/strong>)/g);
              return (
              <div key={pIdx} className="mb-4 last:mb-0">
                <div className="text-base font-semibold text-black dark:text-gray-100 mb-2">
                  {project.name}
                </div>
                <div className="text-black dark:text-gray-300 mb-3 text-sm leading-6">
                  {descParts.map((part, partIdx) => {
                    if (
                      part.startsWith("<strong>") &&
                      part.endsWith("</strong>")
                    ) {
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
                  })}
                </div>
                <div className="experience-list">
                  <ul className="space-y-2 text-black dark:text-gray-300">
                    {project.responsibilities.map((resp, rIdx) => {
                      // Parse resp for <strong> tags
                      const parts = resp.split(/(<strong>.*?<\/strong>)/g);
                      return (
                        <li key={rIdx} className="text-sm leading-6">
                          {parts.map((part, partIdx) => {
                            if (
                              part.startsWith("<strong>") &&
                              part.endsWith("</strong>")
                            ) {
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
                          })}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
