import { SupabaseBrowserAuthService } from '@auth/adapters/supabase/supabase-browser-auth-service';
import { type ServiceRegistry } from '@shared/application/ports';
import { MemoryServiceRegistry } from '@shared/adapters/memory/memory-service-registry';
import { type AuthService } from '@auth/application/ports/auth-service';

export class ClientServiceRegistrar {
  static createRegistry(): ServiceRegistry {
    const registry = new MemoryServiceRegistry();
    this.registerAll(registry);
    return registry;
  }

  private static registerAll(registry: ServiceRegistry): ServiceRegistry {
    registry.register<AuthService>('authService', new SupabaseBrowserAuthService());
    
    return registry;
  }
} 