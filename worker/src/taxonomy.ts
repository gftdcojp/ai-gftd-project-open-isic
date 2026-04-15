// ISIC Rev.4 taxonomy skeleton (sections + divisions + groups).
// Class entries are loaded separately from data/classes/*.json so we can
// implement them one-by-one (per cron iteration) without touching this file.
//
// Source: United Nations Statistics Division — ISIC Rev.4 (2008), public domain.

export const APP_DID = "did:web:open-isic.gftd.ai";

export interface Section   { code: string; nameEn: string; divisionRange: string; }
export interface Division  { code: string; nameEn: string; section: string; }
export interface Group     { code: string; nameEn: string; division: string; }
export interface IsicClass {
  code: string;
  nameEn: string;
  group: string;
  description?: string;
  includes?: string[];
  excludes?: string[];
  implementedAt?: string;
}

export const SECTIONS: Section[] = [
  { code: "A", nameEn: "Agriculture, forestry and fishing", divisionRange: "01-03" },
  { code: "B", nameEn: "Mining and quarrying", divisionRange: "05-09" },
  { code: "C", nameEn: "Manufacturing", divisionRange: "10-33" },
  { code: "D", nameEn: "Electricity, gas, steam and air conditioning supply", divisionRange: "35" },
  { code: "E", nameEn: "Water supply; sewerage, waste management and remediation activities", divisionRange: "36-39" },
  { code: "F", nameEn: "Construction", divisionRange: "41-43" },
  { code: "G", nameEn: "Wholesale and retail trade; repair of motor vehicles and motorcycles", divisionRange: "45-47" },
  { code: "H", nameEn: "Transportation and storage", divisionRange: "49-53" },
  { code: "I", nameEn: "Accommodation and food service activities", divisionRange: "55-56" },
  { code: "J", nameEn: "Information and communication", divisionRange: "58-63" },
  { code: "K", nameEn: "Financial and insurance activities", divisionRange: "64-66" },
  { code: "L", nameEn: "Real estate activities", divisionRange: "68" },
  { code: "M", nameEn: "Professional, scientific and technical activities", divisionRange: "69-75" },
  { code: "N", nameEn: "Administrative and support service activities", divisionRange: "77-82" },
  { code: "O", nameEn: "Public administration and defence; compulsory social security", divisionRange: "84" },
  { code: "P", nameEn: "Education", divisionRange: "85" },
  { code: "Q", nameEn: "Human health and social work activities", divisionRange: "86-88" },
  { code: "R", nameEn: "Arts, entertainment and recreation", divisionRange: "90-93" },
  { code: "S", nameEn: "Other service activities", divisionRange: "94-96" },
  { code: "T", nameEn: "Activities of households as employers; undifferentiated goods- and services-producing activities of households for own use", divisionRange: "97-98" },
  { code: "U", nameEn: "Activities of extraterritorial organizations and bodies", divisionRange: "99" },
];

// Divisions and groups are populated incrementally as classes are implemented,
// because a class cannot exist without its ancestor group/division/section.
// Each class entry carries its own group code; divisionOf(group)/sectionOf(division)
// resolves ancestors.

export const DIVISIONS: Division[] = [
  { code: "01", nameEn: "Crop and animal production, hunting and related service activities", section: "A" },
];

export const GROUPS: Group[] = [
  { code: "011", nameEn: "Growing of non-perennial crops", division: "01" },
  { code: "012", nameEn: "Growing of perennial crops", division: "01" },
  { code: "013", nameEn: "Plant propagation", division: "01" },
  { code: "014", nameEn: "Animal production", division: "01" },
];

export function didForSection(code: string)  { return `${APP_DID}:section:${code}`; }
export function didForDivision(code: string) { return `${APP_DID}:division:${code}`; }
export function didForGroup(code: string)    { return `${APP_DID}:group:${code}`; }
export function didForClass(code: string)    { return `${APP_DID}:class:${code}`; }

export function divisionOf(groupCode: string): string  { return groupCode.slice(0, 2); }
export function groupOf(classCode: string): string     { return classCode.slice(0, 3); }
export function sectionOf(divisionCode: string): string {
  const d = DIVISIONS.find((x) => x.code === divisionCode);
  return d?.section ?? "";
}
