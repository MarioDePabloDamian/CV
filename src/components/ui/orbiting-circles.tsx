import React from "react";

import { cn } from "@/lib/utils";

export interface OrbitingCirclesProps {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  speed?: number;
  itemClassName?: string;
  pathClassName?: string;
  animate?: boolean;
  /** Mitad del tamaño del ítem en px, para calcular el viewBox del SVG */
  itemHalfSize?: number;
  containerPadding?: number;
}

function orbitTransform(angle: number, radius: number): string {
  return `rotate(${angle}deg) translateY(${radius}px) rotate(${-angle}deg)`;
}

function orbitPoint(
  center: number,
  angle: number,
  radius: number
): { x: number; y: number } {
  const rad = (angle * Math.PI) / 180;
  return {
    x: center + Math.sin(rad) * radius,
    y: center + Math.cos(rad) * radius,
  };
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  speed = 1,
  itemClassName,
  pathClassName,
  animate = true,
  itemHalfSize = 130,
  containerPadding = 24,
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  const childCount = React.Children.count(children);
  const containerSize = (radius + itemHalfSize + containerPadding) * 2;
  const center = containerSize / 2;

  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: containerSize, height: containerSize }}
    >
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${containerSize} ${containerSize}`}
          className="pointer-events-none absolute inset-0 size-full"
          aria-hidden
        >
          <circle
            className={cn(
              "stroke-sky-300/60 stroke-1 dark:stroke-sky-500/40",
              pathClassName
            )}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
          />
          {Array.from({ length: childCount }).map((_, index) => {
            const angle = (360 / childCount) * index;
            const point = orbitPoint(center, angle, radius);
            return (
              <g key={index}>
                <line
                  x1={center}
                  y1={center}
                  x2={point.x}
                  y2={point.y}
                  className="stroke-sky-300/40 dark:stroke-sky-600/40"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="4"
                  className="fill-sky-400 dark:fill-sky-500"
                />
              </g>
            );
          })}
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / childCount) * index;
        return (
          <div key={index} className="absolute left-1/2 top-1/2 size-0">
            <div
              style={
                {
                  "--angle": angle,
                  "--radius": radius,
                  transform: orbitTransform(angle, radius),
                  ...(animate
                    ? {
                        animation: `orbit ${calculatedDuration}s linear infinite${
                          reverse ? " reverse" : ""
                        }`,
                      }
                    : {}),
                } as React.CSSProperties
              }
              className={cn(
                "absolute left-0 top-0 size-0 origin-center will-change-transform",
                className
              )}
            >
              <div
                className={cn(
                  "absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2",
                  itemClassName
                )}
              >
                {child}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
