"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export const AnimatedTooltip = ({
  name,
  designation,
  children,
}: {
  name: string;
  designation: string;
  children: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: boolean; left: number }>({ top: true, left: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  
  // Rotate the tooltip based on mouse position
  const rotate = useSpring(
    useTransform(x, [-0.5, 0.5], [-45, 45]),
    springConfig
  );
  
  // Translate the tooltip based on mouse position (reduced range)
  const translateX = useSpring(
    useTransform(x, [-0.5, 0.5], [-30, 30]),
    springConfig
  );
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  useEffect(() => {
    if (isHovered && tooltipRef.current && containerRef.current) {
      const tooltip = tooltipRef.current;
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      
      // Check if tooltip goes off top of viewport
      const goesOffTop = rect.top - tooltipRect.height - 8 < 0;
      
      // Check if tooltip goes off left/right of viewport
      const tooltipLeft = rect.left + rect.width / 2 - tooltipRect.width / 2;
      const tooltipRight = tooltipLeft + tooltipRect.width;
      const viewportWidth = window.innerWidth;
      
      let leftOffset = 0;
      if (tooltipLeft < 10) {
        leftOffset = 10 - tooltipLeft;
      } else if (tooltipRight > viewportWidth - 10) {
        leftOffset = (viewportWidth - 10) - tooltipRight;
      }
      
      setTooltipPosition({
        top: !goesOffTop,
        left: leftOffset,
      });
    }
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {isHovered && (
        <motion.div
          ref={tooltipRef}
          initial={{ opacity: 0, y: tooltipPosition.top ? 10 : -10, x: 0 }}
          animate={{
            opacity: 1,
            y: 0,
            x: tooltipPosition.left,
          }}
          exit={{ opacity: 0, y: tooltipPosition.top ? 10 : -10, x: 0 }}
          style={{
            translateX: translateX,
            rotate: rotate,
            whiteSpace: "nowrap",
          }}
          className={`absolute ${tooltipPosition.top ? '-top-12' : 'top-full mt-2'} left-1/2 -translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-black dark:bg-gray-800 z-50 shadow-xl px-4 py-2 border border-gray-700`}
        >
          <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
          <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
          <div className="font-bold text-white dark:text-gray-100 relative z-30 text-base">
            {name}
          </div>
          <div className="text-white dark:text-gray-300 text-xs">{designation}</div>
        </motion.div>
      )}
      {children}
    </div>
  );
};
