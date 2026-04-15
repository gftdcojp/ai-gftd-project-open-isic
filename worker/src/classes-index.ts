// Generated from data/classes/*.json at build time. As each new class JSON is
// added under data/classes/, append an import + CLASSES entry here.
//
// Progress: 18 / 419 ISIC Rev.4 4-digit classes implemented.
// Completed groups: 011, 012, 013. Group 014 in progress (0141).

import c0111 from "../../data/classes/0111.json";
import c0112 from "../../data/classes/0112.json";
import c0113 from "../../data/classes/0113.json";
import c0114 from "../../data/classes/0114.json";
import c0115 from "../../data/classes/0115.json";
import c0116 from "../../data/classes/0116.json";
import c0119 from "../../data/classes/0119.json";
import c0121 from "../../data/classes/0121.json";
import c0122 from "../../data/classes/0122.json";
import c0123 from "../../data/classes/0123.json";
import c0124 from "../../data/classes/0124.json";
import c0125 from "../../data/classes/0125.json";
import c0126 from "../../data/classes/0126.json";
import c0127 from "../../data/classes/0127.json";
import c0128 from "../../data/classes/0128.json";
import c0129 from "../../data/classes/0129.json";
import c0130 from "../../data/classes/0130.json";
import c0141 from "../../data/classes/0141.json";
import type { IsicClass } from "./taxonomy";

export const CLASSES: Record<string, IsicClass> = {
  "0111": c0111 as IsicClass,
  "0112": c0112 as IsicClass,
  "0113": c0113 as IsicClass,
  "0114": c0114 as IsicClass,
  "0115": c0115 as IsicClass,
  "0116": c0116 as IsicClass,
  "0119": c0119 as IsicClass,
  "0121": c0121 as IsicClass,
  "0122": c0122 as IsicClass,
  "0123": c0123 as IsicClass,
  "0124": c0124 as IsicClass,
  "0125": c0125 as IsicClass,
  "0126": c0126 as IsicClass,
  "0127": c0127 as IsicClass,
  "0128": c0128 as IsicClass,
  "0129": c0129 as IsicClass,
  "0130": c0130 as IsicClass,
  "0141": c0141 as IsicClass,
};

export const IMPLEMENTED_COUNT = Object.keys(CLASSES).length;
export const TOTAL_CLASSES = 419;

export const COMPLETED_GROUPS: string[] = ["011", "012", "013"];
