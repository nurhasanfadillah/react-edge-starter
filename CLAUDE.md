# react-edge-starter — Claude Code Context

Ini adalah **boilerplate/template React monorepo**, bukan aplikasi. Tidak ada fitur bisnis (auth, CRUD, billing, dll.). Tujuan: developer clone repo ini dan langsung mulai coding fitur tanpa setup ulang tooling.

---

## Stack

| Layer | Tech | Versi |
|-------|------|-------|
| Frontend | React + Vite + TypeScript | React 19, Vite 6 |
| Routing | TanStack Router (file-based, type-safe) | v1 |
| Server State | TanStack Query | v5 |
| Client State | Zustand (dengan persist middleware) | v5 |
| UI | shadcn/ui · Tailwind CSS v4 · dark mode | preset radix-vega |
| Backend | Hono.js · Vercel Edge Functions | Hono v4 |
| Database | Drizzle ORM · Neon PostgreSQL (serverless) | Drizzle v0.39 |
| Env | T3 Env + Zod | — |
| Monorepo | Turborepo + pnpm workspaces | Turbo 2.x |
| PWA | vite-plugin-pwa + Workbox | v1.3 |
| Deploy | Vercel (SPA + Edge Functions) | — |

---

## Monorepo Package Imports

```ts
// UI components (18 komponen tersedia)
import { Button, Card, Input, Dialog, Form } from '@repo/ui'

// cn() utility — PENTING: pakai path ini, bukan '@repo/ui/lib/utils'
import { cn } from '@repo/ui/src/lib/utils'

// Database client + schema
import { db, todos } from '@repo/db'

// Env validation (server-side, di apps/api)
import { env } from '@repo/env'
// Env validation (client-side, di apps/web)
import { env } from './lib/env'  // src/lib/env.ts di apps/web

// Shared configs (jarang diimport langsung)
// → sudah dikonfigurasi via tsconfig.json extends dan eslint.config.js
```

---

## Key Files

| File | Fungsi |
|------|--------|
| `apps/web/src/routes/__root.tsx` | Root layout — tambah global providers dan wrapper di sini |
| `apps/web/src/routes/index.tsx` | Halaman utama `/` |
| `apps/web/src/stores/app.ts` | Zustand store — theme dan global client state |
| `apps/web/src/lib/env.ts` | Frontend env vars (hanya VITE_* vars, pakai import.meta.env) |
| `apps/web/src/lib/query.ts` | QueryClient instance dengan default config |
| `apps/web/src/router.tsx` | Router factory — inject queryClient ke router context |
| `apps/web/src/routeTree.gen.ts` | **AUTO-GENERATED** — jangan edit, jangan replace |
| `apps/web/vite.config.ts` | Vite config: plugins, aliases, PWA manifest |
| `apps/api/src/index.ts` | Semua Hono route — tambah endpoint API di sini |
| `apps/api/api/[[...route]].ts` | Vercel Edge adapter — biasanya tidak perlu diubah |
| `packages/db/src/schema/index.ts` | Drizzle schema — definisikan tabel baru di sini |
| `packages/db/src/index.ts` | DB client (Neon + Drizzle) + schema re-export |
| `packages/env/src/index.ts` | T3 Env schema — tambah env var baru di sini |
| `packages/ui/src/index.ts` | Barrel exports semua komponen UI |
| `.env.example` | Template env vars — selalu update saat tambah var baru |

---

## Common Tasks

### Tambah route baru

Buat file di `apps/web/src/routes/`:
```tsx
// apps/web/src/routes/dashboard.tsx → route "/dashboard"
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return <div>Dashboard</div>
}
```
`routeTree.gen.ts` akan auto-update saat dev server berjalan.

### Tambah API endpoint

Edit `apps/api/src/index.ts`:
```ts
import { db, todos } from '@repo/db'

app.get('/todos', async (c) => {
  const result = await db.select().from(todos)
  return c.json(result)
})
```

CORS, logger middleware, dan global error handler sudah aktif by default.

### Tambah tabel database

1. Edit `packages/db/src/schema/index.ts`:
```ts
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
```
2. Generate migration: `pnpm --filter @repo/db db:generate`
3. Push ke DB: `pnpm --filter @repo/db db:push`

### Tambah environment variable

1. Edit `packages/env/src/index.ts` — tambah ke `server:` atau `client:` schema
2. Update `.env.example` dengan key dan contoh nilai
3. Di apps/api: akses via `env.MY_VAR`
4. Di apps/web (frontend): tambah prefix `VITE_`, akses via `env.VITE_MY_VAR` dari `src/lib/env.ts`

