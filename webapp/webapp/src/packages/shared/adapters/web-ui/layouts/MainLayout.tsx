'use client'

import { useAuth } from '@auth/adapters/web-ui/useAuth'
import { useNavigation } from '@shared/adapters/web-ui/hooks/useNavigation'
import Header from '@shared/adapters/web-ui/components/Header'
import BottomNav from '@shared/adapters/web-ui/components/BottomNav'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, signOut } = useAuth()
  const { navigate } = useNavigation()

  const handleSignout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {user && <Header handleSignout={handleSignout} />}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        {children}
      </main>
      {user && <BottomNav />}
    </div>
  )
} 