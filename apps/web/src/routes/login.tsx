import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/components/login-form'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

// UI demo — form ini tidak terhubung ke auth.
// Untuk implementasi nyata: panggil authClient.signIn.email({ email, password })
// Lihat docs/AUTH.md untuk panduan lengkap aktivasi Better Auth.
function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
