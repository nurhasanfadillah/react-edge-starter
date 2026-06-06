import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-3xl font-bold tracking-tight">shadcn-preset</h1>
      <p className="text-muted-foreground text-sm">
        React · Vite · TanStack Router · shadcn/ui
      </p>
    </main>
  )
}
