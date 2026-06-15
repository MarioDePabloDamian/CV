import React, { useState } from "react";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { profile, mailto } from "../data/profile";
import { parseRichText } from "../lib/parse-rich-text";
import ThemeToggle from "./ThemeToggle";
import LanguageSelector from "./LanguageSelector";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "./ui/resizable-navbar";

const Header: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [menuOpen, setMenuOpen] = useState(false);

  const locationFull = `${profile.address.locality}, ${profile.address.region}`;

  const navItems = [
    { name: t.navExperience, link: "#experience" },
    { name: t.navProjects, link: "#projects" },
    { name: t.navContact, link: "#contact" },
  ];

  const Logo = (
    <a
      href="#main-content"
      aria-label={t.title}
      className="flex shrink-0 items-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
    >
      <img
        src="/logo.png"
        alt=""
        className="size-9 object-contain sm:size-10"
        width="40"
        height="40"
        loading="eager"
        decoding="async"
      />
    </a>
  );

  return (
    <>
      <Navbar>
        <NavBody>
          {Logo}
          <NavItems items={navItems} />
          <div className="flex shrink-0 items-center gap-1.5">
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.viewLinkedIn}
              className="touch-target inline-flex items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-sky-50 hover:text-sky-700 dark:text-gray-300 dark:hover:bg-sky-950/40 dark:hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <FaLinkedin size={18} aria-hidden />
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="touch-target inline-flex items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-sky-50 hover:text-sky-700 dark:text-gray-300 dark:hover:bg-sky-950/40 dark:hover:text-sky-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <FaGithub size={18} aria-hidden />
            </a>
            <ThemeToggle />
            <LanguageSelector compact />
            <a
              href={mailto}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-sky-500/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950"
            >
              <Mail size={15} aria-hidden />
              {t.contactMe}
            </a>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            {Logo}
            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <LanguageSelector compact />
              <MobileNavToggle
                isOpen={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                label={menuOpen ? t.navCloseMenu : t.navMenu}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu isOpen={menuOpen}>
            {navItems.map((item) => (
              <a
                key={item.link}
                href={item.link}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-sky-50 hover:text-sky-700 dark:text-gray-200 dark:hover:bg-sky-950/40 dark:hover:text-sky-300"
              >
                {item.name}
              </a>
            ))}
            <a
              href={mailto}
              onClick={() => setMenuOpen(false)}
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-500/25"
            >
              <Mail size={15} aria-hidden />
              {t.contactMe}
            </a>
            <div className="mt-1 flex items-center gap-2">
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.viewLinkedIn}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-sky-300 hover:text-sky-700 dark:border-gray-700 dark:text-gray-200 dark:hover:text-sky-300"
              >
                <FaLinkedin size={16} aria-hidden />
                LinkedIn
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-sky-300 hover:text-sky-700 dark:border-gray-700 dark:text-gray-200 dark:hover:text-sky-300"
              >
                <FaGithub size={16} aria-hidden />
                GitHub
              </a>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Cabecera solo para impresión / PDF (ATS-friendly) */}
      <div className="hidden print:block page-container py-3 text-sm text-black border-b border-gray-300">
        <h1 className="font-bold text-xl text-sky-800">{t.subtitle}</h1>
        <p className="text-base font-medium">
          {t.title} · {locationFull}
        </p>
        <p className="mt-2 max-w-[72ch] text-sm leading-relaxed">
          {parseRichText(t.summary)}
        </p>
        <p className="mt-1 break-all">
          {profile.email} · {profile.phone.display} · {profile.links.linkedin}
        </p>
      </div>
    </>
  );
};

export default Header;
