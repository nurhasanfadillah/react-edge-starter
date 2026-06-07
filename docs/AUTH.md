# Authentication Guide

Template ini menyertakan `packages/auth` — Better Auth pre-configured dengan Drizzle adapter.
Auth **tidak aktif by default** — developer mengaktifkannya dengan mengikuti langkah di bawah.

---

## Setup

### 1. Tambah dependency

Di `apps/api/package.json`:
```json
{
  "dependencies": {
    "@repo/auth": "workspace:*"
  }
}
```

Di `apps/web/package.json`:
```json
{
  "dependencies": {
    "@repo/auth": "workspace:*"
  }
}
```

Lalu jalankan `pnpm install` dari root.

---

### 2. Tambah env variables

Di `packages/env/src/index.ts`, tambah ke `server`:
```ts
BETTER_AUTH_SECRET: z.string().min(32),
BETTER_AUTH_URL: z.string().url(),
```

Di `.env`:
```
BETTER_AUTH_SECRET=generate-random-string-min-32-chars
BETTER_AUTH_URL=http://localhost:3000
```

Update juga `.env.example` dengan key yang sama.

---

### 3. Migrate schema database

`packages/auth` menyediakan schema tabel di `src/schema.ts` (4 tabel: users, sessions, accounts, verifications).

> **Catatan:** Hapus atau ganti tabel `users` contoh di `packages/db/src/schema/index.ts` — akan konflik dengan tabel users dari packages/auth.

Push schema ke database:
```bash
pnpm --filter @repo/db db:push
```

Atau generate migration:
```bash
pnpm --filter @repo/db db:generate
pnpm --filter @repo/db db:migrate
```

---

### 4. Connect ke Hono (apps/api)

Di `apps/api/src/index.ts`:
```ts
import { auth } from '@repo/auth/server'

// Mount auth routes — Better Auth handle semua endpoint /api/auth/*
app.on(['GET', 'POST'], '/api/auth/**', (c) => auth.handler(c.req.raw))
```

---

### 5. Gunakan di Frontend (apps/web)

Import authClient di komponen React:
```ts
import { authClient } from '@repo/auth/client'

// atau import named exports:
import { signIn, signUp, signOut, useSession } from '@repo/auth/client'
```

**Sign up:**
```ts
await authClient.signUp.email({
  email: 'user@example.com',
  password: 'password123',
  name: 'John Doe',
})
```

**Sign in:**
```ts
await authClient.signIn.email({
  email: 'user@example.com',
  password: 'password123',
})
```

**Sign out:**
```ts
await authClient.signOut()
```

**Cek session (React hook):**
```ts
function MyComponent() {
  const { data: session, isPending } = useSession()

  if (isPending) return <div>Loading...</div>
  if (!session) return <div>Not logged in</div>
  return <div>Hello, {session.user.name}</div>
}
```

---

## Struktur Package

```
packages/auth/
├── src/
│   ├── server.ts    — betterAuth() instance (server-side only)
│   ├── client.ts    — createAuthClient() (browser/React)
│   └── schema.ts    — Drizzle schema (users, sessions, accounts, verifications)
├── package.json     — @repo/auth workspace package
└── tsconfig.json
```

### Import paths

| Import | Digunakan di | Isi |
|--------|-------------|-----|
| `@repo/auth/server` | apps/api | auth instance, Session type, User type |
| `@repo/auth/client` | apps/web | authClient, signIn, signUp, signOut, useSession |
| `@repo/auth/schema` | packages/db (opsional) | tabel untuk drizzle migrations |

---

## Protected Routes (TanStack Router)

Untuk melindungi route dari user yang belum login:

```tsx
// apps/web/src/routes/dashboard.tsx
import { createFileRoute, redirect } from '@tanstack/react-router'
import { authClient } from '@repo/auth/client'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: async () => {
    const session = await authClient.getSession()
    if (!session.data) {
      throw redirect({ to: '/login' })
    }
  },
  component: Dashboard,
})
```

---

## Referensi

- [Better Auth Docs](https://www.better-auth.com/docs)
- [Drizzle Adapter](https://www.better-auth.com/docs/adapters/drizzle)
- [Hono Integration](https://www.better-auth.com/docs/integrations/hono)
- [TanStack Router Integration](https://www.better-auth.com/docs/integrations/tanstack)
