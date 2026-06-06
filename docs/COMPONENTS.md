# Components

Reference untuk semua komponen UI yang tersedia di template ini.

---

## Included Components

18 komponen sudah terinstall di `packages/ui` dan siap digunakan.

```ts
import { ComponentName } from '@repo/ui'
```

| Component | Import | Description |
|-----------|--------|-------------|
| Avatar | `Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge` | Gambar profil dengan fallback dan varian grup |
| Badge | `Badge, badgeVariants` | Label kecil untuk status, kategori, atau notifikasi |
| Button | `Button, buttonVariants` | Tombol dengan berbagai varian dan ukuran |
| Card | `Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent` | Container konten dengan header dan footer |
| Dialog | `Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger` | Modal dialog |
| Dropdown Menu | `DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuRadioGroup` | Menu dropdown dengan sub-menu dan aksi |
| Form | `Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField, useFormField` | Form dengan react-hook-form integration |
| Input | `Input` | Text input field |
| Label | `Label` | Label aksesibel untuk form controls |
| Popover | `Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverHeader, PopoverTitle, PopoverDescription` | Floating content yang muncul di atas elemen |
| Select | `Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectGroup, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton` | Dropdown pilihan dengan search |
| Separator | `Separator` | Garis pemisah horizontal atau vertikal |
| Sheet | `Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription` | Panel slide dari tepi layar |
| Skeleton | `Skeleton` | Placeholder loading state |
| Sonner | `Toaster` | Toast notifications |
| Tabs | `Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants` | Navigasi tab dengan panels |
| Textarea | `Textarea` | Multi-line text input |
| Tooltip | `Tooltip, TooltipTrigger, TooltipContent, TooltipProvider` | Popup info saat hover |

> Semua komponen menggunakan style **radix-vega** (preset `b1FjRZntw`) dengan Inter font dan oklch color tokens.

---

## Adding More Components

Komponen tambahan bisa diinstall dari registry shadcn/ui. Template ini menggunakan **monorepo setup** sehingga perlu workaround saat install — `packages/ui` bukan Vite app, jadi shadcn CLI harus dijalankan dari `apps/web`.

### Install Steps

```bash
# 1. Buka apps/web/components.json, ubah aliases.ui:
#    "ui": "@/components/ui"  →  "ui": "@repo/ui/src/components/ui"

# 2. Install komponen dari apps/web:
cd apps/web
npx shadcn@latest add [component-name] --overwrite

# 3. Restore apps/web/components.json aliases.ui:
#    "ui": "@repo/ui/src/components/ui"  →  "@/components/ui"

# 4. Export komponen baru di packages/ui/src/index.ts:
#    export { ComponentName } from './components/ui/[component-name]'
```

### Available Components

| Component | Install Command | Notes |
|-----------|----------------|-------|
| Accordion | `npx shadcn@latest add accordion` | Collapsible sections |
| Alert | `npx shadcn@latest add alert` | Callout untuk pesan penting |
| Alert Dialog | `npx shadcn@latest add alert-dialog` | Konfirmasi dialog yang memblokir interaksi |
| Aspect Ratio | `npx shadcn@latest add aspect-ratio` | Container dengan rasio tetap |
| Breadcrumb | `npx shadcn@latest add breadcrumb` | Navigasi hierarki halaman |
| Calendar | `npx shadcn@latest add calendar` | Pemilih tanggal |
| Carousel | `npx shadcn@latest add carousel` | Slide carousel dengan Embla |
| Chart | `npx shadcn@latest add chart` | Charts dengan Recharts |
| Checkbox | `npx shadcn@latest add checkbox` | Checkbox input |
| Collapsible | `npx shadcn@latest add collapsible` | Panel expand/collapse |
| Command | `npx shadcn@latest add command` | Command palette / search |
| Context Menu | `npx shadcn@latest add context-menu` | Menu klik kanan |
| Drawer | `npx shadcn@latest add drawer` | Bottom drawer (mobile-friendly) |
| Hover Card | `npx shadcn@latest add hover-card` | Preview card saat hover link |
| Input OTP | `npx shadcn@latest add input-otp` | OTP input dengan auto-advance |
| Menubar | `npx shadcn@latest add menubar` | Menu bar desktop-style |
| Navigation Menu | `npx shadcn@latest add navigation-menu` | Navigation dengan dropdown |
| Pagination | `npx shadcn@latest add pagination` | Navigasi halaman |
| Progress | `npx shadcn@latest add progress` | Progress bar |
| Radio Group | `npx shadcn@latest add radio-group` | Radio button group |
| Resizable | `npx shadcn@latest add resizable` | Panel yang bisa di-resize |
| Scroll Area | `npx shadcn@latest add scroll-area` | Custom scrollbar |
| Sidebar | `npx shadcn@latest add sidebar` | Sidebar navigasi (dibutuhkan oleh blocks) |
| Slider | `npx shadcn@latest add slider` | Range input slider |
| Switch | `npx shadcn@latest add switch` | Toggle switch |
| Table | `npx shadcn@latest add table` | Tabel data dasar |
| Toast | `npx shadcn@latest add toast` | Toast notifications (alternatif Sonner) |
| Toggle | `npx shadcn@latest add toggle` | Tombol on/off |
| Toggle Group | `npx shadcn@latest add toggle-group` | Grup toggle buttons |

---

## Page Blocks

Blocks adalah page-level templates siap pakai — layout lengkap yang langsung bisa digunakan sebagai titik awal halaman.

### Install

Blocks diinstall langsung ke `apps/web` tanpa alias workaround:

```bash
cd apps/web
npx shadcn@latest add [block-name]
```

Komponen akan muncul di `apps/web/src/components/[block-name]/`.

### Available Blocks

| Block | Install Command | Dependencies | Description |
|-------|----------------|--------------|-------------|
| `dashboard-01` | `npx shadcn@latest add dashboard-01` | sidebar | Layout dashboard dengan sidebar, header, dan area konten |
| `login-02` | `npx shadcn@latest add login-02` | — | Halaman login dengan form email + password |
| `signup-02` | `npx shadcn@latest add signup-02` | — | Halaman signup/register |
| `sidebar-07` | `npx shadcn@latest add sidebar-07` | sidebar | Layout dengan sidebar navigasi |

> **Catatan:** Block yang membutuhkan komponen `sidebar` — install komponen sidebar ke `packages/ui` dulu menggunakan instruksi di section sebelumnya, lalu install block-nya.

---

## Notes

### Kenapa perlu workaround?

`packages/ui` adalah TypeScript library package, bukan aplikasi Vite/Next.js. shadcn CLI mendeteksi framework berdasarkan file konfigurasi (`vite.config.ts`, `next.config.js`, dll). Karena `packages/ui` tidak punya file tersebut, CLI gagal.

Solusinya: jalankan CLI dari `apps/web` (Vite app), tapi redirect `aliases.ui` sementara agar komponen terinstall ke `packages/ui/src/components/ui/`, bukan ke `apps/web/src/components/ui/`.

### Icon library

Template ini menggunakan **HugeIcons** (`iconLibrary: "hugeicons"`) sesuai preset `b1FjRZntw`. Komponen yang diinstall mungkin menggunakan HugeIcons icons.

```bash
# Sudah terinstall di apps/web:
@hugeicons/core-free-icons
@hugeicons/react
```
