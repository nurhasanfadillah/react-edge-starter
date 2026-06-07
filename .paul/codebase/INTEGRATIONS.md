# External Integrations

**Analysis Date:** 2026-06-07

## APIs & External Services

**Payment Processing:**
- Not detected

**Email/SMS:**
- Not detected

**External APIs:**
- None beyond database and deployment

## Data Storage

**Databases:**
- Neon PostgreSQL - Primary data store (serverless)
  - Connection: `DATABASE_URL` env var (in `.env.example`)
  - Client: Drizzle ORM + `@neondatabase/serverless` HTTP adapter (`packages/db/src/index.ts`)
  - Schema: `packages/db/src/schema/index.ts` (Drizzle pgTable definitions)
  - Migrations: `pnpm --filter @repo/db db:generate` → `db:push` → `db:migrate`
  - Current schema: `users` table (example — to be replaced by user)

**File Storage:**
- Not detected

**Caching:**
- None (TanStack Query provides client-side caching with 5-min staleTime)

## Authentication & Identity

**Auth Provider:**
- Better Auth (opt-in, not active by default)
  - Location: `packages/auth/` — completely separate, zero footprint if unused
  - Server setup: `packages/auth/src/server.ts` (Drizzle adapter, email/password)
  - Client hook: `packages/auth/src/client.ts`
  - Schema: `packages/auth/src/schema.ts` (users, sessions, accounts, verifications tables)
  - Env required: `BETTER_AUTH_SECRET` (not in default `.env.example`)
  - Reference: `docs/AUTH.md` for setup steps

**OAuth Integrations:**
- Not pre-configured (Better Auth supports Google, GitHub, etc. — requires user setup)

## Monitoring & Observability

**Error Tracking:**
- Not detected

**Analytics:**
- Not detected

**Logs:**
- Vercel logs (stdout/stderr only, no logging library configured)
- TanStack Router Devtools + TanStack Query Devtools — dev mode only (`apps/web/src/routes/__root.tsx`)

## CI/CD & Deployment

**Hosting:**
- Vercel - SPA + Edge Functions
  - Build command: `pnpm turbo run build --filter=@repo/web` (`vercel.json`)
  - Output directory: `apps/web/dist`
  - API: Edge Functions at `apps/api/api/[[...route]].ts` (runtime: edge)
  - Rewrites: `/api/*` → `apps/api`, `/*` → SPA fallback
  - Config: `vercel.json`

**CI Pipeline:**
- Not configured (no `.github/workflows/` directory)

## Environment Configuration

**Development:**
- Required env vars: `DATABASE_URL`
- Optional: `VITE_APP_URL`, `NODE_ENV`
- Secrets location: `.env` (gitignored — copy from `.env.example`)
- API dev server: `tsx watch` on port 3001 (no vercel login needed)

**Staging:**
- Not configured (same Vercel account, different env vars)

**Production:**
- Secrets management: Vercel dashboard → Settings → Environment Variables
- Database: Neon project with `DATABASE_URL` set in Vercel env

## Webhooks & Callbacks

**Incoming:**
- Not detected

**Outgoing:**
- Not detected

---

*Integration audit: 2026-06-07*
*Update when adding/removing external services*