### Tambah komponen UI

Lihat `docs/COMPONENTS.md` untuk panduan lengkap monorepo workaround.
Singkatnya: run install dari `apps/web` dengan redirect alias sementara.

### Toggle dark mode

Dark mode dikelola via Zustand store — `ThemeProvider` di `__root.tsx` otomatis sync ke DOM:

```ts
const { setTheme } = useAppStore()
setTheme('dark')    // force dark
setTheme('light')   // force light
setTheme('system')  // ikuti preferensi OS (reaktif via matchMedia)
```

Jangan manipulasi `document.documentElement.classList` secara langsung — state tidak akan tersimpan. Selalu gunakan `setTheme`.

---

## Workflow Patterns

> Bagian ini untuk AI coding agent. Pola-pola di bawah mendeskripsikan urutan
> kerja yang benar untuk task yang paling sering diminta user.

### Memulai Fitur Baru

Urutan kerja saat user minta "buat halaman X" atau "tambah fitur Y":

1. **Tentukan entry point:**
   - Fitur butuh halaman UI? → buat route di `apps/web/src/routes/`
   - Fitur butuh data dari backend? → tambah endpoint di `apps/api/src/index.ts`
   - Fitur butuh tabel baru? → edit schema di `packages/db/src/schema/index.ts`

2. **Urutan yang benar (jika butuh ketiganya):**
   Schema DB → API endpoint → Frontend route → Komponen UI

3. **Verifikasi setelah selesai:**
   ```bash
   pnpm typecheck   # pastikan tidak ada type error baru
   pnpm lint        # pastikan tidak ada lint error baru
   ```

---

### Membangun Halaman dengan Data (CRUD Pattern)

User minta: "buat halaman daftar produk", "tampilkan list users", dsb.

**Step 1 — Schema (jika tabel belum ada):**
```ts
// packages/db/src/schema/index.ts
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})
```
Lalu push ke DB: `pnpm --filter @repo/db db:push` (dev) atau `pnpm --filter @repo/db db:migrate` (CI/non-TTY)

**Step 2 — API Endpoint:**
```ts
// apps/api/src/index.ts
import { db, products } from '@repo/db'

app.get('/products', async (c) => {
  const result = await db.select().from(products)
  return c.json(result)
})
```

**Step 3 — Frontend Route:**
```tsx
// apps/web/src/routes/products.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/products')({
  component: ProductsPage,
})

function ProductsPage() {
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('/api/products').then(r => r.json()),
  })
  return <div>{/* render data */}</div>
}
```

---

### Menambah Autentikasi (Auth Pattern)

Boilerplate ini tidak menyertakan auth — ini adalah pola yang direkomendasikan untuk menambahnya:

**Recommended approach:** Better Auth atau Lucia Auth
- Tambah dependency di `apps/api` dan `apps/web`
- Session/JWT disimpan di cookie (edge-compatible)
- Middleware di Hono: `apps/api/src/index.ts`
- Protected routes di TanStack Router: gunakan `beforeLoad` di `__root.tsx` atau per-route

**File yang perlu disentuh:**
| File | Perubahan |
|------|-----------|
| `packages/db/src/schema/index.ts` | Tambah tabel sessions/users |
| `packages/env/src/index.ts` | Tambah AUTH_SECRET ke server schema |
| `apps/api/src/index.ts` | Tambah auth routes dan middleware |
| `apps/web/src/routes/__root.tsx` | Tambah auth context dan redirect logic |
| `.env.example` | Tambah AUTH_SECRET |

---

### Menambah Komponen UI Baru

Jika komponen yang dibutuhkan belum ada di `packages/ui/src/components/ui/`:

```bash
# PENTING: Jalankan dari apps/web, bukan dari root atau packages/ui
cd apps/web
npx shadcn add [nama-komponen]
# Contoh: npx shadcn add table
#         npx shadcn add calendar
#         npx shadcn add command
```

Setelah install, tambahkan export di `packages/ui/src/index.ts`:
```ts
export * from './components/ui/table'
```

Lihat `docs/COMPONENTS.md` untuk daftar lengkap komponen yang tersedia.

---

### Troubleshooting

