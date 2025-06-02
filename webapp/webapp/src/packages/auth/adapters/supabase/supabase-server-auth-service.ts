import { type AuthResponse } from '@auth/entities/auth-response.entity'
import { type User } from '@auth/entities/user.entity'
import { ServerAuthService } from '@auth/application/ports/auth-service'
import { convertUser } from './convert-user'
import { SupabaseClient, createServerClient, type CookieMethodsServer  } from '@shared/adapters/supabase/client'

export class SupabaseServerAuthService implements ServerAuthService {
  private supabase: SupabaseClient

  constructor(cookies: CookieMethodsServer) {
    this.supabase = createServerClient(cookies)
  }

  async getSession(): Promise<AuthResponse> {
    const { data, error } = await this.supabase.auth.getSession()
    return {
      data: {
        user: convertUser(data.session?.user ?? null),
        session: data.session
      },
      error
    }
  }

  async getUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser()
    return convertUser(data.user ?? null)
  }
} 