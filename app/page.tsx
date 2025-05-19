'use client'

import LoginForm from '@/components/auth/login-form'

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <LoginForm />
    </main>
  )
}