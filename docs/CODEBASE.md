# Codebase Map — react-edge-starter

Referensi lengkap untuk memahami struktur project ini. Cocok untuk onboarding developer baru maupun AI developer tools (Claude Code, Cursor, Copilot) yang memerlukan konteks codebase sebelum melakukan perubahan.

---

## 1. Struktur Direktori

```
react-edge-starter/
│
├── apps/
│   ├── web/                          # React SPA (Vite + TypeScript)
│   │   ├── src/
│   │   │   ├── routes/               # File-based routing (TanStack Router)
│   │   │   │   ├── __root.tsx        # Root layout — providers, devtools
│   │   │   │   ├── index.tsx         # Route "/" — halaman utama
│   │   │   │   ├── _authenticated.tsx        # Layout sidebar + header
│   │   │   │   ├── _authenticated.dashboard.tsx  # Route "/dashboard"
│   │   │   │   ├── login.tsx         # Route "/login" (UI demo)
│   │   │   │   ├── signup.tsx        # Route "/signup" (UI demo)
│   │   │   │   └── ui.tsx            # Route "/ui" — component showcase
│   │   │   ├── components/           # App-specific components
│   │   │   │   ├── app-sidebar.tsx   # Sidebar navigasi utama
│   │   │   │   ├── site-header.tsx   # Header dengan breadcrumb
│   │   │   │   ├── data-table.tsx    # Tabel dengan sorting/filtering
│   │   │   │   ├── login-form.tsx    # Form login (UI only)
│   │   │   │   ├── signup-form.tsx   # Form register (UI only)
│   │   │   │   ├── page-content.tsx  # Wrapper padding standar halaman
│   │   │   │   └── ...               # chart-area-interactive, section-cards, dll.
│   │   │   ├── hooks/
│   │   │   │   └── use-mobile.ts     # Deteksi breakpoint mobile (768px)
│   │   │   ├── stores/
│   │   │   │   └── app.ts            # Zustand store — theme dan global state
│   │   │   ├── lib/
│   │   │   │   ├── env.ts            # Client-side env vars (Vite/VITE_*)
│   │   │   │   └── query.ts          # QueryClient instance (TanStack Query)
│   │   │   ├── main.tsx              # Entry point — providers + RouterProvider
│   │   │   ├── router.tsx            # Router factory (injects queryClient context)
│   │   │   ├── routeTree.gen.ts      # AUTO-GENERATED — jangan edit manual
│   │   │   └── app.css               # Global styles + Tailwind imports
│   │   ├── public/                   # Static assets
│   │   │   ├── icon.svg
│   │   │   ├── favicon.ico
│   │   │   ├── pwa-192x192.png
│   │   │   ├── pwa-512x512.png
│   │   │   ├── pwa-64x64.png
│   │   │   ├── maskable-icon-512x512.png
│   │   │   └── apple-touch-icon-180x180.png
│   │   ├── index.html                # HTML shell — PWA meta tags ada di sini
│   │   ├── vite.config.ts            # Vite + TanStack Router + Tailwind + PWA
│   │   ├── components.json           # shadcn CLI config (untuk install komponen baru)
│   │   └── tsconfig.json
│   │
│   └── api/                          # Hono.js API (Vercel Edge Functions)
│       ├── src/
│       │   ├── index.ts              # Semua route Hono — tambah endpoint di sini
│       │   └── dev.ts                # Dev server (tsx watch, port 3001)
│       ├── api/
│       │   └── [[...route]].ts       # Vercel catch-all edge function adapter
│       ├── package.json
│       └── tsconfig.json
│
├── packages/
│   ├── ui/                           # Shared UI library (shadcn/ui components)
│   │   ├── src/
│   │   │   ├── components/ui/        # 40+ komponen shadcn
│   │   │   ├── hooks/                # Radix UI hooks (re-exported)
│   │   │   ├── lib/
│   │   │   │   └── utils.ts          # cn() utility function
│   │   │   └── index.ts              # Barrel exports — semua komponen diekspor dari sini
│   │   ├── styles.css                # Tailwind CSS + component styles
│   │   ├── components.json           # shadcn config untuk packages/ui
│   │   └── package.json
│   │
│   ├── auth/                         # Authentication — Better Auth (opt-in)
│   │   ├── src/
│   │   │   ├── server.ts             # Server-side auth setup (Hono middleware)
│   │   │   ├── client.ts             # Client-side auth client
│   │   │   └── schema.ts             # Drizzle schema (users, sessions, accounts)
│   │   └── package.json
│   │
│   ├── db/                           # Database layer (Drizzle ORM + Neon)
│   │   ├── src/
│   │   │   ├── schema/
│   │   │   │   └── index.ts          # Drizzle schema — definisikan tabel di sini
│   │   │   └── index.ts              # DB client (neon + drizzle) + schema re-export
│   │   ├── drizzle.config.ts         # Drizzle Kit config (migrations)
│   │   └── package.json
│   │
│   ├── env/                          # Environment validation (T3 Env + Zod)
│   │   ├── src/
│   │   │   └── index.ts              # Server env schema + client schema exports
│   │   └── package.json
│   │
│   └── config/                       # Shared tooling configs
│       ├── eslint/
│       │   ├── index.js              # Base ESLint config
│       │   └── react.js              # React-specific ESLint config
│       ├── prettier/
│       │   └── index.js              # Shared Prettier config
│       ├── typescript/
│       │   ├── base.json             # Base TypeScript config (shared)
│       │   ├── react-app.json        # TypeScript config untuk React apps
│       │   └── node.json             # TypeScript config untuk Node/Edge
│       └── package.json
│
├── docs/
│   ├── COMPONENTS.md                 # Katalog komponen UI + panduan install
│   └── CODEBASE.md                   # File ini — peta codebase
│
├── .env.example                      # Template environment variables
├── .env                              # Local env (di-gitignore)
├── CLAUDE.md                         # AI context file untuk developer tools
├── turbo.json                        # Turborepo pipeline config
├── vercel.json                       # Vercel deployment config
├── package.json                      # Root workspace + scripts
└── pnpm-workspace.yaml               # pnpm monorepo workspace config
```

