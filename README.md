# ai-gftd-project-open-isic

> **UN ISIC Rev.4 industrial classification** as a DID-addressed open taxonomy on Cloudflare Workers.
> Implemented **one 4-digit class at a time** — a `/loop` cron (10-min) appends one PR per iteration.

[![License: Apache 2.0](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](./LICENSE)
[![Status: Incremental MVP](https://img.shields.io/badge/status-incremental--MVP-orange.svg)]()

## Progress

Each 4-digit class is a JSON file in `data/classes/{code}.json` + one line in `worker/src/classes-index.ts`. Total = **419 classes**. Current count & completed groups are the single source of truth in `classes-index.ts` (`IMPLEMENTED_COUNT`, `COMPLETED_GROUPS`).

At cold start: `GET https://open-isic.gftd.ai/_app/meta` returns live progress.

## API (3 XRPC methods)

`GET /xrpc/{NSID}`, NSID prefix `ai.gftd.apps.openIsic.*`

| NSID | Description |
|---|---|
| `listSections`  | 21 ISIC Rev.4 sections (A–U) |
| `listClasses`   | 4-digit classes, filterable by `section` / `division` / `group`, paginated |
| `getClass`      | single class with description, includes[], excludes[], taxonomy ancestors |

Full schemas: [`lexicons/ai/gftd/apps/openIsic/`](./lexicons/ai/gftd/apps/openIsic).

### Example

```bash
curl 'https://open-isic.gftd.ai/xrpc/ai.gftd.apps.openIsic.getClass?code=0111'
# → { code, did:"did:web:open-isic.gftd.ai:class:0111",
#     nameEn, section:"A", division:"01", group:"011", description, includes, excludes, ... }
```

## DID pattern

```
did:web:open-isic.gftd.ai:{section|division|group|class}:{code}

# examples
did:web:open-isic.gftd.ai:section:A       # Agriculture, forestry and fishing
did:web:open-isic.gftd.ai:division:01     # Crop and animal production, hunting
did:web:open-isic.gftd.ai:group:011       # Growing of non-perennial crops
did:web:open-isic.gftd.ai:class:0111      # Growing of cereals (except rice), leguminous crops, oil seeds
```

## Class-by-class contribution

1. Copy a missing class from [UN ISIC Rev.4](https://unstats.un.org/unsd/classifications/Econ/isic) into `data/classes/{code}.json` (schema: `code`, `nameEn`, `group`, `description`, `includes[]`, `excludes[]`, `implementedAt`).
2. In `worker/src/classes-index.ts`: add one `import cNNNN from "../../data/classes/NNNN.json"` + one entry `"NNNN": cNNNN as IsicClass`. Bump the `Progress:` comment.
3. If the class's group or division is new, append it to `worker/src/taxonomy.ts` `GROUPS` / `DIVISIONS`.
4. PR title: `feat(isic): class NNNN — <name>`.

Parallel work is fine — the index is append-only; merge conflicts resolve with a 3-way merge of alphabetical entries.

## Upstream / disclaimer

- Source: [UN Statistics Division — ISIC Rev.4 (2008)](https://unstats.un.org/unsd/classifications/Econ/isic), public domain.
- **Unofficial mirror.** Not affiliated with the UN.

## Running Locally

```bash
git clone https://github.com/gftdcojp/ai-gftd-project-open-isic
cd ai-gftd-project-open-isic/worker
npm i -g wrangler
wrangler dev --local
```

## License

[Apache License 2.0](./LICENSE). Copyright © 2026 gftd.co.jp.
