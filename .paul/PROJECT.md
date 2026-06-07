# PROJECT.md — shadcn-preset Boilerplate

## What This Is
Template/boilerplate monorepo siap pakai untuk membangun aplikasi React secara lebih cepat dengan standar tech yang optimal. Bukan aplikasi — murni setup dan konfigurasi.

## Value Proposition
Developer clone repo ini, isi `.env`, dan langsung bisa coding fitur bisnis tanpa setup ulang tooling, routing, database connection, atau UI components.

## Target Users
- Penggunaan pribadi
- Open-source di GitHub — siapapun boleh menggunakan

## Deploy Target
Vercel (SPA + Edge Functions)

## Core Constraints
1. Stack sudah ditetapkan — tidak boleh diganti atau disubstitusi
2. Ini adalah template, bukan aplikasi — tidak ada fitur bisnis (auth, CRUD, email, dsb.)
3. Semua tool harus terkonfigurasi dan saling terhubung
4. Harus ada `.env.example` lengkap dan README yang baik untuk open-source
5. Dark mode wajib aktif (Tailwind `class` strategy)
6. Mobile-first dan responsive

## Tech Stack (Locked)

### Apps
- `apps/web` — React + Vite + TypeScript + TanStack Router + TanStack Query + Zustand
- `apps/api` — Hono.js (Vercel Edge Functions)

### Packages
- `packages/ui` — shadcn/ui components (current: preset b1FjRZntw / radix-vega; init was: `npx shadcn@latest init --preset b6GMOwxQW --template vite --monorepo`)
- `packages/db` — Drizzle ORM + Neon DB (PostgreSQL)
- `packages/env` — T3 Env + Zod (environment validation)
- `packages/config` — Shared ESLint, Prettier, TypeScript configs

### Tooling
- Turborepo (monorepo build caching)
- ESLint + Prettier + Husky + lint-staged
- Vitest (testing, Vite-native)
- Zod (validation)

## Success Definition
- `pnpm install` → berhasil
- `pnpm dev` → apps/web dan apps/api berjalan
- shadcn components tersedia dan dark mode aktif
- Database connection bisa diverifikasi
- Semua type checks lulus
- `.env.example` dokumentasi semua environment variables

## Current State (v1.7 — SHIPPED)

Semua success criteria terpenuhi. Boilerplate production-ready: 40+ komponen UI, 4 page blocks sebagai route templates, showcase /ui, CLAUDE.md dengan AI Agent Rules eksplisit.

### Shipped
- ✓ Monorepo Turborepo berjalan
- ✓ `apps/web` dengan React + Vite + TanStack Router + TanStack Query + Zustand
- ✓ `apps/api` dengan Hono.js siap deploy ke Vercel Functions
- ✓ `packages/ui` dengan 40+ shadcn/ui components (radix-vega, Inter font, dark mode)
- ✓ `packages/db` dengan Drizzle + Neon + contoh schema minimal + seed script
- ✓ `packages/env` dengan T3 Env + Zod
- ✓ `packages/config` dengan shared ESLint, Prettier, TypeScript
- ✓ `packages/auth` — Better Auth pre-configured (opt-in)
- ✓ `vercel.json`, `.env.example`, `README.md`
- ✓ PWA (vite-plugin-pwa, service worker Workbox, web app manifest)
- ✓ 4 page blocks: dashboard-01, sidebar-07, login-02, signup-02
- ✓ Route templates: `/dashboard`, `/_authenticated`, `/login`, `/signup`
- ✓ Route `/ui` — visual showcase semua komponen per kategori
- ✓ `docs/COMPONENTS.md` — katalog 40+ komponen + Installed Blocks
- ✓ `docs/CODEBASE.md` — peta codebase lengkap (5 sections)
- ✓ `CLAUDE.md` — AI Agent Rules wajib (5 rules) + Component Catalog lengkap
- ✓ README akurat mencerminkan state v1.7

### Key Decisions (Phase 02)
- `form.tsx` ditulis manual — shadcn CLI hang di Windows saat install via stdin pipe
- Import cn harus via `@repo/ui/src/lib/utils` (bukan `@repo/ui/lib/utils`) karena tsconfig alias setup
- `react-hook-form` ditambah ke `packages/ui` untuk support komponen Form

### Key Decisions (Phase 03 — v1.1)
- `shadcn apply` harus dijalankan dari `apps/web`, bukan `packages/ui` (no framework detection di library package)
- Untuk install komponen ke `packages/ui`, redirect `aliases.ui` sementara ke `@repo/ui/src/components/ui`
- Preset b1FjRZntw menggunakan style `radix-vega` — font tetap Inter (tidak berubah)

### Key Decisions (Phase 06 — v1.4)
- `CLAUDE.md` ditempatkan di root project (bukan `docs/`) agar Claude Code auto-load tanpa konfigurasi tambahan
- Gotchas didokumentasikan di dua tempat (CODEBASE.md + CLAUDE.md) — target audience berbeda, masing-masing bisa dibaca standalone

### Key Decisions (Phase 07 — v1.5)
- `turbo.json` `globalDotEnv` key dihapus (deprecated Turborepo 2.x) — bukan warning, harus dihapus
- `apps/web/src/lib/utils.ts` dihapus — dead code (cn sudah di packages/ui)
- `vite-env.d.ts` wajib ada di `apps/web/src/` agar `import.meta.env` dikenali TypeScript

### Key Decisions (Phase 08 — v1.5)
- Drizzle versi dikoreksi ke v0.39 (actual: drizzle-orm@0.39.1)
- shadcn install harus dari `apps/web`, bukan root — dikonfirmasi di README dan CLAUDE.md
- CLAUDE.md diperkaya Workflow Patterns (5 pola kerja) agar AI agent bisa langsung eksekusi tanpa tebak-tebak

### Key Decisions (Phase 10 — v1.7)
- Route `/ui` dibuat sebagai standalone (bukan nested `/_authenticated`) agar bisa diakses tanpa sidebar layout
- Chart dan Calendar tidak di-showcase di /ui — terlalu kompleks untuk contoh inline, hanya disebut via teks
- CLAUDE.md AI Agent Rules ditulis sebagai "wajib" (bukan saran) — boilerplate ini dibangun khusus untuk AI agent
- Component Catalog di CLAUDE.md mencantumkan nama semua sub-parts agar AI agent tidak perlu cek source code

---
*Last updated: 2026-06-07 after Phase 10 (UI Component Library — v1.7)*
