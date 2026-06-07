# ROADMAP.md — shadcn-preset Boilerplate

## Milestone v1.0 — Production-Ready Boilerplate
Status: COMPLETE ✓
Completed: 2026-06-07

---

## Phase 01 — Boilerplate Setup
Status: COMPLETE ✓
Priority: 1
Completed: 2026-06-07

### Description
Setup seluruh struktur monorepo dari nol — root config, shared packages, frontend app, backend app, database layer, dan deployment config. Output adalah repo yang bisa langsung di-clone dan digunakan.

### Plans

| Plan | Name | Depends On | Status |
|------|------|------------|--------|
| 01-01 | Monorepo Foundation + Shared Config | — | ✓ COMPLETE |
| 01-02 | Frontend App (apps/web) | 01-01 | ✓ COMPLETE |
| 01-03 | UI Package (packages/ui) + Dark Mode | 01-01 | ✓ COMPLETE |
| 01-04 | Database Package (packages/db) | 01-01 | ✓ COMPLETE |
| 01-05 | API App (apps/api) | 01-01 | ✓ COMPLETE |
| 01-06 | Integration + Vercel Config + README | 01-02, 01-03, 01-04, 01-05 | ✓ COMPLETE |

### Deliverables
- ✓ Monorepo Turborepo berjalan
- ✓ `apps/web` dengan React + Vite + TanStack Router + TanStack Query + Zustand
- ✓ `apps/api` dengan Hono.js siap deploy ke Vercel Functions
- ✓ `packages/ui` dengan shadcn/ui preset + dark mode
- ✓ `packages/db` dengan Drizzle + Neon + contoh schema minimal
- ✓ `packages/env` dengan T3 Env + Zod
- ✓ `packages/config` dengan shared ESLint, Prettier, TypeScript
- ✓ `vercel.json`, `.env.example`, `README.md`

---

## Phase 02 — UI Components
Status: COMPLETE ✓
Priority: 2
Completed: 2026-06-07

### Description
Melengkapi packages/ui dengan 18 shadcn/ui components esensial (preset radix-mira + hugeicons) sehingga developer yang clone template bisa langsung menggunakan komponen tanpa setup tambahan. Font (Inter) dan theme sudah dikonfigurasi di Phase 01.

### Plans

| Plan | Name | Depends On | Status |
|------|------|------------|--------|
| 02-01 | Install & Export Core Components | 01-03 | ✓ COMPLETE |

### Deliverables
- ✓ 18 komponen shadcn terinstall di packages/ui/src/components/ui/
- ✓ react-hook-form + @hookform/resolvers tersedia untuk komponen form
- ✓ packages/ui/src/index.ts mengeksport semua komponen
- ✓ tsc --noEmit lulus tanpa error

---

## Milestone v1.1 — UI Restyle
Status: COMPLETE ✓
Completed: 2026-06-07

---

## Phase 03 — UI Preset Migration
Status: COMPLETE ✓
Priority: 1
Completed: 2026-06-07

### Description
Migrasi seluruh packages/ui dari preset `b6GMOwxQW` (radix-mira + hugeicons) ke preset baru `b1FjRZntw` menggunakan `npx shadcn@latest apply --preset b1FjRZntw`. Meliputi update theme (CSS variables), font, style komponen, dan penyesuaian export di src/index.ts.

### Plans

| Plan | Name | Depends On | Status |
|------|------|------------|--------|
| 03-01 | Apply Preset b1FjRZntw + Reconcile | — | ✓ COMPLETE |

### Deliverables
- ✓ Preset b1FjRZntw diterapkan ke packages/ui (style: radix-vega)
- ✓ styles.css diupdate dengan theme variables baru (oklch blue primary)
- ✓ Font tetap Inter Variable — preset tidak mengubah font
- ✓ 14/18 komponen diupdate (3 identik, 1 manual/form.tsx)
- ✓ src/index.ts tetap valid — semua exports masih berfungsi
- ✓ tsc --noEmit lulus tanpa error
- ✓ components.json diupdate dengan style radix-vega

---

## Milestone v1.2 — Developer Experience
Status: COMPLETE ✓
Completed: 2026-06-07

---

## Phase 04 — Component Reference Docs
Status: COMPLETE ✓
Priority: 1
Completed: 2026-06-07

