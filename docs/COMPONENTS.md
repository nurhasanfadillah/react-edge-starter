# Components

Reference untuk semua komponen UI yang tersedia di template ini.

---

## Included Components

> **40+ komponen sudah terinstall** di `packages/ui` dan siap digunakan via `import { ... } from '@repo/ui'`.
> Lihat route `/ui` untuk preview visual semua komponen.

```ts
import { ComponentName } from '@repo/ui'
```

| Component | Import | Description |
|-----------|--------|-------------|
| Accordion | `Accordion, AccordionItem, AccordionTrigger, AccordionContent` | Collapsible sections |
| Alert | `Alert, AlertTitle, AlertDescription` | Pesan callout informatif |
| Alert Dialog | `AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel` | Konfirmasi dialog blocking |
| Avatar | `Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge` | Gambar profil dengan fallback dan varian grup |
| Badge | `Badge, badgeVariants` | Label kecil untuk status, kategori, atau notifikasi |
| Breadcrumb | `Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis` | Navigasi hierarki halaman |
| Button | `Button, buttonVariants` | Tombol dengan berbagai varian dan ukuran |
| Calendar | `Calendar, CalendarDayButton` | Pemilih tanggal (react-day-picker) |
| Card | `Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent` | Container konten dengan header dan footer |
| Chart | `ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle` | Recharts wrapper |
| Checkbox | `Checkbox` | Checkbox input |
| Collapsible | `Collapsible, CollapsibleTrigger, CollapsibleContent` | Panel expand/collapse |
| Command | `Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut` | Command palette / search |
| Dialog | `Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger` | Modal dialog |
| Drawer | `Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose` | Bottom drawer (mobile-friendly) |
| Dropdown Menu | `DropdownMenu` + 14 sub-komponen | Menu dropdown dengan sub-menu dan aksi |
| Field | `Field, FieldGroup, FieldLabel, FieldDescription, FieldSeparator, FieldError, FieldSet, FieldContent, FieldTitle` | Form field primitives |
| Form | `Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField, useFormField` | Form dengan react-hook-form integration |
| Hover Card | `HoverCard, HoverCardTrigger, HoverCardContent` | Preview card saat hover |
| Input | `Input` | Text input field |
| Input Group | `InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea` | Input dengan addon/icon |
| Input OTP | `InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator` | OTP input dengan auto-advance |
| Label | `Label` | Label aksesibel untuk form controls |
| Navigation Menu | `NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink, NavigationMenuViewport` | Navigation dengan dropdown |
| Pagination | `Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis` | Navigasi halaman |
| Popover | `Popover, PopoverTrigger, PopoverContent, PopoverAnchor` | Floating content yang muncul di atas elemen |
| Progress | `Progress` | Progress bar |
| Radio Group | `RadioGroup, RadioGroupItem` | Radio button group |
| Scroll Area | `ScrollArea, ScrollBar` | Custom scrollbar |
| Select | `Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel, SelectGroup, SelectSeparator` | Dropdown pilihan |
| Separator | `Separator` | Garis pemisah horizontal atau vertikal |
| Sheet | `Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription` | Panel slide dari tepi layar |
| Sidebar | `Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarFooter, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger` + 15 sub-komponen | Sidebar navigasi lengkap |
| Skeleton | `Skeleton` | Placeholder loading state |
| Slider | `Slider` | Range input slider |
| Sonner | `Toaster` | Toast notifications |
| Switch | `Switch` | Toggle switch |
| Table | `Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter, TableCaption` | Tabel data (padding px-4/py-3) |
| Tabs | `Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants` | Navigasi tab dengan panels |
| Textarea | `Textarea` | Multi-line text input |
| Toggle | `Toggle, toggleVariants` | Tombol on/off |
| Toggle Group | `ToggleGroup, ToggleGroupItem` | Grup toggle buttons |
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

## Installed Blocks

4 blocks sudah terinstall di `apps/web/src/components/` dan tersedia sebagai routes:

| Block | Components | Route | Description |
|-------|-----------|-------|-------------|
| `dashboard-01` | `AppSidebar`, `SiteHeader`, `SectionCards`, `ChartAreaInteractive`, `DataTable`, `NavMain`, `NavDocuments`, `NavSecondary`, `NavUser`, `TeamSwitcher` | `/dashboard` | Layout dashboard dengan sidebar, header, dan area konten |
| `sidebar-07` | Merged ke `dashboard-01` components | `/_authenticated` (layout) | Layout sidebar navigasi |
| `login-02` | `LoginForm` | `/login` | Form login (UI demo, tanpa logika auth) |
| `signup-02` | `SignupForm` | `/signup` | Form register (UI demo, tanpa logika auth) |

Route `/_authenticated` adalah **layout route** — semua halaman yang membutuhkan sidebar cukup dibuat di dalam:
```
apps/web/src/routes/_authenticated.my-page.tsx  →  /my-page (dengan sidebar)
```

## Page Blocks — Adding More

Blocks tambahan bisa diinstall langsung ke `apps/web`:

```bash
cd apps/web
npx shadcn@latest add [block-name]
```

> **Catatan:** Block yang membutuhkan komponen `sidebar` — sudah tersedia di `packages/ui`.

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
