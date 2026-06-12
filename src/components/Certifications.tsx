import React from "react";
import { GiDiploma } from "react-icons/gi";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { SectionHeading } from "./ui/section-heading";

const Certifications: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const certifications = [
    t.certCambridge,
    t.certElastic,
    t.certReact,
    t.certFastAPI,
    t.certOdoo,
  ];

  return (
    <div>
      <SectionHeading as="h3" animated={false}>
        {t.certifications}
      </SectionHeading>
      <ul className="space-y-2 text-gray-800 dark:text-gray-300 list-none">
        {certifications.map((cert, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-sm leading-relaxed"
          >
            <GiDiploma
              className="text-sky-600 dark:text-sky-400 shrink-0 mt-0.5"
              size={16}
              aria-hidden
            />
            <span>{cert}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Certifications;
