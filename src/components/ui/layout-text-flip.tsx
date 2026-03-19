"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface LayoutTextFlipProps {
  text: string;
  words: string[];
  duration?: number;
  className?: string;
}

export const LayoutTextFlip: React.FC<LayoutTextFlipProps> = ({
  text,
  words,
  duration = 3000,
  className,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  // Encontrar la palabra más larga para calcular el ancho fijo
  const maxWordLength = Math.max(...words.map(word => word.length));
  // Usar un ancho fijo basado en la palabra más larga para evitar movimiento
  const fixedWidth = `${maxWordLength * 0.7}ch`; // Aproximadamente 0.7ch por carácter

  return (
    <span className={cn("inline-block", className)}>
      {text}{" "}
      <span 
        className="relative inline-block text-left align-top"
        style={{ 
          width: fixedWidth,
          minWidth: fixedWidth,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWordIndex}
            initial={{ opacity: 0, y: 20, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: 90 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block whitespace-nowrap absolute left-0"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {words[currentWordIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
};
