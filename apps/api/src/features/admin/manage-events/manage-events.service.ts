import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminStore, CulturalEvent } from '../admin.store';
import { CreateEventDto, UpdateEventDto } from './manage-events.dto';

@Injectable()
export class ManageEventsService {
  constructor(private readonly store: AdminStore) {}

  findAll(): CulturalEvent[] {
    return this.store.getEvents();
  }

  findOne(id: string): CulturalEvent {
    const event = this.store.getEventById(id);
    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return event;
  }

  create(dto: CreateEventDto): CulturalEvent {
    const id = Date.now().toString();
    const newEvent: CulturalEvent = {
      id,
      title: dto.title,
      date: dto.date,
      location: dto.location,
      organizer: dto.organizer,
      status: dto.status ?? 'Mendatang',
      attendees: dto.attendees ?? '0',
    };
    return this.store.addEvent(newEvent);
  }

  update(id: string, dto: UpdateEventDto): CulturalEvent {
    const updated = this.store.updateEvent(id, dto);
    if (!updated) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return updated;
  }

  delete(id: string): { success: boolean } {
    const deleted = this.store.deleteEvent(id);
    if (!deleted) {
      throw new NotFoundException(`Event with id ${id} not found`);
    }
    return { success: true };
  }
}
