import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { FiPause, FiPlay } from "react-icons/fi";

interface Project {
  title: string;
  description: string;
  status: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  statusColor: string;
}

const Projects: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const projects: Project[] = [
    {
      title: t.blackjackTitle,
      description: t.blackjackDesc,
      status: t.blackjackStatus,
      icon: FiPlay,
      statusColor: "text-green-600 dark:text-green-400",
    },
    {
      title: t.emberizeTitle,
      description: t.emberizeDesc,
      status: t.emberizeStatus,
      icon: FiPause,
      statusColor: "text-yellow-600 dark:text-yellow-400",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 border-l-4 border-sky-400 dark:border-sky-500 hover:shadow-xl transition-all duration-300">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 border-b-2 border-sky-300 dark:border-sky-600 pb-2">
        {t.personalProjects}
      </h2>

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6 lg:items-stretch">
        {projects.map((project, idx) => {
          const IconComponent = project.icon;

          return (
            <div
              key={idx}
              className="grid grid-rows-[auto_1fr_auto] lg:grid-rows-[1fr_3fr_1fr] lg:h-full"
            >
              {/* Título */}
              <div className="flex items-center gap-2">
                <IconComponent
                  className={`${project.statusColor} shrink-0`}
                  size={18}
                />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                  {project.title}
                </h3>
              </div>

              {/* Descripción */}
              <div className="min-h-0">
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Estado */}
              <div className="mt-2 sm:mt-4">
                <p
                  className={`text-xs font-medium ${project.statusColor} italic`}
                >
                  {project.status}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
