import {
  Root as HoverCardRoot,
  Trigger as HoverCardTrigger,
  Content as HoverCardContent,
} from "@radix-ui/react-hover-card";
import React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

type LinkPreviewProps = {
  children: React.ReactNode;
  url?: string;
  className?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  buttonText?: string;
  buttonAction?: (e?: React.MouseEvent<HTMLElement>) => void;
  email?: string;
  customPreview?: React.ReactNode;
};

const strings = {
  es: {
    contact: "Contacto",
    link: "Enlace",
    clickContact: "Haz clic para abrir el formulario de contacto",
    visit: "Haz clic para visitar",
    visitSite: "Haz clic para visitar el sitio",
    openForm: "Abrir formulario",
    goToSite: "Ir al sitio",
    devPlatform: "Plataforma de desarrollo",
    professionalNetwork: "Red social profesional",
    viewMap: "Ver ubicación en Google Maps",
    repository: "Repositorio",
  },
  en: {
    contact: "Contact",
    link: "Link",
    clickContact: "Click to open the contact form",
    visit: "Click to visit",
    visitSite: "Click to visit the site",
    openForm: "Open form",
    goToSite: "Go to site",
    devPlatform: "Development platform",
    professionalNetwork: "Professional social network",
    viewMap: "View location on Google Maps",
    repository: "Repository",
  },
} as const;

export const LinkPreview = ({
  children,
  url,
  className,
  title,
  description,
  icon,
  buttonText,
  buttonAction,
  email,
  customPreview,
}: LinkPreviewProps) => {
  const { language } = useLanguage();
  const s = strings[language];

  const [isOpen, setOpen] = React.useState(false);
  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const offsetFromCenter = (event.clientX - targetRect.left - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  const getTitle = () => {
    if (title) return title;
    if (email) return s.contact;
    if (!url) return s.link;
    try {
      const hostname = new URL(url).hostname.replace("www.", "");
      if (hostname.includes("github.com")) return "GitHub";
      if (hostname.includes("linkedin.com")) return "LinkedIn";
      if (hostname.includes("maps.google") || hostname.includes("goo.gl")) return "Google Maps";
      return hostname.split(".")[0].charAt(0).toUpperCase() + hostname.split(".")[0].slice(1);
    } catch { return s.link; }
  };

  const getDescription = () => {
    if (description) return description;
    if (email) return s.clickContact;
    if (!url) return s.visit;
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("github.com")) {
        const parts = urlObj.pathname.split("/").filter(Boolean);
        return parts.length >= 2 ? `${s.repository}: ${parts[0]}/${parts[1]}` : s.devPlatform;
      }
      if (urlObj.hostname.includes("linkedin.com")) return s.professionalNetwork;
      if (urlObj.hostname.includes("maps.google") || urlObj.hostname.includes("goo.gl")) return s.viewMap;
      return urlObj.hostname.replace("www.", "");
    } catch { return s.visitSite; }
  };

  const getDomain = () => {
    if (email) return email;
    if (!url) return "";
    try {
      return url.startsWith("mailto:") ? url.replace("mailto:", "") : new URL(url).hostname.replace("www.", "");
    } catch { return url; }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (buttonAction) { e.preventDefault(); e.stopPropagation(); buttonAction(e); }
  };

  return (
    <HoverCardRoot openDelay={50} closeDelay={100} onOpenChange={setOpen}>
      <HoverCardTrigger asChild>
        {url ? (
          <a
            href={url}
            target={url.startsWith("mailto:") ? undefined : "_blank"}
            rel={url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            onMouseMove={handleMouseMove}
            className={cn("text-black dark:text-white", className)}
          >
            {children}
          </a>
        ) : (
          <button type="button" onMouseMove={handleMouseMove} className={cn("text-black dark:text-white", className)}>
            {children}
          </button>
        )}
      </HoverCardTrigger>

      <HoverCardContent
        className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
        side="top"
        align="center"
        sideOffset={10}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.6 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 20 } }}
              exit={{ opacity: 0, y: 20, scale: 0.6 }}
              className={cn(
                "shadow-xl rounded-xl bg-white dark:bg-gray-900/95 p-4",
                customPreview ? "min-w-[300px] max-w-[400px]" : "min-w-[250px] max-w-[320px]"
              )}
              style={{ x: translateX }}
            >
              {customPreview ?? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    {icon && <div className="text-sky-600 dark:text-sky-400 shrink-0">{icon}</div>}
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate flex-1 min-w-0">
                      {getTitle()}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{getDescription()}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{getDomain()}</div>
                  <div className="border-t border-gray-200 dark:border-gray-700" />
                  {buttonAction ? (
                    <button
                      type="button"
                      onClick={handleButtonClick}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      <span>{buttonText ?? s.openForm}</span>
                    </button>
                  ) : url ? (
                    <a
                      href={url}
                      target={url.startsWith("mailto:") ? undefined : "_blank"}
                      rel={url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                      onClick={handleButtonClick}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      <span>{buttonText ?? s.goToSite}</span>
                      <ExternalLink size={14} />
                    </a>
                  ) : null}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </HoverCardContent>
    </HoverCardRoot>
  );
};
