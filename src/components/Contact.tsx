import React, { useState, useEffect } from "react";
import { HiLocationMarker } from "react-icons/hi";
import { BsTelephone } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b-2 border-sky-300 dark:border-sky-600">
        {t.contact}
      </h3>
      <div className="text-gray-800 dark:text-gray-300 text-sm leading-relaxed space-y-3">
        <a
          href="https://www.google.com/maps/search/?api=1&query=28521+Rivas-Vaciamadrid+Madrid+España"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
          aria-label="Abrir ubicación en Google Maps"
        >
          <HiLocationMarker
            className="text-sky-600 dark:text-sky-400 shrink-0"
            size={16}
          />
          <span className="underline">28521, Rivas-Vaciamadrid (Madrid)</span>
        </a>
        <div className="flex items-center gap-2">
          <HiMail
            className="text-sky-600 dark:text-sky-400 shrink-0"
            size={16}
          />
          <a
            href="mailto:mariodepablo2005@gmail.com"
            className="break-all hover:text-sky-600 dark:hover:text-sky-400 transition-colors underline"
            aria-label="Enviar email a Mario de Pablo Damián"
          >
            mariodepablo2005@gmail.com
          </a>
        </div>
        {isMobile ? (
          <a
            href="tel:+34683127718"
            className="flex items-center gap-2 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
            aria-label="Llamar a Mario de Pablo Damián"
          >
            <BsTelephone
              className="text-sky-600 dark:text-sky-400 shrink-0"
              size={16}
            />
            <span className="underline">+34 683127718</span>
          </a>
        ) : (
          <div className="flex items-center gap-2">
            <BsTelephone
              className="text-sky-600 dark:text-sky-400 shrink-0"
              size={16}
            />
            <span>+34 683127718</span>
          </div>
        )}
        
        {/* Social Links */}
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <a
            href="https://github.com/Mariosos1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-800 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            aria-label="GitHub de Mario de Pablo Damián"
          >
            <FaGithub
              className="text-sky-600 dark:text-sky-400 shrink-0"
              size={18}
            />
            <span className="text-sm">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/mario-de-pablo-damian/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-800 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            aria-label="LinkedIn de Mario de Pablo Damián"
          >
            <FaLinkedin
              className="text-sky-600 dark:text-sky-400 shrink-0"
              size={18}
            />
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
