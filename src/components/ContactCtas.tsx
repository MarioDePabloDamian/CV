import React from "react";
import { Mail, Phone, Linkedin, Github, Printer } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { profile, mailto } from "../data/profile";

interface ContactCtasProps {
  layout?: "hero" | "compact" | "footer";
  className?: string;
}

export const ContactCtas: React.FC<ContactCtasProps> = ({
  layout = "hero",
  className,
}) => {
  const { language } = useLanguage();
  const t = translations[language];

  const iconBtn =
    "touch-target inline-flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 active:bg-gray-100 dark:active:bg-gray-800 transition-colors shrink-0";

  if (layout === "compact") {
    return (
      <div
        className={`flex flex-wrap items-center gap-1.5 sm:gap-1 w-full sm:w-auto ${className ?? ""}`}
      >
        <a
          href={mailto}
          className="touch-target inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-md bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white transition-colors"
        >
          <Mail size={15} aria-hidden />
          <span className="hidden min-[420px]:inline">{t.contactMe}</span>
        </a>
        <a href={`tel:${profile.phone.tel}`} className={iconBtn} aria-label={profile.phone.display}>
          <Phone size={14} aria-hidden />
        </a>
        <a
          href={profile.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label={t.viewLinkedIn}
        >
          <Linkedin size={14} aria-hidden />
        </a>
        <a
          href={profile.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${iconBtn} hidden min-[380px]:inline-flex`}
          aria-label="GitHub"
        >
          <Github size={15} aria-hidden />
        </a>
        <button
          type="button"
          onClick={() => window.print()}
          className={`${iconBtn} hidden sm:inline-flex`}
          aria-label={t.downloadCv}
        >
          <Printer size={15} aria-hidden />
        </button>
      </div>
    );
  }

  if (layout === "footer") {
    return (
      <a
        href={mailto}
        className="group inline-flex max-w-full items-center justify-center gap-2 break-all rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 px-5 sm:px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 print:bg-sky-600 print:text-white print:shadow-none"
      >
        <Mail size={18} className="shrink-0" aria-hidden />
        {profile.email}
      </a>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
      <a
        href={mailto}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-sky-600 hover:bg-sky-700 text-white transition-colors"
      >
        <Mail size={16} aria-hidden />
        {t.contactMe}
      </a>
      <a
        href={`tel:${profile.phone.tel}`}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
      >
        <Phone size={16} aria-hidden />
        {profile.phone.display}
      </a>
      <a
        href={profile.links.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-sky-200 dark:border-sky-700 text-sky-700 dark:text-sky-300 hover:bg-sky-50 dark:hover:bg-sky-950/50 transition-colors"
      >
        <Linkedin size={16} aria-hidden />
        {t.viewLinkedIn}
      </a>
      <a
        href={profile.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
      >
        <Github size={16} aria-hidden />
        GitHub
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="no-print inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
      >
        <Printer size={16} aria-hidden />
        {t.downloadCv}
      </button>
    </div>
  );
};