### Description
Buat docs/COMPONENTS.md sebagai referensi lengkap untuk developer yang menggunakan template ini. Berisi: komponen yang sudah included, komponen tambahan yang bisa ditambah (shadcn catalog), page blocks yang tersedia, dan cara install di monorepo (workaround yang ditemukan di Phase 03).

### Plans

| Plan | Name | Depends On | Status |
|------|------|------------|--------|
| 04-01 | Create Component Reference Doc | 03-01 | ✓ COMPLETE |

### Deliverables
- ✓ docs/COMPONENTS.md menjelaskan 18 komponen yang sudah included
- ✓ Daftar 29 komponen shadcn tambahan + perintah install + monorepo workaround
- ✓ Daftar page blocks tersedia (dashboard-01, login-02, signup-02, sidebar-07)
- ✓ Instruksi install komponen di monorepo (workaround packages/ui)

---

## Milestone v1.3 — PWA Support
Status: COMPLETE ✓
Completed: 2026-06-07

---

## Phase 05 — PWA Setup
Status: COMPLETE ✓
Priority: 1
Completed: 2026-06-07

### Description
Jadikan apps/web sebagai Progressive Web App (PWA) menggunakan vite-plugin-pwa. Meliputi konfigurasi service worker (Workbox), web app manifest, placeholder icons, dan meta tags. Setelah selesai, template bisa diinstall sebagai app di mobile/desktop dan bekerja secara offline untuk static assets.

### Plans

| Plan | Name | Depends On | Status |
|------|------|------------|--------|
| 05-01 | PWA Configuration | — | ✓ COMPLETE |

### Deliverables
- ✓ vite-plugin-pwa@1.3.0 terkonfigurasi di vite.config.ts
- ✓ Web app manifest (name, icons 192+512+maskable, theme_color, display standalone)
- ✓ Service worker dengan Workbox (26 entries precached)
- ✓ Placeholder icons (icon.svg + 6 PNG/ICO) di apps/web/public/
- ✓ index.html diupdate dengan meta tags PWA

---

## Milestone v1.4 — Documentation Enhancement
Status: COMPLETE ✓
Completed: 2026-06-07

---

## Milestone v1.5 — Audit & Production Readiness
Status: ✅ COMPLETE
Completed: 2026-06-07
Phases: 2 of 2 complete

Focus: Pastikan boilerplate bebas error, stack kompatibel, dan dokumentasi (README + CLAUDE.md) cukup kuat untuk mendukung AI-assisted development oleh non-programmer.

| Phase | Name | Plans | Status | Completed |
|-------|------|-------|--------|-----------|
| 07 | Code & Compatibility Audit | 07-01, 07-02 | ✅ Complete | 2026-06-07 |
| 08 | Documentation Refinement | 08-01 | ✅ Complete | 2026-06-07 |

---

### Phase 07: Code & Compatibility Audit ✓ COMPLETE

Focus: Type check menyeluruh, version compatibility, dead code cleanup, build + lint + typecheck verification, fix turbo.json deprecation warning.

Deliverables:
- ✓ turbo.json deprecated key dihapus (Turborepo 2.x compatible)
- ✓ Dead code apps/web/src/lib/utils.ts dihapus
- ✓ packages/db @types/node dependency ditambah
- ✓ packages/ui eslint.config.js dibuat
- ✓ packages/config/eslint/react.js CJS/ESM import diperbaiki
- ✓ apps/web vite-env.d.ts + direct deps diperbaiki
- ✓ RouterContext di-export (fix TS4023)
- ✓ pnpm typecheck: exit 0 | pnpm lint: exit 0

### Phase 08: Documentation Refinement ✅ COMPLETE

Focus: README accuracy check, CLAUDE.md diperkaya dengan workflow patterns untuk AI coding agent yang memandu non-programmer.

Deliverables:
- ✓ CLAUDE.md akurat: Drizzle v0.39, gotcha vite-env.d.ts, hapus gotcha stale globalDotEnv
- ✓ CLAUDE.md section Workflow Patterns (5 pola kerja actionable untuk AI agent)
- ✓ README shadcn install instructions dikoreksi ke monorepo workaround (cd apps/web)

---

---

## Milestone v1.6 — Boilerplate Optimization
Status: ✅ COMPLETE
Completed: 2026-06-07
Phases: 1 of 1 complete

