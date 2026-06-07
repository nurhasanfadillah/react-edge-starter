# Codebase Structure

**Analysis Date:** 2026-06-07

## Directory Layout

```
react-edge-starter/
├── apps/
│   ├── web/                    # Frontend SPA (React + Vite)
│   │   ├── src/
│   │   │   ├── routes/         # File-based routes (TanStack Router)
│   │   │   ├── components/     # App-specific React components
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── lib/            # Utilities: env.ts, query.ts
│   │   │   ├── stores/         # Zustand stores
│   │   │   └── app/            # Static data (dashboard/data.json)
│   │   ├── public/             # Static assets (icons, manifest)
│   │   └── vite.config.ts      # Vite + plugins config
│   └── api/                    # Backend API (Hono.js Edge)
│       ├── src/
│       │   ├── index.ts        # Hono app + routes
│       │   └── dev.ts          # Dev server (port 3001)
│       └── api/
│           └── [[...route]].ts # Vercel Edge adapter
├── packages/
│   ├── ui/                     # shadcn/ui component library (40+ components)
│   ├── db/                     # Drizzle ORM + Neon DB client
│   ├── env/                    # T3 Env + Zod validation
│   ├── auth/                   # Better Auth (opt-in)
│   └── config/                 # Shared ESLint, Prettier, TypeScript configs
├── docs/                       # Developer documentation
├── scripts/                    # Setup script
├── turbo.json                  # Turborepo task graph
├── pnpm-workspace.yaml         # pnpm workspaces definition
├── vercel.json                 # Deployment config
├── CLAUDE.md                   # AI agent + developer reference
└── .env.example                # Environment variable template
```

## Directory Purposes

**`apps/web/src/routes/`**
- Purpose: File-based routes — each file = one URL
- Contains: `.tsx` route files auto-compiled into `routeTree.gen.ts`
- Key files: `__root.tsx` (global layout), `_authenticated.tsx` (sidebar layout), `_authenticated.dashboard.tsx`, `login.tsx`, `signup.tsx`, `ui.tsx` (component showcase), `index.tsx` (home `/`)
- Naming: `_name.tsx` = layout (no own URL), `_layout.name.tsx` = nested, `$param.tsx` = dynamic

**`apps/web/src/components/`**
- Purpose: App-specific React components (blocks, forms, layout pieces)
- Key files: `app-sidebar.tsx`, `site-header.tsx`, `data-table.tsx`, `login-form.tsx`, `signup-form.tsx`, `page-content.tsx`, `chart-area-interactive.tsx`, `section-cards.tsx`

**`apps/web/src/lib/`**
- Purpose: Configuration and utility modules
- Key files: `env.ts` (client env vars, VITE_* only), `query.ts` (QueryClient config, 5min staleTime)

**`apps/web/src/stores/`**
- Purpose: Zustand client state
- Key files: `app.ts` — theme store with localStorage persist

**`packages/ui/src/`**
- Purpose: Shared shadcn/ui component library
- Key files: `index.ts` (barrel export, 40+ components), `lib/utils.ts` (cn utility), `components/ui/` (individual component files), `hooks/` (Radix UI hooks)
- Styles: `packages/ui/styles.css` (Tailwind + component CSS)

**`packages/db/src/`**
- Purpose: Database client and schema
- Key files: `index.ts` (lazy Drizzle proxy + schema re-export), `schema/index.ts` (pgTable definitions), `seed.ts` (seeding template)

**`packages/config/`**
- Purpose: Shared tooling configs
- Subdirs: `eslint/` (base + react rules), `prettier/` (shared config), `typescript/` (base, react-app, node)

## Key File Locations

**Entry Points:**
- `apps/web/src/main.tsx` - React app bootstrap (creates QueryClient + router)
- `apps/web/src/router.tsx` - Router factory (injects queryClient into context)
- `apps/api/src/index.ts` - Hono app definition + all API routes
- `apps/api/src/dev.ts` - Development server on port 3001
- `apps/api/api/[[...route]].ts` - Vercel Edge adapter

