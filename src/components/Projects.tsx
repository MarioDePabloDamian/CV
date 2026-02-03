import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { FiPause, FiPlay, FiGithub, FiExternalLink } from "react-icons/fi";

interface Project {
  title: string;
  description: string;
  status: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  statusColor: string;
  githubUrl?: string | null;
  demoUrl?: string | null;
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
      githubUrl: "https://github.com/Mariosos1/blackjack-calculator",
      demoUrl: null,
    },
    {
      title: t.emberizeTitle,
      description: t.emberizeDesc,
      status: t.emberizeStatus,
      icon: FiPause,
      statusColor: "text-yellow-600 dark:text-yellow-400",
      githubUrl: "https://github.com/Mariosos1/emberize",
      demoUrl: null,
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

              {/* Estado y Enlaces */}
              <div className="mt-2 sm:mt-4 flex flex-col gap-2">
                <p
                  className={`text-xs font-medium ${project.statusColor} italic`}
                >
                  {project.status}
                </p>
                <div className="flex gap-3 flex-wrap">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                      aria-label={`Ver código de ${project.title} en GitHub`}
                    >
                      <FiGithub size={14} />
                      <span>GitHub</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                      aria-label={`Ver demo de ${project.title}`}
                    >
                      <FiExternalLink size={14} />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
