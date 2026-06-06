# react-edge-starter

> by [NURHASAN](https://github.com/nurhasanfadillah)

Monorepo boilerplate siap pakai untuk membangun aplikasi React dengan stack modern.
Clone, isi `.env`, jalankan `pnpm dev` — langsung bisa coding fitur bisnis.

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19 + Vite + TypeScript |
| Routing | TanStack Router |
| State | TanStack Query + Zustand |
| UI | shadcn/ui (preset radix-mira) + Tailwind CSS v4 |
| Backend | Hono.js (Vercel Edge Functions) |
| Database | Drizzle ORM + Neon (PostgreSQL) |
| Monorepo | Turborepo + pnpm workspaces |
| Deploy | Vercel |

## Struktur

```
react-edge-starter/
├── apps/
│   ├── web/          # React SPA (Vite)
│   └── api/          # Hono API (Vercel Edge)
├── packages/
│   ├── ui/           # shadcn/ui components
│   ├── db/           # Drizzle schema + client
│   ├── env/          # T3 Env + Zod validation
│   └── config/       # ESLint, Prettier, TypeScript configs
└── vercel.json       # Deployment config
```

## Quick Start

**1. Clone dan install:**
```bash
git clone <repo-url> my-app
cd my-app
pnpm install
```

**2. Setup environment:**
```bash
cp .env.example .env
# Edit .env — isi DATABASE_URL dari Neon Console
```

**3. Jalankan dev server:**
```bash
pnpm dev
# apps/web → http://localhost:5173
# apps/api → http://localhost:3000/api/health
```

## Menambah shadcn Component

```bash
# Dari root monorepo:
npx shadcn add button
npx shadcn add card
npx shadcn add input
```

Komponen akan ditambahkan ke `packages/ui/src/components/ui/`.
Export dari `packages/ui/src/index.ts` lalu import di apps/web:

```ts
import { Button } from '@repo/ui'
```

## Database

```bash
# Generate migration dari schema:
pnpm --filter @repo/db db:generate

# Push schema ke database (dev):
pnpm --filter @repo/db db:push

# Buka Drizzle Studio:
pnpm --filter @repo/db db:studio
```

Schema ada di `packages/db/src/schema/index.ts`.

## Menambah API Route

Edit `apps/api/src/index.ts`:

```ts
import { db, users } from '@repo/db'

app.get('/users', async (c) => {
  const result = await db.select().from(users)
  return c.json(result)
})
```

## Deploy ke Vercel

```bash
# Install Vercel CLI (jika belum):
npm i -g vercel

# Deploy:
vercel
```

Tambahkan environment variables di Vercel dashboard:
- `DATABASE_URL` — connection string Neon
- `VITE_APP_URL` — URL production app

## Environment Variables

Lihat `.env.example` untuk daftar lengkap.

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |
| `NODE_ENV` | No | `development` / `production` (default: development) |
| `VITE_APP_URL` | No | URL aplikasi (untuk CORS, dsb.) |

## License

MIT — by [NURHASAN](https://github.com/nurhasanfadillah)