| Gejala | Kemungkinan Penyebab | Solusi |
|--------|---------------------|--------|
| `routeTree.gen.ts` error atau route tidak muncul | Dev server tidak berjalan | Jalankan `pnpm dev` — file ini auto-generated saat dev server aktif |
| Type error setelah tambah route baru | `routeTree.gen.ts` belum update | Simpan file route, tunggu dev server regenerate |
| `Cannot find module '@repo/ui'` | Dependency belum install | Jalankan `pnpm install` dari root |
| `import.meta.env.VITE_*` undefined di runtime | Env var belum di `.env` | Tambah ke `.env` (lihat `.env.example`), restart dev server |
| Database query error di production | `DATABASE_URL` belum di-set di Vercel | Set di Vercel dashboard → Settings → Environment Variables |
| Komponen shadcn tidak ditemukan | Belum ada di `packages/ui/src/index.ts` | Tambah export setelah install komponen |
| `pnpm dev` berjalan tapi app blank | Console error? Cek browser DevTools | Biasanya type error atau missing env var |

---

## Constraints (Jangan Dilanggar)

1. **Stack sudah fixed** — jangan ganti atau substitusi package inti (React, Vite, Hono, Drizzle, dll.)
2. **Template, bukan app** — jangan tambah fitur bisnis (login page, auth middleware, email, dsb.) ke boilerplate
3. **Dark mode via Tailwind class strategy** — toggle `.dark` di `<html>`, bukan via CSS `prefers-color-scheme`
4. **Deploy target: Vercel** — konfigurasi `vercel.json` dan Edge runtime diasumsikan
5. **Frontend env vars** — harus prefix `VITE_` agar Vite expose ke browser

---

## Gotchas Penting

| Masalah | Solusi |
|---------|--------|
| `import { cn } from '@repo/ui/lib/utils'` error | Gunakan `@repo/ui/src/lib/utils` (tsconfig alias resolve ke root, bukan src/) |
| `npx shadcn add` dari `packages/ui` tidak berjalan | Harus run dari `apps/web`; redirect alias `ui` di `components.json` dulu |
| `form.tsx` hang saat install via CLI | File ini ditulis manual — jangan reinstall via CLI |
| `routeTree.gen.ts` outdated | Pastikan dev server (`pnpm dev`) berjalan agar file auto-update |
| Env var tidak terbaca di frontend | Cek apakah sudah prefix `VITE_` dan ada di `src/lib/env.ts` |
| `import.meta.env` tidak dikenali TypeScript | File `src/vite-env.d.ts` sudah ada dengan `/// <reference types="vite/client" />` — jangan dihapus |
| Ubah `packages/ui` tapi browser tidak update | Vite cache stale — jalankan `pnpm dev:clean` untuk clear cache dan restart |
| Tambah `pt-*` ke `CardContent` untuk kompensasi header | Salah — `Card` sudah punya `gap-(--card-spacing)`. Lihat section Component Contracts |
| Wrap `Table` dengan `overflow-x-auto` lagi | Tidak perlu — `Table` sudah built-in overflow wrapper. Lihat section Component Contracts |
| Toggle dark mode via `classList.toggle('dark')` langsung | State tidak tersimpan — gunakan `useAppStore().setTheme(...)` agar sync ke Zustand + DOM |
| `db:push` gagal / minta TTY saat ada tabel auth | Gunakan `db:migrate` (`tsx src/migrate.ts`) — non-interactive, aman untuk Claude Code dan CI |
| Import komponen dari `@repo/ui/src/components/ui/*` | Melanggar contract — selalu import dari barrel export `@repo/ui` |

---

## Development Commands

```bash
pnpm dev              # Jalankan semua apps (web + api) dengan Turborepo
pnpm dev:clean        # Clear Vite cache + jalankan dev (pakai saat ubah packages/ui tidak ter-reflect)
pnpm build            # Build semua packages dan apps
pnpm lint             # ESLint semua packages
pnpm typecheck        # tsc --noEmit semua packages
pnpm format           # Prettier format semua files
pnpm test             # Vitest di semua packages

# Database (jalankan dari root atau --filter)
pnpm --filter @repo/db db:generate   # Generate migration dari schema
pnpm --filter @repo/db db:push       # Push schema ke DB (dev, butuh TTY interaktif)
pnpm --filter @repo/db db:migrate    # Jalankan migrations (non-TTY safe, gunakan ini di CI)
pnpm --filter @repo/db db:studio     # Buka Drizzle Studio (GUI)
```

---

## AI Agent Rules

> Rules ini bersifat **wajib**, bukan saran. Boilerplate ini dibangun khusus untuk
> pengembangan oleh AI agent — setiap keputusan UI harus mengikuti rules ini.

