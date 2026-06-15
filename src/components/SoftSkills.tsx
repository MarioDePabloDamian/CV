import {
  Brain,
  Eye,
  RefreshCw,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations/translations";
import { softSkillItems } from "../data/soft-skills";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/section-heading";

const cardBase = cn(
  "group relative overflow-hidden rounded-xl border border-gray-200/80 bg-white/70",
  "dark:border-gray-700/70 dark:bg-gray-900/40",
  "transition-[box-shadow,background-color] duration-200",
  "hover:bg-sky-50/60 hover:shadow-[0_8px_24px_-12px_rgba(14,165,233,0.3)]",
  "dark:hover:bg-sky-950/25 dark:hover:shadow-[0_8px_24px_-12px_rgba(56,189,248,0.2)]",
  "print:border-gray-300 print:bg-white print:shadow-none"
);

const skillVisuals: Record<
  (typeof softSkillItems)[number]["id"],
  {
    icon: LucideIcon;
    accent: string;
    iconWrap: string;
    iconColor: string;
  }
> = {
  learning: {
    icon: Sparkles,
    accent: "from-sky-500 to-cyan-500",
    iconWrap: "bg-sky-100 ring-sky-200/80 dark:bg-sky-950/50 dark:ring-sky-800/60",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  logic: {
    icon: Brain,
    accent: "from-indigo-500 to-violet-500",
    iconWrap: "bg-indigo-100 ring-indigo-200/80 dark:bg-indigo-950/50 dark:ring-indigo-800/60",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  detail: {
    icon: Eye,
    accent: "from-violet-500 to-purple-500",
    iconWrap: "bg-violet-100 ring-violet-200/80 dark:bg-violet-950/50 dark:ring-violet-800/60",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  adaptability: {
    icon: RefreshCw,
    accent: "from-cyan-500 to-teal-500",
    iconWrap: "bg-cyan-100 ring-cyan-200/80 dark:bg-cyan-950/50 dark:ring-cyan-800/60",
    iconColor: "text-cyan-700 dark:text-cyan-400",
  },
  teamwork: {
    icon: Users,
    accent: "from-emerald-500 to-teal-500",
    iconWrap: "bg-emerald-100 ring-emerald-200/80 dark:bg-emerald-950/50 dark:ring-emerald-800/60",
    iconColor: "text-emerald-700 dark:text-emerald-400",
  },
  results: {
    icon: Target,
    accent: "from-amber-500 to-orange-500",
    iconWrap: "bg-amber-100 ring-amber-200/80 dark:bg-amber-950/50 dark:ring-amber-800/60",
    iconColor: "text-amber-700 dark:text-amber-400",
  },
};

export default function SoftSkills() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <SectionHeading as="h3">{t.skillsSoft}</SectionHeading>
      <p className="mb-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
        {t.skillsSoftSubtitle}
      </p>
      <ul className="grid grid-cols-2 gap-2 list-none">
        {softSkillItems.map((item) => {
          const visual = skillVisuals[item.id];
          const Icon = visual.icon;
          const fullLabel = t[item.labelKey];

          return (
            <li key={item.id}>
              <article
                className={cn(cardBase, "flex h-full flex-col items-center px-2.5 py-3 text-center")}
                title={fullLabel}
              >
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-y-0 left-0 w-1 bg-gradient-to-b",
                    visual.accent
                  )}
                />
                <div
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg ring-1 transition-[ring-color] duration-200",
                    "group-hover:ring-sky-300/70 dark:group-hover:ring-sky-700/50",
                    visual.iconWrap
                  )}
                >
                  <Icon className={cn("size-4", visual.iconColor)} aria-hidden />
                </div>
                <p className="mt-2 text-[10px] font-bold leading-tight text-gray-900 dark:text-gray-100">
                  {t[item.shortKey]}
                </p>
                <p className="sr-only">{fullLabel}</p>
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
