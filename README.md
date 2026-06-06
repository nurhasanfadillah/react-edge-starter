<div align="center">

# react-edge-starter

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

## Quick Start

```bash
# 1. Clone
git clone https://github.com/nurhasanfadillah/react-edge-starter.git my-app
cd my-app

# 2. Install
pnpm install

# 3. Setup env
cp .env.example .env
# → isi DATABASE_URL dari https://console.neon.tech

# 4. Dev
pnpm dev
# apps/web  → http://localhost:5173
# apps/api  → http://localhost:3000/api/health
```

---

## Panduan Penggunaan

### Menambah shadcn Component

```bash
# Dari root monorepo
npx shadcn add card
npx shadcn add input
npx shadcn add dialog
```

Komponen masuk ke `packages/ui/src/components/ui/`.
Export di `packages/ui/src/index.ts`, lalu pakai di apps/web:

```tsx
import { Button, Card } from '@repo/ui'
```

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

<div align="center">

MIT © [NURHASAN](https://github.com/nurhasanfadillah)

</div>
