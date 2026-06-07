import { createFileRoute } from '@tanstack/react-router'
import { SignupForm } from '@/components/signup-form'

export const Route = createFileRoute('/signup')({
  component: SignupPage,
})

// UI demo — form ini tidak terhubung ke auth.
// Untuk implementasi nyata: panggil authClient.signUp.email({ email, password, name })
// Lihat docs/AUTH.md untuk panduan lengkap aktivasi Better Auth.
function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
