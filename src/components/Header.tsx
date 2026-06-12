import React from "react";
import { MapPin } from "lucide-react";
import profilePhoto from "../assets/FotoCV.jpg";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { profile } from "../data/profile";
import { ContactCtas } from "./ContactCtas";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";

const Header: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const locationFull = `${profile.address.locality}, ${profile.address.region}`;

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-950/85 supports-[backdrop-filter]:backdrop-blur-md border-b-2 border-sky-400 dark:border-sky-500 shadow-sm shadow-black/20 pt-[env(safe-area-inset-top,0px)]">
      <div className="page-container print:hidden py-2 sm:py-2.5">
        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
          <img
            src={profilePhoto}
            alt={t.title}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-sky-400 dark:border-sky-500 object-cover shrink-0"
            loading="eager"
            decoding="async"
            width="48"
            height="48"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-wrap">
              <h1
                className="text-sm sm:text-lg font-bold text-sky-700 dark:text-sky-300 leading-tight"
                id="main-heading"
              >
                {t.subtitle}
              </h1>
              <span className="inline-flex shrink-0 items-center gap-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span
                  className="size-1 rounded-full bg-emerald-500 motion-safe:sm:animate-pulse"
                  aria-hidden
                />
                {t.availableBadge}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-wrap mt-0.5">
              <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                {t.title}
              </p>
              <span
                className="text-gray-300 dark:text-gray-600 shrink-0 hidden sm:inline"
                aria-hidden
              >
                ·
              </span>
              <p className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 min-w-0">
                <MapPin size={12} className="shrink-0 text-sky-500" aria-hidden />
                <span className="sm:hidden">{profile.address.region}</span>
                <span className="hidden sm:inline">{locationFull}</span>
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <ContactCtas layout="compact" />
            <div className="flex items-center gap-1.5 border-l border-gray-200 dark:border-gray-800 pl-2">
              <ThemeToggle />
              <LanguageSelector compact />
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-1.5 shrink-0">
            <ThemeToggle />
            <LanguageSelector compact />
          </div>
        </div>

        <div className="lg:hidden mt-2.5 pt-2.5 border-t border-gray-100 dark:border-gray-800">
          <ContactCtas layout="compact" className="justify-start sm:justify-center" />
        </div>
      </div>

      <div className="hidden print:block page-container py-3 text-sm text-black border-b border-gray-300">
        <h1 className="font-bold text-xl text-sky-800">{t.subtitle}</h1>
        <p className="text-base font-medium">
          {t.title} · {locationFull}
        </p>
        <p className="mt-1 break-all">
          {profile.email} · {profile.phone.display} · {profile.links.linkedin}
        </p>
      </div>
    </header>
  );
};

export default Header;
