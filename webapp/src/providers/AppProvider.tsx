'use client'
import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AuthProvider } from '@auth/adapters/web-ui/AuthProvider'
import { type BrowserAuthService } from '@auth/application/ports/auth-service'
import { QuizProvider } from '@personalization/adapters/web-ui/QuizProvider'
import { LinkProvider } from '@shared/adapters/web-ui/providers/LinkProvider'
import { ImageProvider } from '@shared/adapters/web-ui/providers/ImageProvider'
import { ClientServiceRegistrar } from '@webapp/registry/client-service-registrar'
import { NextNavigationProvider } from '@webapp/providers/NextNavigationProvider'

interface Props {
  children: ReactNode
}

export function AppProvider({ children }: Props) {
  const registry = ClientServiceRegistrar.createRegistry();
    
  return (
    <AuthProvider authService={registry.get<BrowserAuthService>('authService')}>
      <NextNavigationProvider>
        <LinkProvider component={Link}>
          <ImageProvider component={Image}>
            <QuizProvider>
              {children}
            </QuizProvider>
          </ImageProvider>
        </LinkProvider>
      </NextNavigationProvider>
    </AuthProvider>
  )
} 