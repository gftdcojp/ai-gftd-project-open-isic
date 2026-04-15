// ai-gftd-project-open-isic — ISIC Rev.4 open taxonomy
//
// 3 XRPC methods under ai.gftd.apps.openIsic.*:
//   listSections  (query) — 21 top-level sections A–U
//   listClasses   (query) — 4-digit classes (filterable by section/division/group)
//   getClass      (query) — one class with full description + includes/excludes
//
// 4-digit classes are loaded from data/classes/*.json. Each class is added
// one-at-a-time by PR (one per 10-min iteration).
//
// DID pattern:
//   did:web:open-isic.gftd.ai:{section|division|group|class}:{code}

import {
  SECTIONS, DIVISIONS, GROUPS,
  didForSection, didForDivision, didForGroup, didForClass,
  divisionOf, groupOf, sectionOf,
} from "./taxonomy";
import { CLASSES, IMPLEMENTED_COUNT, TOTAL_CLASSES } from "./classes-index";

export interface Env {
  PDS?: Fetcher;
  APP_HANDLE: string;
  PRIMARY_DID: string;
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}
const err = (error: string, message: string, status = 400) => json({ error, message }, status);

function listSections(): Response {
  return json({
    sections: SECTIONS.map((s) => ({ ...s, did: didForSection(s.code) })),
  });
}

function listClasses(params: URLSearchParams): Response {
  const section = params.get("section");
  const division = params.get("division");
  const group = params.get("group");
  const limit = Math.min(500, Math.max(1, Number(params.get("limit") ?? 50)));
  const offset = Math.max(0, Number(params.get("offset") ?? 0));

  const all = Object.values(CLASSES)
    .map((c) => {
      const div = divisionOf(c.group);
      const sec = sectionOf(div);
      return {
        code: c.code,
        did: didForClass(c.code),
        nameEn: c.nameEn,
        section: sec,
        division: div,
        group: c.group,
      };
    })
    .filter((c) => (!section || c.section === section)
                && (!division || c.division === division)
                && (!group || c.group === group));

  return json({
    classes: all.slice(offset, offset + limit),
    total: all.length,
    offset,
    limit,
  });
}

function getClass(params: URLSearchParams): Response {
  const code = params.get("code");
  if (!code) return err("InvalidRequest", "code required");
  const c = CLASSES[code];
  if (!c) return err("NotFound", `class ${code} not yet implemented (${IMPLEMENTED_COUNT}/${TOTAL_CLASSES})`, 404);
  const division = divisionOf(c.group);
  const section = sectionOf(division);
  const sectionEntry  = SECTIONS.find((s) => s.code === section);
  const divisionEntry = DIVISIONS.find((d) => d.code === division);
  const groupEntry    = GROUPS.find((g) => g.code === c.group);
  return json({
    code: c.code,
    did: didForClass(c.code),
    nameEn: c.nameEn,
    section,
    sectionNameEn:  sectionEntry?.nameEn  ?? "",
    division,
    divisionNameEn: divisionEntry?.nameEn ?? "",
    group: c.group,
    groupNameEn:    groupEntry?.nameEn    ?? "",
    description: c.description,
    includes: c.includes ?? [],
    excludes: c.excludes ?? [],
    isicVersion: "Rev.4",
    implementedAt: c.implementedAt,
  });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    try {
      const url = new URL(req.url);
      if (url.pathname === "/health" || url.pathname === "/_worker/health") {
        return json({ ok: true, did: env.PRIMARY_DID, progress: `${IMPLEMENTED_COUNT}/${TOTAL_CLASSES}` });
      }
      if (url.pathname === "/_app/meta") {
        return json({
          did: env.PRIMARY_DID,
          handle: env.APP_HANDLE,
          xrpc: [
            "ai.gftd.apps.openIsic.listSections",
            "ai.gftd.apps.openIsic.listClasses",
            "ai.gftd.apps.openIsic.getClass",
          ],
          isicVersion: "Rev.4",
          sections: SECTIONS.length,
          classesImplemented: IMPLEMENTED_COUNT,
          classesTotal: TOTAL_CLASSES,
        });
      }

      if (!url.pathname.startsWith("/xrpc/")) return err("InvalidRequest", "only /xrpc/*", 404);
      const nsid = url.pathname.slice("/xrpc/".length);
      if (req.method !== "GET") return err("InvalidRequest", "GET only", 405);
      switch (nsid) {
        case "ai.gftd.apps.openIsic.listSections": return listSections();
        case "ai.gftd.apps.openIsic.listClasses":  return listClasses(url.searchParams);
        case "ai.gftd.apps.openIsic.getClass":     return getClass(url.searchParams);
        default: return err("InvalidRequest", `unknown NSID: ${nsid}`, 404);
      }
    } catch (e: any) {
      return err("InternalError", e?.message ?? String(e), 500);
    }
  },
};
