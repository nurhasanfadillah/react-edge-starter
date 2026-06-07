# Technology Stack

**Analysis Date:** 2026-06-07

## Languages

**Primary:**
- TypeScript 5.7.2 - All application code across all apps and packages

**Secondary:**
- JavaScript - Config files (`.prettierrc`, `eslint.config.js`, `packages/config/eslint/*.js`)

## Runtime

**Environment:**
- Node.js >=20 (specified in `package.json` engines field)
- Edge Runtime - Vercel Edge Functions via `apps/api/api/[[...route]].ts`
- Browser (ES2022 target) - SPA output

**Package Manager:**
- pnpm 9.15.4 (pinned in `package.json`)
- Lockfile: `pnpm-lock.yaml` present
- Workspaces: `pnpm-workspace.yaml` with `apps/*` and `packages/*`

## Frameworks

**Frontend:**
- React 19.0.0 - UI framework (`apps/web/package.json`)
- Vite 6.0.6 - Build tool and dev server (`apps/web/vite.config.ts`)
- TanStack Router 1.95.0 - File-based, type-safe routing (`apps/web/src/routes/`)
- TanStack React Query 5.62.2 - Server state and data fetching (`apps/web/src/lib/query.ts`)
- Zustand 5.0.2 - Client state management (`apps/web/src/stores/app.ts`)
- Tailwind CSS v4 - Via `@tailwindcss/vite 4.1.0` (`apps/web/vite.config.ts`)
- shadcn/ui - Component library (40+ components in `packages/ui/src/components/ui/`)

**Backend:**
- Hono 4.6.0 - Lightweight edge-runtime web framework (`apps/api/src/index.ts`)
- @hono/node-server - Dev server adapter (`apps/api/src/dev.ts`)

**Build/Dev:**
- Turborepo 2.3.3 - Monorepo task orchestration (`turbo.json`)
- vite-plugin-pwa 1.3.0 - PWA support (`apps/web/vite.config.ts`)
- @tanstack/router-plugin 1.95.0 - Auto-generates `apps/web/src/routeTree.gen.ts`

**Code Quality:**
- ESLint 9.17.0 - Linting (flat config, `packages/config/eslint/`)
- Prettier 3.4.2 - Formatting (`.prettierrc`)

## Key Dependencies

**Critical:**
- Drizzle ORM (latest) - Type-safe SQL ORM (`packages/db/src/index.ts`)
- @neondatabase/serverless 0.10.4 - Neon HTTP PostgreSQL client (`packages/db/`)
- better-auth (latest) - Authentication framework, opt-in (`packages/auth/`)
- @t3-oss/env-core - T3 Env for validated environment vars (`packages/env/src/index.ts`)
- Zod 3.25.76 - Schema validation for env and data

**Infrastructure:**
- Radix UI 1.5.0 - Headless component primitives (`packages/ui/`)
- react-hook-form 7.77.0 + @hookform/resolvers 5.4.0 - Form management (`packages/ui/`)
- Recharts 3.8.0 - Chart components (`packages/ui/src/components/ui/chart.tsx`)
- Sonner 2.0.7 - Toast notifications
- TanStack React Table 8.21.3 - Table state management (`apps/web/src/components/data-table.tsx`)

## Configuration

**Environment:**
- `.env.example` - Template with DATABASE_URL, NODE_ENV, VITE_APP_URL
- `packages/env/src/index.ts` - Server-side T3 Env + Zod validation
- `apps/web/src/lib/env.ts` - Client-side VITE_* env validation

**Build:**
- `turbo.json` - Monorepo task graph (build, dev, lint, typecheck, format, clean)
- `vercel.json` - Deployment config (Edge Functions, rewrites, build command)
- `apps/web/vite.config.ts` - Vite plugins, path aliases, PWA manifest
- `packages/config/typescript/` - Shared TypeScript configs (base, react-app, node)
- `packages/db/drizzle.config.ts` - Drizzle Kit, PostgreSQL dialect

## Platform Requirements

**Development:**
- Any platform with Node.js >=20 and pnpm 9.x
- `pnpm dev` starts all apps via Turborepo
- API runs on port 3001 via tsx watch (`apps/api/src/dev.ts`)

**Production:**
- Vercel - SPA to CDN + API as Edge Functions
- Neon PostgreSQL - Serverless database (`DATABASE_URL` required)
- No Docker or container requirements

---

*Stack analysis: 2026-06-07*
*Update after major dependency changes*
