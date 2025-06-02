import { User } from "./user.entity"

export interface AuthResponse {
    data: {
      user: User | null
      session?: unknown
    } | null
    error: Error | null
  }
  