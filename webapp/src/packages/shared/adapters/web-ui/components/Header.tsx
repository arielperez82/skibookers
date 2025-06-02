import { useLink } from '@shared/adapters/web-ui/hooks/useLink'
import { UserCircle, Search, Calendar } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useImage } from '@shared/adapters/web-ui/hooks/useImage'

const navItems = [
  { href: '/quiz', label: 'Personalize', icon: Search },
  { href: '/results', label: 'Book', icon: Calendar },
]

export default function Header({ handleSignout }: { handleSignout: () => Promise<void> }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const Link = useLink()
  const Image = useImage()
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <header className="bg-white dark:bg-background shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <span className="sr-only">Ski Bookers Home</span>
          <Image src="/skibookers-logo.png" alt="Ski Bookers Logo" width={206} height={179} className="h-8 w-8" />
          <span className="hidden sm:inline">Ski Bookers</span>
        </Link>
        {/* Top nav links (desktop only) */}
        <nav className="hidden md:flex gap-6 items-center flex-1 justify-center">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-gray-700 dark:text-foreground hover:text-primary text-sm font-medium px-2 py-1 rounded transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
        {/* Profile/Account */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 text-gray-700 dark:text-foreground hover:text-primary focus:outline-none cursor-pointer"
            aria-haspopup="true"
            aria-expanded={menuOpen}
          >
            <UserCircle className="h-7 w-7" aria-hidden="true" />
            <span className="hidden md:inline text-sm font-medium">Account</span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-background border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
              <Link
                href="/account"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={async () => {
                  setMenuOpen(false)
                  await handleSignout()
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 