# react-edge-starter — Claude Code Context

Ini adalah **boilerplate/template React monorepo**, bukan aplikasi. Tidak ada fitur bisnis (auth, CRUD, billing, dll.). Tujuan: developer clone repo ini dan langsung mulai coding fitur tanpa setup ulang tooling.

---

## Stack

| Layer | Tech | Versi |
|-------|------|-------|
| Frontend | React + Vite + TypeScript | React 19, Vite 6 |
| Routing | TanStack Router (file-based, type-safe) | v1 |
| Server State | TanStack Query | v5 |
| Client State | Zustand (dengan persist middleware) | v5 |
| UI | shadcn/ui · Tailwind CSS v4 · dark mode | preset radix-vega |
| Backend | Hono.js · Vercel Edge Functions | Hono v4 |
| Database | Drizzle ORM · Neon PostgreSQL (serverless) | Drizzle v0.41 |
| Env | T3 Env + Zod | — |
| Monorepo | Turborepo + pnpm workspaces | Turbo 2.x |
| PWA | vite-plugin-pwa + Workbox | v1.3 |
| Deploy | Vercel (SPA + Edge Functions) | — |

---

## Monorepo Package Imports

```ts
// UI components (18 komponen tersedia)
import { Button, Card, Input, Dialog, Form } from '@repo/ui'

// cn() utility — PENTING: pakai path ini, bukan '@repo/ui/lib/utils'
import { cn } from '@repo/ui/src/lib/utils'

// Database client + schema
import { db, users } from '@repo/db'

// Env validation (server-side, di apps/api)
import { env } from '@repo/env'
// Env validation (client-side, di apps/web)
import { env } from './lib/env'  // src/lib/env.ts di apps/web

// Shared configs (jarang diimport langsung)
// → sudah dikonfigurasi via tsconfig.json extends dan eslint.config.js
```

---

## Key Files

| File | Fungsi |
|------|--------|
| `apps/web/src/routes/__root.tsx` | Root layout — tambah global providers dan wrapper di sini |
| `apps/web/src/routes/index.tsx` | Halaman utama `/` |
| `apps/web/src/stores/app.ts` | Zustand store — theme dan global client state |
| `apps/web/src/lib/env.ts` | Frontend env vars (hanya VITE_* vars, pakai import.meta.env) |
| `apps/web/src/lib/query.ts` | QueryClient instance dengan default config |
| `apps/web/src/router.tsx` | Router factory — inject queryClient ke router context |
| `apps/web/src/routeTree.gen.ts` | **AUTO-GENERATED** — jangan edit, jangan replace |
| `apps/web/vite.config.ts` | Vite config: plugins, aliases, PWA manifest |
| `apps/api/src/index.ts` | Semua Hono route — tambah endpoint API di sini |
| `apps/api/api/[[...route]].ts` | Vercel Edge adapter — biasanya tidak perlu diubah |
| `packages/db/src/schema/index.ts` | Drizzle schema — definisikan tabel baru di sini |
| `packages/db/src/index.ts` | DB client (Neon + Drizzle) + schema re-export |
| `packages/env/src/index.ts` | T3 Env schema — tambah env var baru di sini |
| `packages/ui/src/index.ts` | Barrel exports semua komponen UI |
| `.env.example` | Template env vars — selalu update saat tambah var baru |

---

## Common Tasks

### Tambah route baru

Buat file di `apps/web/src/routes/`:
```tsx
// apps/web/src/routes/dashboard.tsx → route "/dashboard"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return <div>Dashboard</div>
}
```
`routeTree.gen.ts` akan auto-update saat dev server berjalan.

### Tambah API endpoint

Edit `apps/api/src/index.ts`:
```ts
import { db, users } from '@repo/db'

app.get('/users', async (c) => {
  const result = await db.select().from(users)
  return c.json(result)
})
```

### Tambah tabel database

1. Edit `packages/db/src/schema/index.ts`:
```ts
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
```
2. Generate migration: `pnpm --filter @repo/db db:generate`
3. Push ke DB: `pnpm --filter @repo/db db:push`

### Tambah environment variable

1. Edit `packages/env/src/index.ts` — tambah ke `server:` atau `client:` schema
2. Update `.env.example` dengan key dan contoh nilai
3. Di apps/api: akses via `env.MY_VAR`
4. Di apps/web (frontend): tambah prefix `VITE_`, akses via `env.VITE_MY_VAR` dari `src/lib/env.ts`

### Tambah komponen UI

Lihat `docs/COMPONENTS.md` untuk panduan lengkap monorepo workaround.
Singkatnya: run install dari `apps/web` dengan redirect alias sementara.

### Toggle dark mode

```ts
document.documentElement.classList.toggle('dark')
// atau set explicit:
document.documentElement.classList.add('dark')
document.documentElement.classList.remove('dark')
```
Persisted via Zustand store di `apps/web/src/stores/app.ts`.

---

## Constraints (Jangan Dilanggar)

1. **Stack sudah fixed** — jangan ganti atau substitusi package inti (React, Vite, Hono, Drizzle, dll.)
2. **Template, bukan app** — jangan tambah fitur bisnis (login page, auth middleware, email, dsb.) ke boilerplate
3. **Dark mode via Tailwind class strategy** — toggle `.dark` di `<html>`, bukan via CSS `prefers-color-scheme`
4. **Deploy target: Vercel** — konfigurasi `vercel.json` dan Edge runtime diasumsikan
5. **Frontend env vars** — harus prefix `VITE_` agar Vite expose ke browser

---

## Gotchas Penting

| Masalah | Solusi |
|---------|--------|
| `import { cn } from '@repo/ui/lib/utils'` error | Gunakan `@repo/ui/src/lib/utils` (tsconfig alias resolve ke root, bukan src/) |
| `npx shadcn add` dari `packages/ui` tidak berjalan | Harus run dari `apps/web`; redirect alias `ui` di `components.json` dulu |
| `form.tsx` hang saat install via CLI | File ini ditulis manual — jangan reinstall via CLI |
| `routeTree.gen.ts` outdated | Pastikan dev server (`pnpm dev`) berjalan agar file auto-update |
| Env var tidak terbaca di frontend | Cek apakah sudah prefix `VITE_` dan ada di `src/lib/env.ts` |
| `turbo.json` warning `globalDotEnv` | Warning deprecated Turborepo 2.x — tidak mempengaruhi fungsi |

---

## Development Commands

```bash
pnpm dev              # Jalankan semua apps (web + api) dengan Turborepo
pnpm build            # Build semua packages dan apps
pnpm lint             # ESLint semua packages
pnpm typecheck        # tsc --noEmit semua packages
pnpm format           # Prettier format semua files
pnpm test             # Vitest di semua packages

# Database (jalankan dari root atau --filter)
pnpm --filter @repo/db db:generate   # Generate migration dari schema
pnpm --filter @repo/db db:push       # Push schema ke DB (dev)
pnpm --filter @repo/db db:studio     # Buka Drizzle Studio (GUI)
pnpm --filter @repo/db db:migrate    # Jalankan migrations
```

---

## Referensi Lanjutan

- `docs/COMPONENTS.md` — katalog 18 komponen UI + cara install komponen baru
- `docs/CODEBASE.md` — peta codebase lengkap dengan architecture dan file reference
- `.env.example` — semua environment variables yang dibutuhkan