**Configuration:**
- `apps/web/vite.config.ts` - Vite: TanStack Router plugin, Tailwind, PWA, path aliases
- `apps/web/tsconfig.json` - TypeScript: extends base, path aliases (@/*, ~/*, @repo/ui/*)
- `turbo.json` - Turborepo task dependencies and caching
- `vercel.json` - Build command, Edge Function runtime, SPA rewrite rules
- `.env.example` - All environment variables template
- `packages/config/typescript/base.json` - Shared TS config (strict, ES2022, bundler)

**Core Logic:**
- `apps/web/src/routes/__root.tsx` - Global providers, devtools (add global wrappers here)
- `apps/web/src/routes/_authenticated.tsx` - Sidebar layout (h-screen + min-h-0 pattern)
- `packages/db/src/schema/index.ts` - All database table definitions
- `packages/env/src/index.ts` - Server-side env schema (DATABASE_URL, NODE_ENV)
- `packages/ui/src/index.ts` - UI barrel export (single import point)

**Documentation:**
- `CLAUDE.md` - AI agent rules, component catalog, workflow patterns, gotchas
- `docs/COMPONENTS.md` - 40+ component catalog + install guide
- `docs/CODEBASE.md` - Codebase map for humans
- `docs/AUTH.md` - Better Auth setup guide (opt-in auth)

## Naming Conventions

**Files:**
- kebab-case for all TypeScript files: `app-sidebar.tsx`, `use-mobile.ts`, `data-table.tsx`
- Exceptions: TanStack Router special prefixes — `__root.tsx`, `_authenticated.tsx`
- Route params: `$paramName.tsx` for dynamic segments

**Directories:**
- kebab-case: `components/`, `routes/`, `node-server/`
- Plural names for collections: `routes/`, `components/`, `hooks/`, `stores/`

**Special Patterns:**
- `index.ts` — barrel exports for packages (`packages/ui/src/index.ts`, `packages/db/src/index.ts`)
- `routeTree.gen.ts` — auto-generated, never edit manually
- `_name.tsx` — TanStack Router layout route (underscore = no own URL)
- `@repo/*` — workspace package alias prefix

## Where to Add New Code

**New Frontend Route:**
- Create: `apps/web/src/routes/[name].tsx` (flat) or `apps/web/src/routes/_authenticated.[name].tsx` (with sidebar)
- Reference: `apps/web/src/routes/_authenticated.dashboard.tsx` as pattern

**New API Endpoint:**
- Add route handler to: `apps/web/src/routes/_authenticated.dashboard.tsx` (frontend) + `apps/api/src/index.ts` (backend)

**New UI Component:**
- Install: `cd apps/web && npx shadcn add [component]` (monorepo workaround)
- Export: Add to `packages/ui/src/index.ts`

**New Database Table:**
- Add to: `packages/db/src/schema/index.ts`
- Run: `pnpm --filter @repo/db db:generate && db:push`

**New Environment Variable:**
- Server: `packages/env/src/index.ts` (server schema)
- Client: `apps/web/src/lib/env.ts` (VITE_ prefix) + `packages/env/src/index.ts` (client schema)
- Template: `.env.example`

**New Shared Component (Custom):**
- Location: `apps/web/src/components/` (app-specific)
- Or: `packages/ui/src/components/ui/` + export from `packages/ui/src/index.ts` (shared)

## Special Directories

**`apps/web/src/routeTree.gen.ts`**
- Purpose: Auto-generated route tree from files in `apps/web/src/routes/`
- Source: Generated by `@tanstack/router-plugin` Vite plugin when dev server runs
- Committed: Yes (needed for TypeScript, stale without dev server)

**`apps/web/dist/`**
- Purpose: Vite build output (SPA)
- Source: `pnpm build`
- Committed: No (in `.gitignore`)

**`.paul/`**
- Purpose: PAUL project management state (roadmap, phases, codebase map)
- Source: Created by `/paul:init`
- Committed: Yes

---

*Structure analysis: 2026-06-07*
*Update when directory structure changes*
