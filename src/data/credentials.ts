import type { TranslationKeys } from "../translations/translations";

export type CertCategory = "dev" | "observability" | "language" | "erp";

export interface CertificationItem {
  id: string;
  shortKey: keyof TranslationKeys;
  valueKey: keyof TranslationKeys;
  categoryKey: keyof TranslationKeys;
  accent: string;
}

export const certifications: CertificationItem[] = [
  {
    id: "elastic",
    shortKey: "certElasticShort",
    valueKey: "certElasticValue",
    categoryKey: "certCategoryObservability",
    accent: "from-amber-500 to-yellow-600",
  },
  {
    id: "react",
    shortKey: "certReactShort",
    valueKey: "certReactValue",
    categoryKey: "certCategoryDev",
    accent: "from-sky-500 to-cyan-500",
  },
  {
    id: "fastapi",
    shortKey: "certFastAPIShort",
    valueKey: "certFastAPIValue",
    categoryKey: "certCategoryDev",
    accent: "from-emerald-500 to-teal-600",
  },
  {
    id: "cambridge",
    shortKey: "certCambridgeShort",
    valueKey: "certCambridgeValue",
    categoryKey: "certCategoryLanguage",
    accent: "from-indigo-500 to-violet-600",
  },
  {
    id: "odoo",
    shortKey: "certOdooShort",
    valueKey: "certOdooValue",
    categoryKey: "certCategoryErp",
    accent: "from-violet-500 to-purple-600",
  },
];

export const educationHighlights: (keyof TranslationKeys)[] = [
  "educationHighlight1",
  "educationHighlight2",
  "educationHighlight3",
];