### Rule 1 — Preset First
**SELALU gunakan komponen dari `@repo/ui` sebelum membuat komponen custom.**
Cek daftar di "Component Catalog" di bawah sebelum memutuskan membuat sesuatu dari nol.
Pengecualian: user secara eksplisit meminta komponen custom.

### Rule 2 — Preserve Preset Styling
**JANGAN override CSS variable warna, spacing, atau typography preset `radix-vega`.**
Boleh: tambah utility classes Tailwind untuk layout (flex, grid, gap, padding).
Dilarang: ganti `--primary`, `--background`, `--radius`, atau token lain di CSS.
Pengecualian: user secara eksplisit meminta ganti tema/warna.

### Rule 3 — PageContent Wrapper
**SELALU wrap konten halaman dengan `PageContent` dari `@/components/page-content`.**
Jangan reinvent padding per-route. Gunakan:
```tsx
import { PageContent } from '@/components/page-content'

function MyPage() {
  return (
    <PageContent>
      {/* konten */}
    </PageContent>
  )
}
```

### Rule 4 — Route Templates
Template route siap kembangkan tersedia di `apps/web/src/routes/`:
- `_authenticated.tsx` — layout sidebar + header (h-screen + min-h-0 pattern)
- `_authenticated.dashboard.tsx` — halaman dashboard (referensi pola komponen)
- `login.tsx` — form login (UI demo, tambahkan logika auth sendiri)
- `signup.tsx` — form register (UI demo, tambahkan logika auth sendiri)

Saat membuat halaman baru yang butuh sidebar, buat route nested di dalam `_authenticated`:
file: `apps/web/src/routes/_authenticated.my-page.tsx`

### Rule 5 — Component Import
```ts
// BENAR
import { Button, Card, Switch } from '@repo/ui'

// SALAH — import langsung dari source
import { Button } from 'packages/ui/src/components/ui/button'
import { Button } from '@repo/ui/src/components/ui/button'
```

---

## Component Catalog

Semua komponen tersedia via `import { ... } from '@repo/ui'`.
Lihat route `/ui` untuk preview visual semua komponen.

### Primitives
`Button` `Input` `Label` `Textarea` `Badge` `Separator` `Skeleton`

### Avatar
`Avatar` `AvatarImage` `AvatarFallback` `AvatarGroup` `AvatarGroupCount` `AvatarBadge`

### Form Controls
`Checkbox` `Switch` `RadioGroup` `RadioGroupItem` `Slider`
`Select` `SelectTrigger` `SelectValue` `SelectContent` `SelectItem` (+ more parts)
`InputOTP` `InputOTPGroup` `InputOTPSlot` `InputOTPSeparator`
`Form` `FormField` `FormItem` `FormLabel` `FormControl` `FormDescription` `FormMessage` (react-hook-form)
`Field` `FieldGroup` `FieldLabel` `FieldDescription` `FieldSeparator` `FieldError` (+ more parts)
`InputGroup` `InputGroupAddon` `InputGroupButton` `InputGroupText`

### Layout & Containers
`Card` `CardHeader` `CardContent` `CardFooter` `CardTitle` `CardDescription` `CardAction`
`Tabs` `TabsList` `TabsTrigger` `TabsContent`
`Accordion` `AccordionItem` `AccordionTrigger` `AccordionContent`
`Collapsible` `CollapsibleTrigger` `CollapsibleContent`
`ScrollArea` `ScrollBar`
`Table` `TableHeader` `TableBody` `TableRow` `TableHead` `TableCell` `TableFooter` `TableCaption`

### Navigation
`Breadcrumb` `BreadcrumbList` `BreadcrumbItem` `BreadcrumbLink` `BreadcrumbPage` `BreadcrumbSeparator` `BreadcrumbEllipsis`
`Pagination` `PaginationContent` `PaginationItem` `PaginationLink` `PaginationPrevious` `PaginationNext` `PaginationEllipsis`
`NavigationMenu` `NavigationMenuList` `NavigationMenuItem` `NavigationMenuContent` `NavigationMenuTrigger` `NavigationMenuLink` `NavigationMenuViewport`
`Sidebar` `SidebarProvider` `SidebarContent` `SidebarHeader` `SidebarFooter` `SidebarGroup` `SidebarMenu` `SidebarMenuItem` `SidebarMenuButton` `SidebarTrigger` (+ 15 sub-komponen lain)

