import React from "react";
import { motion } from "motion/react";
import { Briefcase, Calendar, Building2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { ExpandableCard } from "./ui/expandable-card";
import { cn } from "../lib/utils";

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

  // Función mejorada para parsear texto con etiquetas HTML
  const parseText = (text: string): React.ReactNode => {
    if (!text) return null;
    
    // Soporte para <strong>, <em>, y <code>
    const parts = text.split(/(<strong>.*?<\/strong>|<em>.*?<\/em>|<code>.*?<\/code>)/g);
    
    return parts.map((part, partIdx) => {
      if (part.startsWith("<strong>") && part.endsWith("</strong>")) {
        const text = part.replace(/<\/?strong>/g, "");
        return (
          <strong
            key={partIdx}
            className="font-bold text-gray-900 dark:text-gray-100"
          >
            {text}
          </strong>
        );
      }
      if (part.startsWith("<em>") && part.endsWith("</em>")) {
        const text = part.replace(/<\/?em>/g, "");
        return (
          <em key={partIdx} className="italic text-gray-700 dark:text-gray-300">
            {text}
          </em>
        );
      }
      if (part.startsWith("<code>") && part.endsWith("</code>")) {
        const text = part.replace(/<\/?code>/g, "");
        return (
          <code
            key={partIdx}
            className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono text-sky-600 dark:text-sky-400"
          >
            {text}
          </code>
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
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="cv-experience-item"
          >
            {/* Header mejorado de la experiencia */}
            <div className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Building2 size={14} className="text-sky-500 dark:text-sky-400" />
                        <span className="font-semibold text-gray-700 dark:text-gray-300">
                          {exp.company}
                        </span>
                      </div>
                      <span className="text-gray-400 dark:text-gray-500">•</span>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-sky-500 dark:text-sky-400" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de proyectos en cards - una sola columna */}
            <div className="flex flex-col gap-4 relative" style={{ zIndex: 1 }}>
              {exp.projects.map((project, pIdx) => {
                return (
                  <motion.div
                    key={pIdx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (idx * 0.1) + (pIdx * 0.05) }}
                  >
                    <ExpandableCard
                      id={`project-${idx}-${pIdx}`}
                      title={project.name}
                      description={parseText(project.description)}
                      expandedContent={
                        <div className="space-y-6">
                          {/* Descripción del proyecto */}
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                              <span className="w-1 h-4 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
                              {t.description}
                            </h3>
                            <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed pl-3">
                              {parseText(project.description)}
                            </div>
                          </div>
                          
                          {/* Responsabilidades */}
                          <div>
                            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                              <span className="w-1 h-4 bg-sky-500 dark:bg-sky-400 rounded-full"></span>
                              {t.responsibilities}
                            </h3>
                            <ul className="space-y-2.5 text-gray-700 dark:text-gray-300 list-none pl-3">
                              {project.responsibilities.map((resp, rIdx) => (
                                <motion.li
                                  key={rIdx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: rIdx * 0.05 }}
                                  className="text-sm leading-relaxed flex gap-3 group"
                                >
                                  <span className="text-sky-500 dark:text-sky-400 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400 mt-2 group-hover:scale-125 transition-transform"></span>
                                  <span className="flex-1">{parseText(resp)}</span>
                                </motion.li>
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
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
