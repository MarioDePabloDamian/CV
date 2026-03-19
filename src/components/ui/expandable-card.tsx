"use client";
import React, { useEffect, useId, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { HoverBorderGradient } from "./hover-border-gradient";
import { useExpandableCard } from "@/context/ExpandableCardContext";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface ExpandableCardProps {
  title: string;
  description: string | React.ReactNode;
  expandedContent?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  id?: string;
}

export const ExpandableCard: React.FC<ExpandableCardProps> = ({
  title,
  description,
  expandedContent,
  className,
  children,
  id,
}) => {
  const { expandedCardId, setExpandedCardId } = useExpandableCard();
  const cardId = id || `card-${title}`;
  const uniqueId = useId();
  const isExpanded = expandedCardId === cardId;
  const isOtherExpanded = expandedCardId !== null && expandedCardId !== cardId;
  const ref = useRef<HTMLDivElement>(null);

  // Pre-renderizar el contenido expandido solo cuando está expandido
  const preRenderedExpandedContent = useMemo(() => {
    if (!isExpanded) return null;
    return expandedContent ? (
      <div>
        {expandedContent}
      </div>
    ) : (
      <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {description}
      </div>
    );
  }, [expandedContent, description, isExpanded]);

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded) return;
    
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setExpandedCardId(null);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isExpanded, setExpandedCardId]);

  useOutsideClick(ref, () => {
    setExpandedCardId(null);
  }, isExpanded);


  const handleClick = () => {
    const selection = window.getSelection();
    const hasSelection = selection && selection.rangeCount > 0 && selection.toString().length > 0;
    
    if (hasSelection) {
      return;
    }
    
    if (!isOtherExpanded) {
      setExpandedCardId(cardId);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isExpanded && (
          <div 
            className="fixed inset-0 grid place-items-center z-[100] pointer-events-none"
          >
            <motion.div
              layoutId={`card-${cardId}-${uniqueId}`}
              ref={ref}
              data-modal-content
              layout
              transition={{ 
                layout: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
              }}
              className={cn(
                "relative w-full max-w-2xl h-full md:h-fit md:max-h-[90%] flex flex-col",
                "bg-white dark:bg-gray-950 rounded-lg overflow-hidden",
                "pointer-events-auto shadow-2xl"
              )}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b-2 border-sky-300 dark:border-sky-600 bg-white dark:bg-gray-950">
                  <motion.h2
                    layoutId={`title-${cardId}-${uniqueId}`}
                    layout="position"
                    transition={{ 
                      layout: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                      fontSize: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                      fontWeight: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
                    }}
                    className="text-gray-900 dark:text-gray-100"
                    animate={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                    }}
                    initial={{
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    {title}
                  </motion.h2>
                  <motion.button
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.05 }}
                    onClick={() => setExpandedCardId(null)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Cerrar"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </motion.button>
                </div>

                {/* Content - Usar contenido pre-renderizado */}
                <motion.div 
                  layoutId={`description-${cardId}-${uniqueId}`}
                  layout
                  transition={{ 
                    layout: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
                  }}
                  className="p-6 overflow-y-auto max-h-[calc(90vh-80px)] select-text"
                >
                  <AnimatePresence mode="wait">
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        {preRenderedExpandedContent}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        layoutId={`card-${cardId}-${uniqueId}`}
        layout
        initial={false}
        whileHover={!isOtherExpanded && !isExpanded ? { scale: 1.01 } : undefined}
        animate={{
          opacity: isExpanded ? 0 : isOtherExpanded ? 0.6 : 1,
        }}
        transition={{ 
          opacity: { duration: 0.15 },
          layout: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
        }}
        style={{
          visibility: isExpanded ? "hidden" : "visible",
        }}
      >
        <HoverBorderGradient
          as={motion.div}
          containerClassName={cn(
            "relative rounded-lg cursor-pointer",
            isOtherExpanded && "pointer-events-none",
            className
          )}
          className="p-4 overflow-hidden rounded-lg bg-white dark:bg-gray-900"
          duration={0.5}
          clockwise={true}
          onMouseUp={(e) => {
            const selection = window.getSelection();
            const hasSelection = selection && selection.rangeCount > 0 && selection.toString().length > 0;
            if (hasSelection) {
              e.stopPropagation();
            }
          }}
          onClick={handleClick}
        >
        <motion.h3
          layoutId={`title-${cardId}-${uniqueId}`}
          layout="position"
          transition={{ 
            layout: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
            fontSize: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
            fontWeight: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
          }}
          className="text-black dark:text-gray-100 pr-2 flex-1 mb-3"
          animate={{
            fontSize: isExpanded ? "1.5rem" : "1rem",
            fontWeight: isExpanded ? 700 : 600,
          }}
          initial={false}
        >
          {title}
        </motion.h3>
        
        <motion.div
          layoutId={`description-${cardId}-${uniqueId}`}
          layout
          transition={{ 
            layout: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
          }}
          className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3"
        >
          {description}
        </motion.div>

        {children && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
            {children}
            <ChevronRight className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          </div>
        )}
      </HoverBorderGradient>
      </motion.div>
    </>
  );
};
