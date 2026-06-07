<div align="center">



# REACT EDGE STARTER by NURHASAN




**Production-ready React monorepo boilerplate.**
Clone → isi `.env` → `pnpm dev` → langsung coding fitur bisnis.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-orange)](https://pnpm.io)
[![Turborepo](https://img.shields.io/badge/Turborepo-powered-EF4444)](https://turbo.build)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black)](https://vercel.com)

</div>

---

## Stack

| Layer | Tech |
|-------|------|
| **Frontend** | React 19 · Vite · TypeScript |
| **Routing** | TanStack Router (file-based, type-safe) |
| **State** | TanStack Query · Zustand |
| **UI** | shadcn/ui · Tailwind CSS v4 · dark mode |
| **Backend** | Hono.js · Vercel Edge Functions |
| **Database** | Drizzle ORM · Neon (PostgreSQL) |
| **Env** | T3 Env · Zod |
| **Monorepo** | Turborepo · pnpm workspaces |
| **Deploy** | Vercel |

---

## Struktur

```
react-edge-starter/
├── apps/
│   ├── web/                  # React SPA (Vite)
│   └── api/                  # Hono API (Vercel Edge)
│       └── api/[[...route]].ts  # catch-all edge function
├── packages/
│   ├── ui/                   # shadcn/ui components
│   ├── db/                   # Drizzle schema + client
│   ├── env/                  # T3 Env + Zod schemas
│   └── config/               # ESLint · Prettier · TypeScript
├── .env.example
├── turbo.json
└── vercel.json
```

---

## Cocok Untuk

Template ini optimal untuk jenis web app berikut:

| Jenis App | Mengapa Cocok |
|-----------|---------------|
| **SaaS / Dashboard** | TanStack Query + Drizzle siap untuk data-heavy UI; shadcn/ui menyediakan komponen table, dialog, form tanpa setup tambahan |
| **Internal Tools / Admin Panel** | Monorepo memisahkan API dan UI dengan bersih; Hono Edge Function cepat untuk CRUD operations |
| **Startup MVP** | Clone → isi `.env` → deploy Vercel dalam hitungan menit; semua tooling sudah terkonfigurasi |
| **PWA (Progressive Web App)** | Service worker Workbox sudah aktif; manifest, icons, dan offline caching sudah pre-configured |
| **Multi-team Project** | Arsitektur monorepo Turborepo memungkinkan tim berbeda mengerjakan `apps/` dan `packages/` secara paralel |
| **Data-driven App** | Drizzle ORM + Neon PostgreSQL sudah terhubung; schema dan migration siap digunakan |

> **Bukan untuk:** Static sites (overkill), aplikasi yang butuh SSR/SSG (tidak ada Next.js), atau app tanpa database (tapi bisa dikosongkan).

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/nurhasanfadillah/react-edge-starter.git my-app
cd my-app

# 2. Install
pnpm install

# 3. Setup — reset git, bersihkan file boilerplate, rename project
pnpm run setup

# 4. Isi env
cp .env.example .env
# → isi DATABASE_URL dari https://console.neon.tech

# 5. Dev
pnpm dev
# apps/web  → http://localhost:5173
# apps/api  → http://localhost:3000/api/health
```

### Apa yang dilakukan `pnpm run setup`?

Script interaktif `scripts/setup.js` akan:

| Langkah | Aksi |
|---------|------|
| Bersihkan internal | Hapus `.paul/`, `.spec-workflow/`, `.turbo/cache` |
| Reset git | Hapus `.git/`, `git init`, buat commit pertama bersih |
| Rename project | Update `name` di `package.json` sesuai input |
| Remote (opsional) | `git remote add origin <url-kamu>` jika diisi |
| Docs (opsional) | Tanya apakah folder `docs/` perlu dipertahankan |

Setelah `pnpm run setup` selesai, repo sudah bersih — tidak ada history dari boilerplate, tidak ada file internal, siap coding.

---

## Panduan Penggunaan

### Menambah shadcn Component

Monorepo membutuhkan workaround — install dari `apps/web`, bukan dari root:

```bash
# Jalankan dari apps/web (PENTING: bukan dari root)
cd apps/web
npx shadcn add card
npx shadcn add input
npx shadcn add dialog
```

Komponen masuk ke `packages/ui/src/components/ui/`.
Tambahkan export di `packages/ui/src/index.ts`, lalu pakai di apps/web:

```tsx
import { Button, Card } from '@repo/ui'
```

Lihat [`docs/COMPONENTS.md`](docs/COMPONENTS.md) untuk panduan lengkap dan daftar komponen yang tersedia.

### Menambah API Route

Edit `apps/api/src/index.ts`:

```ts
import { db, users } from '@repo/db'

app.get('/users', async (c) => {
  const result = await db.select().from(users)
  return c.json(result)
})
```

### Database

```bash
# Buat migration dari schema
pnpm --filter @repo/db db:generate

# Push ke database (dev, tanpa migration file)
pnpm --filter @repo/db db:push

# GUI Drizzle Studio
pnpm --filter @repo/db db:studio
```

Schema ada di `packages/db/src/schema/index.ts` — tambah tabel di sini.

### Dark Mode

Dark mode aktif via Tailwind `class` strategy.
Toggle dengan menambah/hapus class `.dark` di `<html>`:

```ts
document.documentElement.classList.toggle('dark')
```

---

## Deploy ke Vercel

```bash
npm i -g vercel
vercel
```

Set environment variables di Vercel dashboard:

| Variable | Keterangan |
|----------|------------|
| `DATABASE_URL` | Connection string dari Neon |
| `VITE_APP_URL` | URL production app |

`vercel.json` sudah dikonfigurasi — Vite build untuk web, Edge Functions untuk `/api/*`.

---

## Environment Variables

Lihat `.env.example` untuk template lengkap.

| Variable | Required | Default | Keterangan |
|----------|----------|---------|------------|
| `DATABASE_URL` | ✅ | — | Neon PostgreSQL connection string |
| `NODE_ENV` | — | `development` | Runtime environment |
| `VITE_APP_URL` | — | — | URL app (opsional, untuk CORS dll.) |

---

## Referensi

Dokumentasi lengkap tersedia di direktori `docs/` dan file-file berikut:

| Dokumen | Isi |
|---------|-----|
| [`docs/COMPONENTS.md`](docs/COMPONENTS.md) | Katalog 18 komponen UI yang sudah terinstall, daftar 29 komponen tambahan yang bisa diinstall, page blocks yang tersedia, dan panduan install komponen di monorepo (termasuk workaround) |
| [`docs/CODEBASE.md`](docs/CODEBASE.md) | Peta codebase lengkap: struktur direktori, arsitektur layer, referensi file-by-file, key patterns, dan gotchas penting |
| [`.env.example`](.env.example) | Template semua environment variables yang dibutuhkan — copy ke `.env` dan isi nilainya |
| [`CLAUDE.md`](CLAUDE.md) | Konteks AI-friendly untuk Claude Code, Cursor, dan AI developer tools lainnya — berisi stack, conventions, common tasks, dan gotchas |

---

<div align="center">

MIT © [NURHASAN](https://github.com/nurhasanfadillah)

</div>