### Overlays & Popups
`Dialog` `DialogTrigger` `DialogContent` `DialogHeader` `DialogTitle` `DialogDescription` `DialogFooter` `DialogClose`
`Sheet` `SheetTrigger` `SheetContent` `SheetHeader` `SheetTitle` `SheetDescription` `SheetFooter`
`Popover` `PopoverTrigger` `PopoverContent`
`Tooltip` `TooltipProvider` `TooltipTrigger` `TooltipContent`
`AlertDialog` `AlertDialogTrigger` `AlertDialogContent` `AlertDialogHeader` `AlertDialogTitle` `AlertDialogDescription` `AlertDialogAction` `AlertDialogCancel`
`Drawer` `DrawerTrigger` `DrawerContent` `DrawerHeader` `DrawerTitle` `DrawerDescription` `DrawerFooter` `DrawerClose`
`HoverCard` `HoverCardTrigger` `HoverCardContent`
`Command` `CommandInput` `CommandList` `CommandEmpty` `CommandGroup` `CommandItem` `CommandSeparator`

### Feedback
`Alert` `AlertTitle` `AlertDescription`
`Progress`
`Toaster` (Sonner)

### Actions & Menus
`DropdownMenu` `DropdownMenuTrigger` `DropdownMenuContent` `DropdownMenuItem` `DropdownMenuSeparator` (+ more parts)
`Toggle` `toggleVariants` `ToggleGroup` `ToggleGroupItem`

### Data Visualization
`ChartContainer` `ChartTooltip` `ChartTooltipContent` `ChartLegend` `ChartLegendContent` `ChartStyle` (Recharts wrapper)
`Calendar` `CalendarDayButton` (react-day-picker)

---

## Component Contracts

> Komponen di `packages/ui` ini **berbeda dari upstream shadcn/ui**. Jangan asumsi perilaku shadcn standar.

### Card — Spacing Model

Card menggunakan CSS variable `--card-spacing` (default `1.5rem`/6, `size="sm"` → `1rem`/4).

| Slot | Spacing yang diterapkan |
|------|------------------------|
| `Card` | `py-(--card-spacing)` + `gap-(--card-spacing)` antar children |
| `CardHeader` | `px-(--card-spacing)` saja |
| `CardContent` | `px-(--card-spacing)` saja |
| `CardFooter` | `px-(--card-spacing)` saja |

**Jangan tambah `pt-*` ke `CardContent`** — gap vertikal sudah dikelola oleh `Card` via `gap-(--card-spacing)`.

Untuk table atau konten flush-edge: `<CardContent className="p-0">`.

### Table — Overflow Built-In

`Table` sudah memiliki wrapper `<div className="relative w-full overflow-x-auto">` di dalamnya.

**Jangan tambah `overflow-x-auto` lagi** di luar `Table`. Gunakan langsung:
```tsx
<CardContent className="p-0">
  <Table>...</Table>
</CardContent>
```

### Sidebar Layout Pattern

Untuk layout dengan sidebar, **wajib** pakai `h-screen` (bukan `min-h-screen`) di container root, dan `min-h-0` di `<main>`:

```tsx
// apps/web/src/routes/_authenticated.tsx (atau layout serupa)
<div className="flex h-screen bg-background">
  <aside className="...">...</aside>
  {/* min-h-0 wajib — tanpanya flex item tidak bisa shrink dan overflow tidak aktif */}
  <main className="flex min-h-0 flex-1 flex-col overflow-auto">
    <Outlet />
  </main>
</div>
```

`min-h-screen` membuat container tumbuh melebihi viewport sehingga `overflow-auto` di `main` tidak pernah aktif.

### PageContent — Standard Page Wrapper

Gunakan `PageContent` dari `apps/web/src/components/page-content.tsx` sebagai wrapper konten halaman:

```tsx
import { PageContent } from '@/components/page-content'

function MyPage() {
  return (
    <PageContent>
      <h1>Judul</h1>
      {/* konten halaman */}
    </PageContent>
  )
}
```

Class yang diterapkan: `px-4 py-4 md:py-6 lg:px-6 space-y-6 flex flex-col flex-1`. Jangan reinvent padding per-route.

---

## Referensi Lanjutan

- `docs/COMPONENTS.md` — katalog 18 komponen UI + cara install komponen baru
- `docs/CODEBASE.md` — peta codebase lengkap dengan architecture dan file reference
- `.env.example` — semua environment variables yang dibutuhkan
