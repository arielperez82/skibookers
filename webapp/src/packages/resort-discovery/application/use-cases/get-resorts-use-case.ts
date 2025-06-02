import { type Resort } from '@resort-discovery/domain/entities/resort.entity';
import { type ResortRepository } from '@resort-discovery/application/ports/resort-repository';

export class GetResortsUseCase {
  constructor(private resortRepository: ResortRepository) {}

  async execute(): Promise<Resort[]> {
    return this.resortRepository.getResorts();
  }
} 