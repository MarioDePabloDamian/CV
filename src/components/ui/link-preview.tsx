"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url?: string; // URL opcional (para correos puede ser mailto:)
  className?: string;
  title?: string; // Título del preview
  description?: string; // Descripción del preview
  icon?: React.ReactNode; // Icono del preview
  buttonText?: string; // Texto del botón (por defecto "Ir al sitio")
  buttonAction?: (e?: React.MouseEvent<HTMLElement>) => void; // Acción personalizada del botón (opcional)
  email?: string; // Email para mailto: (opcional)
  customPreview?: React.ReactNode; // Contenido personalizado del preview (opcional)
};

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
  // La URL solo sirve para abrir el enlace en una nueva pestaña
  // El preview muestra título, descripción, URL, icono y botón personalizable
  // Para correos: usar email prop y buttonAction para abrir modal

  const [isOpen, setOpen] = React.useState(false);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  // Extraer información de la URL
  const getTitle = () => {
    if (title) return title;
    if (email) return "Contacto";
    if (!url) return "Enlace";
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.replace("www.", "");
      if (hostname.includes("github.com")) return "GitHub";
      if (hostname.includes("linkedin.com")) return "LinkedIn";
      if (hostname.includes("maps.google") || hostname.includes("goo.gl")) return "Google Maps";
      return hostname.split(".")[0].charAt(0).toUpperCase() + hostname.split(".")[0].slice(1);
    } catch {
      return "Enlace";
    }
  };

  const getDescription = () => {
    if (description) return description;
    if (email) return "Haz clic para abrir el formulario de contacto y enviarme un mensaje";
    if (!url) return "Haz clic para visitar";
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("github.com")) {
        const pathParts = urlObj.pathname.split("/").filter(Boolean);
        if (pathParts.length >= 2) {
          return `Repositorio: ${pathParts[0]}/${pathParts[1]}`;
        }
        return "Plataforma de desarrollo y control de versiones";
      }
      if (urlObj.hostname.includes("linkedin.com")) {
        return "Red social profesional";
      }
      if (urlObj.hostname.includes("maps.google") || urlObj.hostname.includes("goo.gl")) {
        return "Ver ubicación en Google Maps";
      }
      return urlObj.hostname.replace("www.", "");
    } catch {
      return "Haz clic para visitar el sitio";
    }
  };

  const getDomain = () => {
    if (email) return email;
    if (!url) return "";
    try {
      if (url.startsWith("mailto:")) {
        return url.replace("mailto:", "");
      }
      const urlObj = new URL(url);
      return urlObj.hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (buttonAction) {
      e.preventDefault();
      e.stopPropagation();
      buttonAction(e);
    }
  };

  return (
    <>
      {isMounted ? (
        <HoverCardPrimitive.Root
          openDelay={50}
          closeDelay={100}
          onOpenChange={(open: boolean) => {
            setOpen(open);
          }}
        >
          <HoverCardPrimitive.Trigger asChild>
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
              <button
                type="button"
                onMouseMove={handleMouseMove}
                className={cn("text-black dark:text-white", className)}
              >
                {children}
              </button>
            )}
          </HoverCardPrimitive.Trigger>

          <HoverCardPrimitive.Content
            className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
            side="top"
            align="center"
            sideOffset={10}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  className={cn(
                    "shadow-xl rounded-xl bg-white dark:bg-gray-800 p-4",
                    customPreview ? "min-w-[300px] max-w-[400px]" : "min-w-[250px] max-w-[320px]"
                  )}
                  style={{
                    x: translateX,
                  }}
                >
                  {customPreview ? (
                    customPreview
                  ) : (
                    <div className="flex flex-col gap-3">
                      {/* Título e Icono */}
                      <div className="flex items-center gap-3">
                        {icon && (
                          <div className="text-sky-600 dark:text-sky-400 shrink-0">
                            {icon}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
                            {getTitle()}
                          </h3>
                        </div>
                      </div>

                      {/* Descripción */}
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {getDescription()}
                      </p>

                      {/* URL del dominio */}
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                        <div className="flex-1 truncate">
                          {getDomain()}
                        </div>
                      </div>

                      {/* Separador */}
                      <div className="border-t border-gray-200 dark:border-gray-700"></div>

                      {/* Botón de acción */}
                      {buttonAction ? (
                        <button
                          type="button"
                          onClick={handleButtonClick}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          <span>{buttonText || "Abrir formulario"}</span>
                          {!buttonText && <ExternalLink size={14} />}
                        </button>
                      ) : url ? (
                        <a
                          href={url}
                          target={url.startsWith("mailto:") ? undefined : "_blank"}
                          rel={url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 dark:bg-sky-500 dark:hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          <span>{buttonText || "Ir al sitio"}</span>
                          <ExternalLink size={14} />
                        </a>
                      ) : null}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Root>
      ) : null}
    </>
  );
};