---

## 2. Layer Architecture

Alur data dan dependensi antar layer:

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      apps/web                               │
│  React 19 · Vite · TypeScript                               │
│                                                             │
│  TanStack Router  →  file-based routing (src/routes/)       │
│  TanStack Query   →  server state cache (lib/query.ts)      │
│  Zustand          →  client state (stores/app.ts)           │
│  shadcn/ui        →  UI components (dari @repo/ui)          │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP fetch /api/*
┌──────────────────────────▼──────────────────────────────────┐
│                      apps/api                               │
│  Hono.js · Vercel Edge Functions                            │
│                                                             │
│  api/[[...route]].ts  →  Vercel adapter (edge runtime)      │
│  src/index.ts         →  Hono app + route definitions       │
└──────────────────────────┬──────────────────────────────────┘
                           │ Drizzle ORM query
┌──────────────────────────▼──────────────────────────────────┐
│                      packages/db                            │
│  Drizzle ORM · Neon PostgreSQL (serverless)                 │
│                                                             │
│  src/schema/index.ts  →  table definitions                  │
│  src/index.ts         →  db client + schema exports         │
└─────────────────────────────────────────────────────────────┘

Shared packages (digunakan oleh semua apps):
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  packages/ui    │  │  packages/env   │  │ packages/config │
│  shadcn components  │  T3 Env + Zod   │  │ ESLint/Prettier │
│  → apps/web     │  │ → apps/web +api │  │ → semua packages│
└─────────────────┘  └─────────────────┘  └─────────────────┘

┌─────────────────┐
│  packages/auth  │  Better Auth (opt-in — tidak aktif default)
│  server+client  │  → apps/api + apps/web (saat diaktifkan)
└─────────────────┘
```

### Build Pipeline (Turborepo)

```
packages/config  ──▶  packages/ui, packages/db, packages/env
                               │
                      apps/web + apps/api
```

`turbo.json` mendefinisikan bahwa `build` berjalan setelah semua dependency di-build terlebih dahulu (`dependsOn: ["^build"]`).

---

## 3. File-by-File Reference

### apps/web

| File | Kapan Diedit |
|------|-------------|
| `src/routes/__root.tsx` | Tambah global providers, layout wrapper, atau komponen yang muncul di semua halaman (navbar, footer) |
| `src/routes/index.tsx` | Edit halaman utama `/` |
| `src/routes/_authenticated.tsx` | Layout sidebar + header — gunakan sebagai base untuk halaman yang perlu sidebar |
| `src/routes/_authenticated.dashboard.tsx` | Halaman `/dashboard` — gunakan sebagai referensi pola komponen |
| `src/routes/login.tsx` | Halaman `/login` — UI demo, tambahkan logika auth sendiri |
| `src/routes/signup.tsx` | Halaman `/signup` — UI demo, tambahkan logika auth sendiri |
| `src/routes/ui.tsx` | Halaman `/ui` — showcase visual semua komponen @repo/ui |
| `src/routes/[nama].tsx` | Buat file baru untuk tambah route baru (penamaan file = URL path) |
| `src/components/page-content.tsx` | **Gunakan sebagai wrapper** semua halaman — sudah include padding standar |
| `src/stores/app.ts` | Tambah global client state (theme, user preference, dsb.) |
| `src/lib/env.ts` | Tambah environment variable baru yang perlu diakses di frontend (harus prefix `VITE_`) |
| `src/lib/query.ts` | Ubah konfigurasi TanStack Query (staleTime, retry, dll.) |
| `src/main.tsx` | Tambah provider baru di level app (jarang diubah) |
| `src/router.tsx` | Ubah router config (defaultPreload, defaultErrorComponent, dll.) |
| `src/routeTree.gen.ts` | **Jangan edit** — auto-generated oleh TanStack Router saat dev server berjalan |
| `src/app.css` | Tambah global CSS, override Tailwind theme, atau CSS custom |
| `index.html` | Ubah meta tags, PWA manifest link, atau font loading |
| `vite.config.ts` | Tambah Vite plugins, ubah alias path, konfigurasi PWA manifest |
| `components.json` | Konfigurasi shadcn CLI — diubah saat install komponen baru (lihat docs/COMPONENTS.md) |

### apps/api

| File | Kapan Diedit |
|------|-------------|
| `src/index.ts` | **Tambah semua route API di sini** — import DB, definisikan endpoint Hono |
| `api/[[...route]].ts` | Hanya diubah jika mengubah runtime atau adapter Vercel — biasanya tidak perlu |

### packages/db

| File | Kapan Diedit |
|------|-------------|
| `src/schema/index.ts` | **Tambah tabel baru di sini** — define pgTable, kolom, relasi. Contoh: `todos` |
| `src/index.ts` | Jarang diubah — hanya jika perlu konfigurasi Drizzle client berbeda |
| `src/migrate.ts` | Programmatic migration runner — gunakan `db:migrate` untuk CI dan non-TTY environment |
| `drizzle.config.ts` | Includes `tablesFilter` (exclude tabel auth) + dotenv dari root monorepo |

### packages/env

| File | Kapan Diedit |
|------|-------------|
| `src/index.ts` | **Tambah env var baru di sini** — define schema Zod, tambah ke `serverSchema` atau `clientSchema`. Selalu update `.env.example` juga. |

### packages/ui

| File | Kapan Diedit |
|------|-------------|
| `src/index.ts` | Tambah export setelah install komponen baru |
| `src/components/ui/` | Isi folder ini — komponen shadcn yang sudah diinstall |
| `src/lib/utils.ts` | `cn()` utility — jarang diubah |
| `components.json` | Konfigurasi shadcn untuk packages/ui |

### Root & Config

| File | Kapan Diedit |
|------|-------------|
| `turbo.json` | Tambah task baru atau ubah pipeline dependency |
| `vercel.json` | Ubah routing Vercel atau tambah edge function baru |
| `.env.example` | **Selalu update** saat menambah env var baru |
| `package.json` (root) | Tambah script monorepo-level atau devDependency global |

---

## 4. Key Patterns

### File-based Routing (TanStack Router)

Penamaan file di `apps/web/src/routes/` langsung menjadi URL path:

```
src/routes/
├── __root.tsx        → layout wrapper (bukan route)
├── index.tsx         → /
├── about.tsx         → /about
├── users/
│   ├── index.tsx     → /users
│   └── $id.tsx       → /users/:id  (dynamic param)
└── _auth/            → route group (prefix _ = tidak masuk URL)
    └── dashboard.tsx → /dashboard
```

`routeTree.gen.ts` di-generate otomatis — tidak perlu import manual.

### Monorepo Imports

```ts
// UI components
import { Button, Card, Input } from '@repo/ui'

// Database
import { db, todos } from '@repo/db'

// Environment validation
import { env } from '@repo/env'

// cn() utility
import { cn } from '@repo/ui/src/lib/utils'
// ⚠️ Bukan: '@repo/ui/lib/utils' (tsconfig alias tidak melewati src/)
```

### Environment Variables

Dua pattern env vars sesuai runtime:

```ts
// apps/web (browser) — gunakan src/lib/env.ts
import { env } from './lib/env'
const url = env.VITE_APP_URL  // harus prefix VITE_

// apps/api (edge) — gunakan @repo/env
import { env } from '@repo/env'
const dbUrl = env.DATABASE_URL  // server-only, tidak ada VITE_ prefix
```

### TanStack Query Pattern

```ts
// Definisikan query di komponen atau query file terpisah
const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(r => r.json()),
  staleTime: 5 * 60 * 1000,  // default sudah di-set di lib/query.ts
})
```

### Zustand Store Pattern

```ts
// stores/app.ts pattern — persist ke localStorage
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useMyStore = create<MyStore>()(
  persist(
    (set) => ({ /* state */ }),
    { name: 'my-store' }  // localStorage key
  )
)
```

### API Route Pattern (Hono)

```ts
// apps/api/src/index.ts
import { db, todos } from '@repo/db'

