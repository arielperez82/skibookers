import { type NavigationService } from '@shared/application/ports/navigation-service';
import { NavigationContext } from '@shared/adapters/web-ui/contexts/navigation-context';

interface NavigationProviderProps {
    children: React.ReactNode
    navigator: NavigationService
  }
  
export const NavigationProvider= ({ navigator, children }: NavigationProviderProps) => (
  <NavigationContext.Provider value={navigator}>
    {children}
  </NavigationContext.Provider>
);