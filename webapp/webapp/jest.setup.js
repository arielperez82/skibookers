import '@testing-library/jest-dom'
import mockRouter from 'next-router-mock'

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'http://localhost:54321'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'

jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation')
  return {
    ...actual,
    useRouter: () => mockRouter,
    usePathname: () => mockRouter.pathname,
    useSearchParams: () => new URLSearchParams(mockRouter.query ? new URLSearchParams(mockRouter.query).toString() : ''),
  }
})