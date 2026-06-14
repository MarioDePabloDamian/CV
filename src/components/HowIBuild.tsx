import React, { forwardRef, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { SectionHeading } from "./ui/section-heading";
import { AnimatedBeam } from "./ui/animated-beam";
import { cn } from "@/lib/utils";

const Node = forwardRef<
  HTMLDivElement,
  { className?: string; children: React.ReactNode; label: string }
>(({ className, children, label }, ref) => (
  <div className="flex flex-col items-center gap-1.5">
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border border-gray-200 bg-white p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:border-gray-700 dark:bg-gray-900 sm:size-14",
        className
      )}
    >
      {children}
    </div>
    <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400">
      {label}
    </span>
  </div>
));
Node.displayName = "Node";

const icon = (name: string, color: string) =>
  `https://cdn.simpleicons.org/${name}/${color}`;

const GroupLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mb-1 h-4 text-center text-[10px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
    {children}
  </p>
);

const HowIBuild: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const containerRef = useRef<HTMLDivElement>(null);
  const dockerRef = useRef<HTMLDivElement>(null);
  const reactRef = useRef<HTMLDivElement>(null);
  const fastapiRef = useRef<HTMLDivElement>(null);
  const nginxRef = useRef<HTMLDivElement>(null);
  const pgRef = useRef<HTMLDivElement>(null);
  const redisRef = useRef<HTMLDivElement>(null);
  const n8nRef = useRef<HTMLDivElement>(null);
  const keycloakRef = useRef<HTMLDivElement>(null);
  const rustRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <SectionHeading as="h3" animated={false}>
        {t.howIBuildTitle}
      </SectionHeading>

      <div
        ref={containerRef}
        className="relative mt-4 flex h-[250px] w-full items-stretch justify-between px-1 sm:px-4"
      >
        {/* Casi siempre (rejilla 2x2) */}
        <div className="flex flex-col">
          <GroupLabel>{t.howIBuildAlways}</GroupLabel>
          <div className="flex flex-1 items-center">
            <div className="grid grid-cols-2 gap-x-5 gap-y-6 sm:gap-x-7">
              <Node ref={reactRef} label="React">
                <img src={icon("react", "61DAFB")} alt="" className="size-full" />
              </Node>
              <Node ref={nginxRef} label="Nginx">
                <img src={icon("nginx", "009639")} alt="" className="size-full" />
              </Node>
              <Node ref={fastapiRef} label="FastAPI">
                <img
                  src={icon("fastapi", "009688")}
                  alt=""
                  className="size-full"
                />
              </Node>
              <Node ref={pgRef} label="PostgreSQL">
                <img
                  src={icon("postgresql", "4169E1")}
                  alt=""
                  className="size-full"
                />
              </Node>
            </div>
          </div>
        </div>

        {/* Docker en el centro: todo corre aquí */}
        <div className="flex flex-col">
          <GroupLabel>&nbsp;</GroupLabel>
          <div className="flex flex-1 items-center justify-center">
            <Node
              ref={dockerRef}
              label="Docker"
              className="size-16 border-sky-300 ring-4 ring-sky-100 dark:border-sky-700 dark:ring-sky-900/40 sm:size-[4.5rem]"
            >
              <img src={icon("docker", "2496ED")} alt="" className="size-full" />
            </Node>
          </div>
        </div>

        {/* Según el proyecto (rejilla 2x2) */}
        <div className="flex flex-col">
          <GroupLabel>{t.howIBuildDepends}</GroupLabel>
          <div className="flex flex-1 items-center">
            <div className="grid grid-cols-2 gap-x-5 gap-y-6 sm:gap-x-7">
              <Node ref={redisRef} label="Redis">
                <img src={icon("redis", "FF4438")} alt="" className="size-full" />
              </Node>
              <Node ref={keycloakRef} label="Keycloak">
                <img src={icon("keycloak", "4D4D4D")} alt="" className="size-full" />
              </Node>
              <Node ref={n8nRef} label="n8n">
                <img src={icon("n8n", "EA4B71")} alt="" className="size-full" />
              </Node>
              <Node ref={rustRef} label="Rust">
                <img src={icon("rust", "DEA584")} alt="" className="size-full" />
              </Node>
            </div>
          </div>
        </div>

        {/* Casi siempre → Docker */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={reactRef}
          toRef={dockerRef}
          curvature={-45}
          endYOffset={-10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={nginxRef}
          toRef={dockerRef}
          curvature={-25}
          endYOffset={-6}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={fastapiRef}
          toRef={dockerRef}
          curvature={45}
          endYOffset={10}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={pgRef}
          toRef={dockerRef}
          curvature={25}
          endYOffset={6}
        />

        {/* Según el proyecto → Docker */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={redisRef}
          toRef={dockerRef}
          curvature={-25}
          endYOffset={-6}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={keycloakRef}
          toRef={dockerRef}
          curvature={-45}
          endYOffset={-10}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={n8nRef}
          toRef={dockerRef}
          curvature={25}
          endYOffset={6}
          reverse
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={rustRef}
          toRef={dockerRef}
          curvature={45}
          endYOffset={10}
          reverse
        />
      </div>

      <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
        {t.howIBuildCaption}
      </p>
    </div>
  );
};

export default HowIBuild;
