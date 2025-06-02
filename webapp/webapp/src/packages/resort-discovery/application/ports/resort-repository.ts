import { type Resort } from '@resort-discovery/domain/entities/resort.entity';

export interface ResortRepository {
  getResorts(): Promise<Resort[]>;
} 