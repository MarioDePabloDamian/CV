import React from "react";
import { FiAward } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { SectionHeading } from "./ui/section-heading";

const SoftSkills: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const skills = [t.skill1, t.skill2, t.skill3, t.skill4, t.skill5, t.skill6];

  return (
    <div>
      <SectionHeading as="h3">
        {t.skillsSoft}
      </SectionHeading>
      <ul className="space-y-2 text-gray-800 dark:text-gray-300 list-none">
        {skills.map((skill, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed">
            <FiAward
              className="text-sky-600 dark:text-sky-400 shrink-0 mt-0.5"
              size={14}
              aria-hidden
            />
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SoftSkills;
