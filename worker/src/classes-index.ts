// Generated from data/classes/*.json at build time. As each new class JSON is
// added under data/classes/, append an import + CLASSES entry here.
//
// Progress: 30 / 419 ISIC Rev.4 4-digit classes implemented.
// Completed groups: 011, 012, 013, 014, 015, 016, 017. Division 01 complete.

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
import c0142 from "../../data/classes/0142.json";
import c0143 from "../../data/classes/0143.json";
import c0144 from "../../data/classes/0144.json";
import c0145 from "../../data/classes/0145.json";
import c0146 from "../../data/classes/0146.json";
import c0149 from "../../data/classes/0149.json";
import c0150 from "../../data/classes/0150.json";
import c0161 from "../../data/classes/0161.json";
import c0162 from "../../data/classes/0162.json";
import c0163 from "../../data/classes/0163.json";
import c0164 from "../../data/classes/0164.json";
import c0170 from "../../data/classes/0170.json";
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
  "0142": c0142 as IsicClass,
  "0143": c0143 as IsicClass,
  "0144": c0144 as IsicClass,
  "0145": c0145 as IsicClass,
  "0146": c0146 as IsicClass,
  "0149": c0149 as IsicClass,
  "0150": c0150 as IsicClass,
  "0161": c0161 as IsicClass,
  "0162": c0162 as IsicClass,
  "0163": c0163 as IsicClass,
  "0164": c0164 as IsicClass,
  "0170": c0170 as IsicClass,
};

export const IMPLEMENTED_COUNT = Object.keys(CLASSES).length;
export const TOTAL_CLASSES = 419;

export const COMPLETED_GROUPS: string[] = ["011", "012", "013", "014", "015", "016", "017"];
