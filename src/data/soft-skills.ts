import type { TranslationKeys } from "../translations/translations";

export interface SoftSkillItem {
  id: string;
  labelKey: keyof TranslationKeys;
  shortKey:
    | "skill1Short"
    | "skill2Short"
    | "skill3Short"
    | "skill4Short"
    | "skill5Short"
    | "skill6Short";
}

export const softSkillItems: SoftSkillItem[] = [
  { id: "learning", labelKey: "skill1", shortKey: "skill1Short" },
  { id: "logic", labelKey: "skill2", shortKey: "skill2Short" },
  { id: "detail", labelKey: "skill3", shortKey: "skill3Short" },
  { id: "adaptability", labelKey: "skill4", shortKey: "skill4Short" },
  { id: "teamwork", labelKey: "skill5", shortKey: "skill5Short" },
  { id: "results", labelKey: "skill6", shortKey: "skill6Short" },
];
