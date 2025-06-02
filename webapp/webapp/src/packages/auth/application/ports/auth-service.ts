import { type AuthResponse } from "@auth/entities/auth-response.entity"
import { type User } from "@auth/entities/user.entity"

export interface AuthService {
  signInWithPassword: (email: string, password: string) => Promise<AuthResponse>
  signUp: (email: string, password: string) => Promise<AuthResponse>
  signOut: () => Promise<{ error: Error | null }>
} 

export interface BrowserAuthService extends AuthService {
  getSession: () => Promise<AuthResponse>
  onAuthStateChange: (callback: (event: string, session: unknown) => void) => { data: { subscription: { unsubscribe: () => void } } }
} 

export interface ServerAuthService {
  getSession: () => Promise<AuthResponse>,
  getUser: () => Promise<User | null>
}