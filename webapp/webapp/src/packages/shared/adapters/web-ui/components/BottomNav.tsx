import { useLink } from '@shared/adapters/web-ui/hooks/useLink'
import { Home, Search, Calendar } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/quiz', label: 'Personalize', icon: Search },
  { href: '/results', label: 'Book', icon: Calendar },
]

export default function BottomNav() {
  const Link = useLink()
  
  return (
    <nav aria-label="Bottom navigation" className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-background border-t border-border shadow md:hidden">
      <ul className="flex justify-around items-center h-14">
        {navItems.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link href={href} className="flex flex-col items-center text-xs text-gray-700 dark:text-foreground hover:text-primary focus:outline-none">
              <Icon className="h-6 w-6 mb-0.5" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
} 