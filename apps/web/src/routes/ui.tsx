import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { PageContent } from '@/components/page-content'
import {
  // Primitives
  Button,
  Input,
  Label,
  Textarea,
  Badge,
  Separator,
  Skeleton,
  // Avatar
  Avatar,
  AvatarImage,
  AvatarFallback,
  // Card
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  // Tabs
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  // Accordion
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  // Collapsible
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  // Form controls
  Checkbox,
  Switch,
  RadioGroup,
  RadioGroupItem,
  Slider,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  // Overlays
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  // Navigation
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  // Data display
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  // Feedback
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
  // Scroll Area
  ScrollArea,
  // Toggle
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  // Dropdown
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@repo/ui'

export const Route = createFileRoute('/ui')({
  component: UIShowcase,
})

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-4">
      <h2 className="border-b pb-2 text-lg font-medium">{title}</h2>
      <div className="flex flex-wrap items-start gap-3">{children}</div>
    </section>
  )
}

function UIShowcase() {
  const [progress, setProgress] = React.useState(60)
  const [checked, setChecked] = React.useState(false)
  const [switched, setSwitched] = React.useState(false)
  const [sliderValue, setSliderValue] = React.useState([40])
  const [collapsibleOpen, setCollapsibleOpen] = React.useState(false)

  return (
    <TooltipProvider>
      <PageContent>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">UI Component Showcase</h1>
          <p className="text-sm text-muted-foreground">
            Semua komponen dari <code className="font-mono text-xs">@repo/ui</code> — referensi
            visual untuk AI agent dan developer. Route: <code className="font-mono text-xs">/ui</code>
          </p>
        </div>

        {/* Primitives */}
        <Section title="Primitives — Button">
          <Button>Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </Section>

        <Section title="Primitives — Badge">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </Section>

        <Section title="Primitives — Input, Textarea, Label">
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Label htmlFor="demo-input">Email</Label>
            <Input id="demo-input" type="email" placeholder="m@example.com" />
          </div>
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Label htmlFor="demo-textarea">Catatan</Label>
            <Textarea id="demo-textarea" placeholder="Tulis sesuatu..." rows={3} />
          </div>
          <div className="flex w-full max-w-sm flex-col gap-2">
            <Label htmlFor="demo-disabled">Disabled</Label>
            <Input id="demo-disabled" placeholder="Tidak bisa diisi" disabled />
          </div>
        </Section>

        <Section title="Primitives — Avatar, Skeleton, Separator">
          <Avatar>
            <AvatarImage src="/avatars/shadcn.jpg" alt="User" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-4 w-48 rounded" />
          <div className="flex h-10 items-center gap-2">
            <span className="text-sm">Kiri</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-sm">Kanan</span>
          </div>
        </Section>

        {/* Form Controls */}
        <Section title="Form Controls — Checkbox, Switch, RadioGroup">
          <div className="flex items-center gap-2">
            <Checkbox
              id="demo-cb"
              checked={checked}
              onCheckedChange={(v) => setChecked(!!v)}
            />
            <Label htmlFor="demo-cb">Checkbox</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="demo-sw"
              checked={switched}
              onCheckedChange={setSwitched}
            />
            <Label htmlFor="demo-sw">Switch {switched ? 'On' : 'Off'}</Label>
          </div>
          <RadioGroup defaultValue="b" className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="a" id="r-a" />
              <Label htmlFor="r-a">Pilihan A</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="b" id="r-b" />
              <Label htmlFor="r-b">Pilihan B</Label>
            </div>
          </RadioGroup>
        </Section>

        <Section title="Form Controls — Slider, Select">
          <div className="w-48 space-y-2">
            <Label>Slider: {sliderValue[0]}%</Label>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              min={0}
              max={100}
              step={10}
            />
          </div>
          <Select defaultValue="b">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Pilih..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a">Opsi A</SelectItem>
              <SelectItem value="b">Opsi B</SelectItem>
              <SelectItem value="c">Opsi C</SelectItem>
            </SelectContent>
          </Select>
        </Section>

        {/* Layout */}
        <Section title="Layout — Card">
          <Card className="w-64">
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Deskripsi singkat</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Konten card di sini.</p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Aksi</Button>
            </CardFooter>
          </Card>
          <Card size="sm" className="w-48">
            <CardHeader>
              <CardTitle>Card SM</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">size=sm spacing</p>
            </CardContent>
          </Card>
        </Section>

        <Section title="Layout — Tabs">
          <Tabs defaultValue="tab1" className="w-80">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-2 text-sm">Konten Tab 1</TabsContent>
            <TabsContent value="tab2" className="mt-2 text-sm">Konten Tab 2</TabsContent>
            <TabsContent value="tab3" className="mt-2 text-sm">Konten Tab 3</TabsContent>
          </Tabs>
        </Section>

        <Section title="Layout — Accordion, Collapsible">
          <Accordion type="single" collapsible className="w-72">
            <AccordionItem value="a1">
              <AccordionTrigger>Item Pertama</AccordionTrigger>
              <AccordionContent>Konten accordion pertama.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="a2">
              <AccordionTrigger>Item Kedua</AccordionTrigger>
              <AccordionContent>Konten accordion kedua.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="a3">
              <AccordionTrigger>Item Ketiga</AccordionTrigger>
              <AccordionContent>Konten accordion ketiga.</AccordionContent>
            </AccordionItem>
          </Accordion>
          <Collapsible
            open={collapsibleOpen}
            onOpenChange={setCollapsibleOpen}
            className="w-60"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm">
                {collapsibleOpen ? 'Sembunyikan' : 'Tampilkan'} Detail
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
              Ini konten collapsible yang tersembunyi.
            </CollapsibleContent>
          </Collapsible>
        </Section>

        {/* Data Display */}
        <Section title="Data Display — Table, Progress, ScrollArea">
          <Table className="w-96">
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Nilai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Alice</TableCell>
                <TableCell><Badge variant="secondary">Aktif</Badge></TableCell>
                <TableCell>98</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bob</TableCell>
                <TableCell><Badge variant="outline">Pending</Badge></TableCell>
                <TableCell>74</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carol</TableCell>
                <TableCell><Badge variant="destructive">Nonaktif</Badge></TableCell>
                <TableCell>12</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="w-60 space-y-3">
            <div className="space-y-1">
              <Label className="text-xs">Progress 30%</Label>
              <Progress value={30} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Progress {progress}%</Label>
              <Progress value={progress} />
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={() => setProgress((p) => Math.max(0, p - 10))}>−</Button>
                <Button size="sm" variant="outline" onClick={() => setProgress((p) => Math.min(100, p + 10))}>+</Button>
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Progress 90%</Label>
              <Progress value={90} />
            </div>
          </div>
          <ScrollArea className="h-32 w-48 rounded border p-2">
            {Array.from({ length: 12 }, (_, i) => (
              <p key={i} className="py-1 text-sm">Item scroll {i + 1}</p>
            ))}
          </ScrollArea>
        </Section>

        {/* Navigation */}
        <Section title="Navigation — Breadcrumb, Pagination">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Kategori</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Item Ini</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Section>

        {/* Overlays */}
        <Section title="Overlays — Dialog, Sheet, Tooltip, HoverCard">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Buka Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>Ini adalah deskripsi dialog.</DialogDescription>
              </DialogHeader>
              <p className="text-sm">Konten dialog bebas di sini.</p>
              <DialogFooter>
                <Button size="sm">Konfirmasi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Buka Sheet</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Sheet Panel</SheetTitle>
              </SheetHeader>
              <p className="mt-4 text-sm text-muted-foreground">Konten side sheet di sini.</p>
            </SheetContent>
          </Sheet>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover Tooltip</Button>
            </TooltipTrigger>
            <TooltipContent>Ini adalah tooltip</TooltipContent>
          </Tooltip>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">Hover Card</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-60">
              <p className="text-sm">Preview konten saat hover di sini.</p>
            </HoverCardContent>
          </HoverCard>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Dropdown</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Pengaturan</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Keluar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>

        {/* Feedback */}
        <Section title="Feedback — Alert">
          <Alert className="w-80">
            <AlertTitle>Informasi</AlertTitle>
            <AlertDescription>Ini adalah pesan alert default.</AlertDescription>
          </Alert>
          <Alert variant="destructive" className="w-80">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Terjadi kesalahan. Coba lagi nanti.</AlertDescription>
          </Alert>
        </Section>

        {/* Toggle */}
        <Section title="Actions — Toggle, ToggleGroup">
          <Toggle aria-label="Bold">B</Toggle>
          <Toggle aria-label="Italic" variant="outline">I</Toggle>
          <ToggleGroup type="single" defaultValue="center">
            <ToggleGroupItem value="left">Kiri</ToggleGroupItem>
            <ToggleGroupItem value="center">Tengah</ToggleGroupItem>
            <ToggleGroupItem value="right">Kanan</ToggleGroupItem>
          </ToggleGroup>
        </Section>

        {/* Note */}
        <Section title="Komponen Lanjutan">
          <Alert className="w-full">
            <AlertTitle>Chart, Calendar, Command, Drawer, AlertDialog, InputOTP</AlertTitle>
            <AlertDescription>
              Komponen ini tersedia di <code className="font-mono text-xs">@repo/ui</code> namun tidak ditampilkan di showcase
              karena memerlukan setup tambahan. Lihat{' '}
              <code className="font-mono text-xs">docs/COMPONENTS.md</code> untuk panduan penggunaan.
            </AlertDescription>
          </Alert>
        </Section>
      </PageContent>
    </TooltipProvider>
  )
}
