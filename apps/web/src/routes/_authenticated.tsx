import { Outlet, createFileRoute } from '@tanstack/react-router'
import { SidebarProvider } from '@repo/ui/src/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  // h-screen: container tidak melebihi viewport (bukan min-h-screen)
  // min-h-0 pada main: wajib agar flex item bisa shrink dan overflow-auto aktif
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar />
        <main className="flex min-h-0 flex-1 flex-col overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
