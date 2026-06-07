# Coding Conventions

**Analysis Date:** 2026-06-07

## Naming Patterns

**Files:**
- kebab-case for all `.ts`/`.tsx` source files: `app-sidebar.tsx`, `data-table.tsx`, `use-mobile.ts`
- TanStack Router special prefixes: `__root.tsx`, `_authenticated.tsx` (layout), `$paramName.tsx` (dynamic)
- Config files: camelCase — `vite.config.ts`, `drizzle.config.ts`, `eslint.config.js`

**Functions / Components:**
- PascalCase for React components: `function LoginForm()`, `function DataTable()`
- camelCase for utilities and hooks: `export function cn()`, `export function useIsMobile()`
- camelCase for handlers: `handleDragEnd`, `onChange`, `handleSubmit`

**Variables:**
- camelCase for all variables
- No underscore prefix convention (TypeScript private markers unused)

**Types:**
- PascalCase for interfaces: `interface RouterContext`
- PascalCase for type aliases: `type Theme = 'light' | 'dark' | 'system'`
- No `I` prefix for interfaces (e.g., `User` not `IUser`)

## Code Style

**Formatting (Prettier):**
- Config: `.prettierrc` (references `packages/config/prettier/index.js`)
- `semi: false` — No semicolons
- `singleQuote: true` — Single quotes for strings
- `tabWidth: 2` — 2-space indentation
- `trailingComma: 'es5'` — Trailing commas in arrays/objects
- `printWidth: 100` — Max line length 100 chars
- Run: `pnpm format`

**Linting (ESLint):**
- Flat config format (`eslint.config.js` per package)
- Base: `packages/config/eslint/index.js` — TypeScript recommended + Prettier + no-console warn
- React: `packages/config/eslint/react.js` — Extends base + react-hooks rules
- `@typescript-eslint/no-unused-vars` — Warn (ignores args prefixed with `_`)
- `@typescript-eslint/no-explicit-any` — Warn
- Run: `pnpm lint`

## Import Organization

**Order (inferred from source files):**
1. External packages: `react`, `@tanstack/react-router`, `@repo/ui`
2. Internal workspace imports: `@repo/ui/src/lib/utils`, `@repo/db`
3. Local absolute imports: `@/components/page-content`, `~/stores/app`
4. Relative imports: `./external`, `../types`
5. Type imports: `import type { QueryClient }`

**Path Aliases:**
- `@/*` → `apps/web/src/*` (configured in `apps/web/tsconfig.json` and `apps/web/vite.config.ts`)
- `~/*` → `apps/web/src/*` (alternate alias)
- `@repo/ui/*` → `packages/ui/*` (monorepo workspace)

**Key Import Rules (from CLAUDE.md):**
- UI components: `import { Button } from '@repo/ui'` — always from barrel
- cn utility: `import { cn } from '@repo/ui/src/lib/utils'` — NOT `@repo/ui/lib/utils`
- Page wrapper: `import { PageContent } from '@/components/page-content'`

## TypeScript Patterns

**Strict Mode:**
- `strict: true` in `packages/config/typescript/base.json` — full type checking
- `skipLibCheck: true` — skip declaration file type checking
- `moduleResolution: "bundler"` — modern bundler resolution

**Common Patterns:**
- Explicit `import type` for type-only imports: `import type { QueryClient } from '@tanstack/react-query'`
- React component props via `React.ComponentProps<"button">` for HTML element extension
- Zod schema inference: `type FormValues = z.infer<typeof formSchema>`
- RouterContext interface defined and exported from `apps/web/src/routes/__root.tsx`

**Exports:**
- Named exports preferred everywhere
- Components: `export function ComponentName()` (named, not default)
- Barrel exports via `index.ts` for packages

## Error Handling

**Patterns:**
- No established custom error class pattern (template-level)
- TanStack Query: `retry: 1` default, no global `onError` (user adds their own)
- API routes: no global error middleware (user adds via Hono middleware)

## Logging

**Framework:**
- Console only — no structured logging library
- `no-console` ESLint rule set to `warn` (allows console in dev, flags in code review)
- Vercel captures stdout/stderr in production

## Comments

**When to Comment:**
- Workarounds and non-obvious decisions (documented extensively in CLAUDE.md)
- Gotchas: `// AUTO-GENERATED — jangan edit` style comments in `routeTree.gen.ts`
- No JSDoc on internal functions — TypeScript types are self-documenting

## Function Design

**Component Structure:**
- Single named export per route file: `export const Route = createFileRoute(...)`
- Co-located component function below the route definition
- Props typed inline or via extracted interface

**Module Design:**
- Barrel exports via `index.ts` for all public packages
- Internal helpers not exported from index (kept private to package)
- No circular dependencies between packages

---

*Convention analysis: 2026-06-07*
*Update when patterns change*
