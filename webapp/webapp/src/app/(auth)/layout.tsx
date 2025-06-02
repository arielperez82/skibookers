'use client'

import { AppProvider } from '@webapp/providers/AppProvider'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  )
} 