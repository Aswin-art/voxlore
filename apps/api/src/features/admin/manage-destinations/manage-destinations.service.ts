import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import {
  CreateDestinationDto,
  UpdateDestinationDto,
} from './manage-destinations.dto';

export interface AdminDestination {
  id: string;
  name: string;
  location: string;
  category: string;
  audioCount: number;
  passPrice: string;
  status: string;
  listeners: string;
  rating: number;
  image: string;
}

@Injectable()
export class ManageDestinationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<AdminDestination[]> {
    const destinations = await this.prisma.destination.findMany();
    return destinations.map((destination) =>
      this.toAdminDestination(destination),
    );
  }

  async findOne(id: string): Promise<AdminDestination> {
    const destination = await this.prisma.destination.findUnique({
      where: { id },
    });
    if (!destination) {
      throw new NotFoundException(`Destination with id ${id} not found`);
    }
    return this.toAdminDestination(destination);
  }

  async create(dto: CreateDestinationDto): Promise<AdminDestination> {
    const id = `${dto.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')}-${Date.now()}`;
    const destination = await this.prisma.destination.create({
      data: {
        id,
        title: dto.name,
        city: dto.location,
        province: dto.location,
        location: dto.location,
        region: '',
        category: dto.category,
        description: '',
        image: dto.image ?? '/images/prambanan-hero.png',
        price: dto.passPrice ?? 'Rp 0',
        rating: dto.rating ?? 5,
        duration: '',
        listeners: dto.listeners ?? '0',
        audioCount: dto.audioCount ?? 0,
        status: dto.status ?? 'Draft Review',
        passPrice: dto.passPrice ?? 'Rp 0',
      },
    });
    return this.toAdminDestination(destination);
  }

  async update(
    id: string,
    dto: UpdateDestinationDto,
  ): Promise<AdminDestination> {
    try {
      const destination = await this.prisma.destination.update({
        where: { id },
        data: {
          ...(dto.name !== undefined && { title: dto.name }),
          ...(dto.location !== undefined && {
            city: dto.location,
            province: dto.location,
            location: dto.location,
          }),
          ...(dto.category !== undefined && { category: dto.category }),
          ...(dto.audioCount !== undefined && { audioCount: dto.audioCount }),
          ...(dto.passPrice !== undefined && {
            passPrice: dto.passPrice,
            price: dto.passPrice,
          }),
          ...(dto.status !== undefined && { status: dto.status }),
          ...(dto.listeners !== undefined && { listeners: dto.listeners }),
          ...(dto.rating !== undefined && { rating: dto.rating }),
          ...(dto.image !== undefined && { image: dto.image }),
        },
      });
      return this.toAdminDestination(destination);
    } catch (error) {
      if ((error as { code?: string }).code === 'P2025') {
        throw new NotFoundException(`Destination with id ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<{ success: boolean }> {
    try {
      await this.prisma.destination.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      if ((error as { code?: string }).code === 'P2025') {
        throw new NotFoundException(`Destination with id ${id} not found`);
      }
      throw error;
    }
  }

  private toAdminDestination(destination: {
    id: string;
    title: string;
    location: string;
    category: string;
    audioCount: number;
    passPrice: string;
    status: string;
    listeners: string;
    rating: number;
    image: string;
  }): AdminDestination {
    return {
      id: destination.id,
      name: destination.title,
      location: destination.location,
      category: destination.category,
      audioCount: destination.audioCount,
      passPrice: destination.passPrice,
      status: destination.status,
      listeners: destination.listeners,
      rating: destination.rating,
      image: destination.image,
    };
  }
}