Focus: Fix bug day-1 dan quality-of-life improvements agar template zero-friction untuk developer baru.

| Phase | Name | Plans | Status |
|-------|------|-------|--------|
| 09 | Boilerplate Optimization | 09-01, 09-02, 09-03 | ✅ Complete |

---

### Phase 09: Boilerplate Optimization ✅ COMPLETE

Blocker fixes: API dev tanpa vercel login, lazy DB init, @repo/ui exports wildcard, fix @/ alias di form.tsx.
QoL: seed script, drizzle update, alias ~, packages/auth Better Auth.

Deliverables:
- ✓ apps/api dev via tsx watch port 3001 (tanpa vercel login)
- ✓ packages/db lazy init via Proxy — import tidak crash tanpa DATABASE_URL
- ✓ packages/db seed template + db:seed script
- ✓ drizzle-orm + drizzle-kit di-update ke latest
- ✓ @repo/ui exports wildcard ./src/* — sub-path resolution benar
- ✓ form.tsx @/ → relative import (portable lintas package)
- ✓ Alias ~ di apps/web (Vite + TypeScript)
- ✓ packages/auth — Better Auth pre-configured (server + client + schema)
- ✓ docs/AUTH.md — panduan setup auth lengkap

---

---

## Milestone v1.7 — UI Component Library
Status: ✅ COMPLETE
Completed: 2026-06-07
Phases: 1 of 1 complete

Focus: Perluas packages/ui dari 18 → 40+ komponen, install 4 shadcn blocks sebagai route templates, buat showcase /ui, dan perkuat CLAUDE.md dengan rules eksplisit untuk AI agent.

| Phase | Name | Plans | Status |
|-------|------|-------|--------|
| 10 | UI Component Library | 10-01, 10-02, 10-03 | ✅ Complete |

---

### Phase 10: UI Component Library ✅ COMPLETE
Completed: 2026-06-07
Plans: 3/3 complete

Goals achieved: 40+ komponen di packages/ui, 4 blocks sebagai routes, /ui showcase, CLAUDE.md AI agent rules.

| Plan | Name | Status |
|------|------|--------|
| 10-01 | Component Library Expansion | ✅ Complete |
| 10-02 | Blocks + Route Integration | ✅ Complete |
| 10-03 | Showcase + Documentation | ✅ Complete |

---

## Milestone v1.8 — Boilerplate Fixes
Status: ✅ COMPLETE
Completed: 2026-06-07
Phases: 1 of 1 complete

Focus: Perbaiki bug kritis dan high-priority yang ditemukan saat uji coba boilerplate di proyek nyata — dark mode DOM sync, import path, schema konflik auth, drizzle non-TTY, CORS, error handler.

| Phase | Name | Plans | Status |
|-------|------|-------|--------|
| 11 | Boilerplate Fixes | 11-01, 11-02, 11-03 | ✅ Complete |

---

### Phase 11: Boilerplate Fixes ✅ COMPLETE
Completed: 2026-06-07
Plans: 3/3 complete

Goals achieved: 8 issues dari REKOMENDASI.md (🔴🟠) terselesaikan — frontend bugs, database schema, API layer.

| Plan | Name | Status |
|------|------|--------|
| 11-01 | Frontend Critical Bug Fixes | ✅ Complete |
| 11-02 | Database & Schema Improvements | ✅ Complete |
| 11-03 | API Layer + DX Improvements | ✅ Complete |

---

## Phase 06 — Docs & AI Context
Status: COMPLETE ✓
Priority: 1
Completed: 2026-06-07

### Description
Tingkatkan dokumentasi boilerplate dengan tiga tambahan: README diperkaya dengan rekomendasi use case dan daftar referensi, peta codebase terperinci di docs/CODEBASE.md, dan file CLAUDE.md sebagai konteks AI-friendly untuk Claude Code / AI developer tools.

### Plans

| Plan | Name | Depends On | Status |
|------|------|------------|--------|
| 06-01 | Update README + CODEBASE.md + CLAUDE.md | — | ✓ COMPLETE |

### Deliverables
- README.md diperbarui dengan section "Cocok Untuk" dan "Referensi"
- docs/CODEBASE.md — peta codebase lengkap dengan architecture, file reference, patterns, gotchas
- CLAUDE.md — AI context file di root project untuk Claude Code
