import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { CreateEventDto, UpdateEventDto } from './manage-events.dto';

export interface CulturalEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  organizer: string;
  status: string;
  attendees: string;
}

@Injectable()
export class ManageEventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<CulturalEvent[]> {
    const festivals = await this.prisma.festival.findMany();
    return festivals.map((festival) => this.toEvent(festival));
  }

  async findOne(id: string): Promise<CulturalEvent> {
    const festival = await this.prisma.festival.findUnique({ where: { id } });
    if (!festival) throw new NotFoundException(`Event with id ${id} not found`);
    return this.toEvent(festival);
  }

  async create(dto: CreateEventDto): Promise<CulturalEvent> {
    const festival = await this.prisma.festival.create({
      data: {
        id: Date.now().toString(),
        title: dto.title,
        province: '',
        region: '',
        city: dto.location,
        location: dto.location,
        startDate: dto.date,
        endDate: dto.date,
        date: dto.date,
        monthBadge: '',
        dayBadge: '',
        description: '',
        image: '',
        type: dto.organizer,
        organizer: dto.organizer,
        status: dto.status ?? 'Mendatang',
        attendees: dto.attendees ?? '—',
      },
    });
    return this.toEvent(festival, dto.status, dto.attendees);
  }

  async update(id: string, dto: UpdateEventDto): Promise<CulturalEvent> {
    try {
      const festival = await this.prisma.festival.update({
        where: { id },
        data: {
          ...(dto.title !== undefined && { title: dto.title }),
          ...(dto.date !== undefined && {
            date: dto.date,
            startDate: dto.date,
            endDate: dto.date,
          }),
          ...(dto.location !== undefined && {
            city: dto.location,
            location: dto.location,
          }),
          ...(dto.organizer !== undefined && { type: dto.organizer, organizer: dto.organizer }),
          ...(dto.status !== undefined && { status: dto.status }),
          ...(dto.attendees !== undefined && { attendees: dto.attendees }),
        },
      });
      return this.toEvent(festival, dto.status, dto.attendees);
    } catch (error) {
      if ((error as { code?: string }).code === 'P2025') {
        throw new NotFoundException(`Event with id ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<{ success: boolean }> {
    try {
      await this.prisma.festival.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      if ((error as { code?: string }).code === 'P2025') {
        throw new NotFoundException(`Event with id ${id} not found`);
      }
      throw error;
    }
  }

  private toEvent(
    festival: {
      id: string;
      title: string;
      date: string;
      location: string;
      type: string;
      organizer?: string | null;
      status?: string;
      attendees?: string;
    },
    status?: string,
    attendees?: string,
  ): CulturalEvent {
    return {
      id: festival.id,
      title: festival.title,
      date: festival.date,
      location: festival.location,
      organizer: festival.organizer ?? festival.type,
      status: status ?? festival.status ?? 'Mendatang',
      attendees: attendees ?? festival.attendees ?? '—',
    };
  }
}
