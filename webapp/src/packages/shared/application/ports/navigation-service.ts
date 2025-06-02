import { NavigationParams } from "@shared/application/entities/navigation-params.entity";

export interface NavigationService {
  navigate(path: string): void;
  back(): void;
  getNavigationParams(): NavigationParams;
} 