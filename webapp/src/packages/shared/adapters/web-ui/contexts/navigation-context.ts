import { NavigationParams } from "@shared/application/entities/navigation-params.entity";
import { NavigationService } from "@shared/application/ports/navigation-service";
import { createContext } from "react";

const noOpNavigationService: NavigationService = {
  navigate: () => { /* no-op */ },
  back: () => { /* no-op */ },
  getNavigationParams: () => ({
    get: () => null,
    getAll: () => [],
    has: () => false,
    toString: () => '',
  } as unknown as NavigationParams),
}

// Context will be provided by the app, default to no-op to avoid null checks
export const NavigationContext = createContext<NavigationService>(noOpNavigationService);