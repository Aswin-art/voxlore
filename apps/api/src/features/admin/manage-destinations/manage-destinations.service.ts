import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminStore, Destination } from '../admin.store';
import {
  CreateDestinationDto,
  UpdateDestinationDto,
} from './manage-destinations.dto';

@Injectable()
export class ManageDestinationsService {
  constructor(private readonly store: AdminStore) {}

  findAll(): Destination[] {
    return this.store.getDestinations();
  }

  findOne(id: string): Destination {
    const dest = this.store.getDestinationById(id);
    if (!dest) {
      throw new NotFoundException(`Destination with id ${id} not found`);
    }
    return dest;
  }

  create(dto: CreateDestinationDto): Destination {
    const id =
      dto.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-') +
      '-' +
      Date.now();

    const newDest: Destination = {
      id,
      name: dto.name,
      location: dto.location,
      category: dto.category,
      audioCount: dto.audioCount ?? 0,
      passPrice: dto.passPrice ?? 'Rp 0',
      status: dto.status ?? 'Draft Review',
      listeners: dto.listeners ?? '0',
      rating: dto.rating ?? 5.0,
      image: dto.image ?? '/images/prambanan-hero.png',
    };

    return this.store.addDestination(newDest);
  }

  update(id: string, dto: UpdateDestinationDto): Destination {
    const updated = this.store.updateDestination(id, dto);
    if (!updated) {
      throw new NotFoundException(`Destination with id ${id} not found`);
    }
    return updated;
  }

  delete(id: string): { success: boolean } {
    const deleted = this.store.deleteDestination(id);
    if (!deleted) {
      throw new NotFoundException(`Destination with id ${id} not found`);
    }
    return { success: true };
  }
}