app.get('/todos', async (c) => {
  const result = await db.select().from(todos)
  return c.json(result)
})

app.post('/todos', async (c) => {
  const body = await c.req.json()
  // ... insert ke DB
  return c.json({ success: true }, 201)
})
```

CORS, logger, dan error handler sudah aktif secara default di `apps/api/src/index.ts`.

---

## 5. Key Decisions & Gotchas

### Gotchas Kritis

| Issue | Penjelasan | Solusi |
|-------|-----------|--------|
| `cn()` import path | `@repo/ui/lib/utils` tidak akan resolve | Selalu import dari `@repo/ui/src/lib/utils` |
| Install komponen shadcn baru | Jalankan dari `packages/ui` akan gagal — shadcn butuh framework detection | Jalankan dari `apps/web`, redirect alias `ui` di `components.json` sementara (lihat docs/COMPONENTS.md) |
| `form.tsx` ditulis manual | shadcn CLI hang di Windows saat install via stdin pipe | Jangan replace via CLI — sudah ada dan berfungsi |
| `routeTree.gen.ts` | File ini auto-generated saat dev server berjalan | Jangan commit perubahan manual, jangan edit |
| Env vars di frontend | Vite hanya expose variabel dengan prefix `VITE_` | Semua frontend env var harus prefix `VITE_` |
| `db:push` di CI / Claude Code | `drizzle-kit push` membutuhkan TTY interaktif | Gunakan `db:migrate` (`tsx src/migrate.ts`) — non-interactive, aman untuk semua environment |

### Keputusan Arsitektur

| Keputusan | Alasan |
|-----------|--------|
| Hono di Vercel Edge (bukan Node.js runtime) | Lebih cepat cold start, gratis di Vercel, cocok untuk API stateless |
| Neon serverless PostgreSQL | Serverless-native, connection pooling gratis, cocok untuk Vercel Edge |
| T3 Env untuk validasi | Type-safe env vars dengan Zod — error saat startup jika env tidak valid, bukan saat runtime |
| TanStack Router (bukan React Router) | Full type-safety untuk params dan search params; file-based routing lebih maintainable |
| Preset `b1FjRZntw` (radix-vega) | Style: oklch color tokens, Inter Variable font — dipilih untuk estetik modern |
| `react-hook-form` di packages/ui | Diperlukan oleh komponen `Form` shadcn — ditempatkan di UI package agar tidak duplikasi |

### Aturan Penting

1. **Jangan ubah stack** — semua dependency inti sudah locked by design
2. **Ini template, bukan app** — jangan tambah fitur bisnis (auth, email, billing) ke boilerplate
3. **Dark mode via Tailwind class** — toggle `.dark` class di `<html>`, tidak via CSS media query
4. **Deploy target: Vercel** — konfigurasi di `vercel.json` sudah optimal untuk arsitektur ini
