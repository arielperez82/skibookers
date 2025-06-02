/* eslint-disable @typescript-eslint/no-unused-vars */

import { type BrowserAuthService } from '@auth/application/ports/auth-service'
import { type AuthResponse } from '@auth/entities/auth-response.entity'
import { type User } from '@auth/entities/user.entity'

export class TestAuthService implements BrowserAuthService {
  private user: User | null = null
  private error: Error | null = null
  private unsubscribe = jest.fn()

  constructor(initialUser: User | null = null) {
    this.user = initialUser
  }

  setUser(user: User | null) {
    this.user = user
  }

  setError(error: Error | null) {
    this.error = error
  }

  async getSession(): Promise<AuthResponse> {
    return {
      data: {
        user: this.user,
        session: this.user ? { user: this.user } : null
      },
      error: null
    }
  }

  async signInWithPassword(email: string, password: string): Promise<AuthResponse> {
    return {
      data: {
        user: this.user,
        session: this.user ? { user: this.user } : null
      },
      error: this.error
    }
  }

  async signUp(email: string, password: string): Promise<AuthResponse> {
    return {
      data: {
        user: this.user,
        session: this.user ? { user: this.user } : null
      },
      error: this.error
    }
  }

  async signOut(): Promise<{ error: Error | null }> {
    this.user = null
    return { error: this.error }
  }

  onAuthStateChange(callback: (event: string, session: unknown) => void) {
    return {
      data: {
        subscription: {
          unsubscribe: this.unsubscribe
        }
      }
    }
  }
} 