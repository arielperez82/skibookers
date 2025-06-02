import { type ServiceRegistry } from '@shared/application/ports';

export class MemoryServiceRegistry implements ServiceRegistry {
  private static instance: MemoryServiceRegistry;
  private services = new Map<string, unknown>();

  static getInstance(): ServiceRegistry { 
    if (!this.instance) {
      this.instance = new MemoryServiceRegistry();
    }
    return this.instance;
  }

  register<T>(key: string, service: T): void {
    this.services.set(key, service);
  }

  get<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service ${key} not found in ServiceRegistry`);
    }
    return service as T;
  }

  has(key: string): boolean {
    return this.services.has(key);
  }
} 