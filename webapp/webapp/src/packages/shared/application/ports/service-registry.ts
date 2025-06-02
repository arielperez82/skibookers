export interface ServiceRegistry {
    register<T>(key: string, service: T): void;
    get<T>(key: string): T;
    has(key: string): boolean;
}