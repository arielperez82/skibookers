import { type User } from '@auth/entities/user.entity'
import { type SupabaseUser } from './supabase-user'

export const convertUser = (supabaseUser: SupabaseUser | null): User | null => {
  if (!supabaseUser?.email) return null
  
  return {
    id: supabaseUser.id,
    email: supabaseUser.email
  }
}