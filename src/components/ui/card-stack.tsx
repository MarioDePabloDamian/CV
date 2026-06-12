"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronRight, X, Briefcase } from "lucide-react";
import { HoverBorderGradient } from "./hover-border-gradient";
import { OrbitingCircles } from "./orbiting-circles";
import { useExpandableCard } from "@/context/ExpandableCardContext";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations/translations";
import { useOutsideClick } from "@/hooks/use-outside-click";

const ORBIT_CARD_WIDTH = 260;
const ORBIT_RADIUS = 220;
const ORBIT_CARD_HALF = ORBIT_CARD_WIDTH / 2;

function OrbitProjectCard({
  card,
  className,
}: {
  card: {
    name: string;
    designation?: string;
    description: React.ReactNode;
    expandedContent?: React.ReactNode;
  };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-[260px]",
        "bg-white dark:bg-gray-950 rounded-lg shadow-2xl",
        "p-4 md:p-5 border-2 border-sky-300 dark:border-sky-600",
        "pointer-events-auto",
        className
      )}
    >
      <h2 className="text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 leading-snug">
        {card.name}
      </h2>
      {card.designation && (
        <p className="text-xs text-sky-600 dark:text-sky-400 font-medium mb-3">
          {card.designation}
        </p>
      )}
      <div className="overflow-y-auto max-h-[180px] text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        {card.expandedContent || card.description}
      </div>
    </div>
  );
}

export const CardStack = ({
  items,
  offset = 10,
  scaleFactor = 0.06,
  className,
}: {
  items: {
    id: number;
    name: string;
    designation?: string;
    description: React.ReactNode;
    expandedContent?: React.ReactNode;
  }[];
  offset?: number;
  scaleFactor?: number;
  className?: string;
}) => {
  const CARD_OFFSET = offset;
  const SCALE_FACTOR = scaleFactor;
  const [cards, setCards] = useState(items);
  const { expandedCardId, setExpandedCardId } = useExpandableCard();
  const { language } = useLanguage();
  const t = translations[language];
  const cardId = `card-stack-${items[0]?.id || 'default'}`;
  const isExpanded = expandedCardId === cardId;
  const isOtherExpanded = expandedCardId !== null && expandedCardId !== cardId;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExpanded) {
      const interval = setInterval(() => {
        setCards((prev) => {
          const newArray = [...prev];
          newArray.unshift(newArray.pop()!);
          return newArray;
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isExpanded]);

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
            className="fixed inset-0 grid place-items-center z-[100] pointer-events-none p-4"
          >
            <motion.div
              ref={ref}
              data-modal-content
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className={cn(
                "relative w-full max-w-[95vw] h-[90vh] md:h-[85vh] flex flex-col",
                "bg-transparent pointer-events-auto"
              )}
            >
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setExpandedCardId(null)}
                className="absolute top-0 right-0 z-50 p-2.5 rounded-full bg-white/90 dark:bg-gray-900/90 shadow-lg border border-sky-200 dark:border-sky-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.button>

              {/* Móvil: tarjetas apiladas con hub central */}
              <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 md:hidden overflow-y-auto py-12 px-2">
                <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 shadow-lg shadow-sky-500/30 border-4 border-white dark:border-gray-900 shrink-0">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                {items.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                  >
                    <OrbitProjectCard card={card} />
                  </motion.div>
                ))}
              </div>

              {/* Desktop: tarjetas sobre la órbita */}
              <div className="relative w-full h-full hidden md:flex items-center justify-center orbit-cards group">
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    width: (ORBIT_RADIUS + ORBIT_CARD_HALF + 24) * 2,
                    height: (ORBIT_RADIUS + ORBIT_CARD_HALF + 24) * 2,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute left-1/2 top-1/2 z-40 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 shadow-xl shadow-sky-500/40 border-4 border-white dark:border-gray-900 ring-4 ring-sky-200/50 dark:ring-sky-800/50"
                  >
                    <Briefcase className="w-7 h-7 text-white" />
                    <span className="sr-only">Proyectos relacionados</span>
                  </motion.div>

                  <OrbitingCircles
                    radius={ORBIT_RADIUS}
                    itemHalfSize={ORBIT_CARD_HALF}
                    containerPadding={24}
                    duration={60}
                    speed={0.35}
                    path
                    pathClassName="stroke-sky-400/50 dark:stroke-sky-500/40"
                    className="[animation-play-state:paused] group-hover:[animation-play-state:running] motion-reduce:[animation-play-state:paused]"
                  >
                    {items.map((card, index) => (
                      <motion.div
                        key={card.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, delay: 0.1 + index * 0.08 }}
                      >
                        <OrbitProjectCard card={card} />
                      </motion.div>
                    ))}
                  </OrbitingCircles>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          opacity: isExpanded ? 0 : isOtherExpanded ? 0.6 : 1,
        }}
        transition={{ 
          opacity: { duration: 0.15 },
        }}
        style={{
          visibility: isExpanded ? "hidden" : "visible",
        }}
      >
        <div className={cn("relative w-full", className)} style={{ minHeight: `${180 + (cards.length - 1) * CARD_OFFSET}px` }}>
          {cards.map((card, index) => {
            return (
              <motion.div
                key={card.id}
                className="absolute w-full"
                style={{
                  transformOrigin: "top center",
                }}
                animate={{
                  top: index * -CARD_OFFSET,
                  scale: 1 - index * SCALE_FACTOR,
                  zIndex: cards.length - index,
                }}
              >
                <HoverBorderGradient
                  as={motion.div}
                  containerClassName={cn(
                    "relative rounded-lg cursor-pointer",
                    isOtherExpanded && "pointer-events-none"
                  )}
                  className="p-4 overflow-hidden rounded-lg bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300"
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
                  <h3 className="text-black dark:text-gray-100 pr-2 flex-1 mb-3 text-base font-semibold">
                    {card.name}
                  </h3>
                  
                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                    {card.description}
                  </div>

                  {card.designation && (
                    <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {card.designation}
                      </p>
                    </div>
                  )}

                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
                    <span className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                      {t.viewDetails}
                    </span>
                    <ChevronRight className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  </div>
                </HoverBorderGradient>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};
