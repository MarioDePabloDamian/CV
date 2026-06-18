import type { TranslationKeys } from "../translations/translations";

export type CertCategory = "dev" | "observability" | "language" | "erp";

export interface CertificationItem {
  id: string;
  shortKey: keyof TranslationKeys;
  valueKey: keyof TranslationKeys;
  categoryKey: keyof TranslationKeys;
}

export const certifications: CertificationItem[] = [
  {
    id: "elastic",
    shortKey: "certElasticShort",
    valueKey: "certElasticValue",
    categoryKey: "certCategoryObservability",
  },
  {
    id: "react",
    shortKey: "certReactShort",
    valueKey: "certReactValue",
    categoryKey: "certCategoryDev",
  },
  {
    id: "fastapi",
    shortKey: "certFastAPIShort",
    valueKey: "certFastAPIValue",
    categoryKey: "certCategoryDev",
  },
  {
    id: "cambridge",
    shortKey: "certCambridgeShort",
    valueKey: "certCambridgeValue",
    categoryKey: "certCategoryLanguage",
  },
  {
    id: "odoo",
    shortKey: "certOdooShort",
    valueKey: "certOdooValue",
    categoryKey: "certCategoryErp",
  },
];

export const educationHighlights: (keyof TranslationKeys)[] = [
  "educationHighlight1",
  "educationHighlight2",
  "educationHighlight3",
];
