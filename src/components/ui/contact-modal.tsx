"use client";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations/translations";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isPreview?: boolean; // Si es true, el modal es solo visual (no interactuable)
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  isPreview = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (isOpen && !isPreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isPreview]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen && !isPreview) {
        onClose();
      }
    }
    if (isOpen && !isPreview) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose, isPreview]);

  useOutsideClick(modalRef, () => {
    if (isOpen && !isPreview) {
      onClose();
    }
  }, isOpen && !isPreview);

  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          {!isPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 dark:bg-black/70 z-[100] backdrop-blur-sm"
              onClick={onClose}
            />
          )}

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "relative w-full max-w-2xl max-h-[90vh]",
                "bg-white dark:bg-gray-950 rounded-lg shadow-2xl",
                "overflow-hidden flex flex-col",
                isPreview ? "pointer-events-none" : "pointer-events-auto"
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b-2 border-sky-300 dark:border-sky-600 bg-white dark:bg-gray-950">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {title}
                </h2>
                {!isPreview && (
                  <button
                    onClick={onClose}
                    className={cn(
                      "p-2 rounded-lg",
                      "hover:bg-gray-100 dark:hover:bg-gray-800",
                      "transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                    )}
                    aria-label={t.closeModal}
                  >
                    <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                )}
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto flex-1">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};
