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
import {
  portfolioChip,
  portfolioChipIcon,
  portfolioSubtitle,
} from "@/lib/portfolio-sidebar";
import { SectionHeading } from "./ui/section-heading";

const skillIcons: Record<(typeof softSkillItems)[number]["id"], LucideIcon> = {
  learning: Sparkles,
  logic: Brain,
  detail: Eye,
  adaptability: RefreshCw,
  teamwork: Users,
  results: Target,
};

export default function SoftSkills() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div>
      <SectionHeading as="h3">{t.skillsSoft}</SectionHeading>
      <p className={portfolioSubtitle}>{t.skillsSoftSubtitle}</p>
      <ul className="flex flex-wrap gap-2 list-none">
        {softSkillItems.map((item) => {
          const Icon = skillIcons[item.id];
          const fullLabel = t[item.labelKey];

          return (
            <li key={item.id}>
              <span className={portfolioChip} title={fullLabel}>
                <span className={cn(portfolioChipIcon, "size-6")} aria-hidden>
                  <Icon className="size-3" />
                </span>
                {t[item.shortKey]}
                <span className="sr-only"> — {fullLabel}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
