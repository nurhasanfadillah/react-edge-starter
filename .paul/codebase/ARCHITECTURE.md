# Architecture

**Analysis Date:** 2026-06-07

## Pattern Overview

**Overall:** Turborepo Monorepo — Edge-First Full-Stack SPA + Serverless API

**Key Characteristics:**
- Monorepo with Turborepo + pnpm workspaces (`pnpm-workspace.yaml`)
- Frontend SPA deployed to Vercel CDN; API deployed as Vercel Edge Functions
- All packages are private and imported via `@repo/*` workspace aliases
- Type-safe end-to-end: TypeScript strict mode across all layers

## Layers

**Frontend Layer (`apps/web`):**
- Purpose: React SPA with file-based routing, server state, and client state
- Contains: Routes, components, hooks, stores, lib (env, queryClient)
- Entry: `apps/web/src/main.tsx` → `apps/web/src/router.tsx`
- Key: TanStack Router (file-based, auto-gen `routeTree.gen.ts`), TanStack Query, Zustand
- Depends on: `@repo/ui`, `@repo/env` (via `apps/web/src/lib/env.ts`)

**Backend Layer (`apps/api`):**
- Purpose: Hono.js API running as Vercel Edge Functions
- Contains: Route handlers in `apps/api/src/index.ts`
- Entry (dev): `apps/api/src/dev.ts` (tsx watch, port 3001)
- Entry (prod): `apps/api/api/[[...route]].ts` (Vercel adapter)
- Basepath: `/api` (Hono `.basePath('/api')`)
- Depends on: `@repo/db`, `@repo/env`

**Database Layer (`packages/db`):**
- Purpose: Drizzle ORM + Neon PostgreSQL, shared across apps
- Contains: DB client (lazy proxy), schema definitions, seed template
- Entry: `packages/db/src/index.ts` — exports `db` + all schema tables
- Schema: `packages/db/src/schema/index.ts`
- Depends on: `@neondatabase/serverless`, `drizzle-orm`

**Shared Package Layer (`packages/`):**
- `packages/ui` — 40+ shadcn/ui components, barrel export (`packages/ui/src/index.ts`)
- `packages/env` — T3 Env + Zod schema, server + client validation (`packages/env/src/index.ts`)
- `packages/auth` — Better Auth (opt-in, not active by default) (`packages/auth/src/`)
- `packages/config` — Shared ESLint, Prettier, TypeScript configs

## Data Flow

**Frontend → API → Database (CRUD):**

1. User interacts with React component
2. TanStack Query hook fires: `useQuery({ queryFn: () => fetch('/api/users') })`
3. HTTP request routes to Hono via `/api/*` rewrite (Vercel) or port 3001 (dev)
4. Hono matches route: `app.get('/users', async (c) => { ... })`
5. Handler imports `{ db, users } from '@repo/db'`, executes Drizzle query
6. Drizzle transpiles to SQL → Neon HTTP client executes against PostgreSQL
7. Hono returns `c.json(result)`
8. TanStack Query caches response, React re-renders with data

**State Management:**
- Server state: TanStack Query (cache, staleTime 5min, retry 1)
- Client state: Zustand with `persist` middleware → `localStorage` (`apps/web/src/stores/app.ts`)
- Routing state: TanStack Router (URL-driven, type-safe params)

## Key Abstractions

**File-Based Routes:**
- Purpose: Define URL routes as `.tsx` files in `apps/web/src/routes/`
- Pattern: `[name].tsx` → `/name`, `_layout.tsx` → layout wrapper, `_layout.name.tsx` → nested
- Auto-generated: `apps/web/src/routeTree.gen.ts` (never edit manually)
- Key routes: `__root.tsx` (global), `_authenticated.tsx` (sidebar layout), `_authenticated.dashboard.tsx`

**Router Factory Pattern:**
- Purpose: Inject `queryClient` into router context for type-safe access in routes
- Location: `apps/web/src/router.tsx`
- Pattern: `export function createAppRouter(queryClient: QueryClient) { return createRouter({ routeTree, context: { queryClient } }) }`

**DB Proxy (Lazy Initialization):**
- Purpose: Defer Drizzle client creation until first DB access — avoids crash on import when `DATABASE_URL` not set
- Location: `packages/db/src/index.ts`
- Pattern: `export const db = new Proxy({}, { get: (_, key) => getDb()[key] })`

**Barrel Exports:**
- Purpose: Single import point for shared packages
- Examples: `import { Button } from '@repo/ui'`, `import { db, users } from '@repo/db'`
- Files: `packages/ui/src/index.ts`, `packages/db/src/index.ts`

**PageContent Wrapper:**
- Purpose: Standardize page padding across all routes
- Location: `apps/web/src/components/page-content.tsx`
- Pattern: `<PageContent>` wraps all route content (px-4 py-4 md:py-6 lg:px-6 flex flex-col flex-1)

## Entry Points

**Frontend Bootstrap:**
- Location: `apps/web/src/main.tsx`
- Triggers: Browser loads `apps/web/dist/index.html`
- Responsibilities: Create QueryClient → create router → render RouterProvider + QueryClientProvider

**Root Layout:**
- Location: `apps/web/src/routes/__root.tsx`
- Responsibilities: Renders `<Outlet />` for nested routes, mounts devtools in DEV

**API (Development):**
- Location: `apps/api/src/dev.ts`
- Triggers: `pnpm dev` via Turborepo → `tsx watch src/dev.ts`
- Responsibilities: Start Hono app on port 3001 via `@hono/node-server`

**API (Production):**
- Location: `apps/api/api/[[...route]].ts`
- Triggers: Vercel Edge Function invocation
- Responsibilities: Export `handle(app)` for Vercel runtime

## Error Handling

**Strategy:** Minimal — no global error handlers configured (template-level, user adds their own)

**Patterns:**
- No error boundaries in `apps/web/src/routes/__root.tsx` (known gap, see CONCERNS.md)
- No global error middleware in `apps/api/src/index.ts` (template provides only health check)
- TanStack Query: `retry: 1` on failed queries, no global `onError` handler

## Cross-Cutting Concerns

**Logging:**
- No logging library — console.log only; Vercel captures stdout

**Validation:**
- Env vars: T3 Env + Zod at `packages/env/src/index.ts` and `apps/web/src/lib/env.ts`
- Data: Zod available (used in `apps/web/src/components/data-table.tsx` for table schemas)

**Authentication:**
- Not active by default — opt-in via `packages/auth/` (see `docs/AUTH.md`)
- TanStack Router `beforeLoad` pattern recommended for protected routes

---

*Architecture analysis: 2026-06-07*
*Update when major patterns change*
