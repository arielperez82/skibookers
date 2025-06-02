import { useState } from 'react'
import { useNavigation } from '@shared/adapters/web-ui/hooks/useNavigation'
import { useAuth } from '@auth/adapters/web-ui/useAuth'
import { useLink } from '@shared/adapters/web-ui/hooks/useLink'

export function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const navigation = useNavigation()
  const { signUp, error } = useAuth()
  const Link = useLink()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationError(null)
    
    if (password !== confirmPassword) {
      setValidationError('Passwords do not match')
      return
    }
    
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters')
      return
    }
    
    setIsLoading(true)
    await signUp(email, password)
   
    if (!error) {
      navigation.navigate('/login?registered=true')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md space-y-8 p-8 bg-card text-card-foreground rounded-xl shadow border border-border">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold font-sans text-primary">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Or{' '}
            <Link href="/login" className="font-medium text-secondary hover:text-primary transition-colors">
              sign in to your account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(error || validationError) && (
            <div className="rounded-md bg-destructive/10 p-4 border border-destructive/30">
              <div className="text-sm text-destructive">{error || validationError}</div>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder-muted-foreground text-foreground rounded-t-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-border placeholder-muted-foreground text-foreground rounded-b-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-background"
                placeholder="Confirm password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 