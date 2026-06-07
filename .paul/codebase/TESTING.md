# Testing Patterns

**Analysis Date:** 2026-06-07

## Test Framework

**Current State: NO TEST FRAMEWORK CONFIGURED**

No test dependencies, test files, or test configs exist in any package. This is a known gap.

- No `jest`, `vitest`, or `@testing-library` in any `package.json`
- No `.test.ts`, `.test.tsx`, `.spec.ts`, `.spec.tsx` files anywhere
- No `vitest.config.ts` or `jest.config.js`
- `pnpm test` script exists in root `package.json` but is not wired to any runner

**Packages checked:**
- `package.json` (root), `apps/web/package.json`, `apps/api/package.json`
- `packages/ui/package.json`, `packages/db/package.json`, `packages/auth/package.json`

## Code Quality Tools (What Exists Instead)

**Type Checking:**
```bash
pnpm typecheck    # tsc --noEmit across all packages
```

**Linting:**
```bash
pnpm lint         # ESLint across all packages
```

**Manual Visual Testing:**
- `apps/web/src/routes/ui.tsx` — component showcase at `/ui` route (manual visual inspection)

## Recommended Setup (When Implementing Tests)

**Recommended Framework: Vitest**
- Native Vite ecosystem (zero config for `apps/web`)
- ESM-native, TypeScript support
- Compatible with existing Turborepo setup

**Packages to Add:**
```bash
pnpm add -D vitest @testing-library/react @testing-library/user-event jsdom --filter @repo/web
pnpm add -D vitest @hono/node-server --filter @repo/api
```

**Suggested Config** (`apps/web/vitest.config.ts`):
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
})
```

**Run Commands (once configured):**
```bash
pnpm test                     # Run all tests (Turborepo)
pnpm test --watch             # Watch mode
pnpm test:coverage            # Coverage report
```

## Suggested Test File Organization

**Pattern:** Co-locate tests with source files

```
apps/web/src/
  stores/
    app.ts
    app.test.ts           # Zustand store tests
  components/
    data-table.tsx
    data-table.test.tsx   # Component tests
  hooks/
    use-mobile.ts
    use-mobile.test.ts    # Hook tests
apps/api/src/
  index.ts
  index.test.ts           # API route tests
packages/db/src/
  schema/
    index.ts
    index.test.ts         # Schema validation tests
```

## Priority Test Targets

**High priority — most value for effort:**
1. `apps/web/src/stores/app.ts` — Zustand store (theme toggle, persistence)
2. `apps/web/src/hooks/use-mobile.ts` — Hook behavior
3. `packages/db/src/index.ts` — DB proxy lazy init
4. `apps/api/src/index.ts` — Hono route handlers

**Medium priority:**
5. `apps/web/src/lib/env.ts` — Env validation edge cases
6. UI component rendering (snapshot or interaction tests)

## Test Types (Once Implemented)

**Unit Tests:**
- Scope: Single function or hook in isolation
- Examples: Zustand store actions, utility functions, env validation
- Mock: External APIs, database calls

**Integration Tests:**
- Scope: Route handler + database interaction
- Examples: Hono routes with real Drizzle queries against test DB

**E2E Tests:**
- Framework: Playwright recommended (Vercel ecosystem compatible)
- Scope: Full user flows (dashboard load, form submission)
- Location: `e2e/` directory at root

## Coverage

**Requirements:**
- No enforced target (not yet configured)
- When implemented: recommend 70% threshold for `apps/web/src/`

---

*Testing analysis: 2026-06-07*
*Update when test infrastructure is added*
