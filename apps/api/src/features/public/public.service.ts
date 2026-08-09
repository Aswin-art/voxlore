import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { Destination, Festival } from '@prisma/client';
import type {
  Destination as PublicDestination,
  CulturalFestival,
} from './catalog.types';

export interface DestinationFilters {
  province?: string;
  region?: string;
  category?: string;
  search?: string;
}

export interface FestivalFilters {
  province?: string;
  region?: string;
  type?: string;
  search?: string;
  start?: string;
  end?: string;
}

@Injectable()
export class PublicService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllDestinations(
    filters: DestinationFilters = {},
  ): Promise<PublicDestination[]> {
    const destinations = await this.prisma.destination.findMany({
      where: {
        ...(filters.province && {
          province: { equals: filters.province, mode: 'insensitive' },
        }),
        ...(filters.region && {
          region: { equals: filters.region, mode: 'insensitive' },
        }),
        ...(filters.category && {
          category: { equals: filters.category, mode: 'insensitive' },
        }),
        ...(filters.search && {
          OR: [
            { title: { contains: filters.search, mode: 'insensitive' } },
            { city: { contains: filters.search, mode: 'insensitive' } },
            { province: { contains: filters.search, mode: 'insensitive' } },
            { category: { contains: filters.search, mode: 'insensitive' } },
          ],
        }),
      },
    });

    return destinations.map((destination) => this.toDestination(destination));
  }

  async getDestinationById(id: string): Promise<PublicDestination> {
    const destination = await this.prisma.destination.findUnique({
      where: { id },
    });
    if (!destination) {
      throw new NotFoundException(`Destination with id ${id} not found`);
    }
    return this.toDestination(destination);
  }

  async getFestivals(
    filters: FestivalFilters = {},
  ): Promise<CulturalFestival[]> {
    const festivals = await this.prisma.festival.findMany({
      where: {
        ...(filters.province && {
          province: { equals: filters.province, mode: 'insensitive' },
        }),
        ...(filters.region && {
          region: { equals: filters.region, mode: 'insensitive' },
        }),
        ...(filters.type && {
          type: { equals: filters.type, mode: 'insensitive' },
        }),
        ...(filters.search && {
          OR: [
            { title: { contains: filters.search, mode: 'insensitive' } },
            { city: { contains: filters.search, mode: 'insensitive' } },
            { province: { contains: filters.search, mode: 'insensitive' } },
            { type: { contains: filters.search, mode: 'insensitive' } },
          ],
        }),
        ...((filters.start || filters.end) && {
          startDate: { lte: filters.end ?? '9999-99-99' },
          endDate: { gte: filters.start ?? '0000-00-00' },
        }),
      },
    });

    return festivals.map((festival) => this.toFestival(festival));
  }

  async getFestivalById(id: string): Promise<CulturalFestival> {
    const festival = await this.prisma.festival.findUnique({ where: { id } });
    if (!festival) {
      throw new NotFoundException(`Festival with id ${id} not found`);
    }
    return this.toFestival(festival);
  }

  async getProvinces(): Promise<string[]> {
    const [destinations, festivals] = await Promise.all([
      this.prisma.destination.findMany({
        select: { province: true },
        distinct: ['province'],
      }),
      this.prisma.festival.findMany({
        select: { province: true },
        distinct: ['province'],
      }),
    ]);
    return [
      ...new Set([...destinations, ...festivals].map((row) => row.province)),
    ].sort();
  }

  private toDestination(destination: Destination): PublicDestination {
    return {
      id: destination.id,
      title: destination.title,
      city: destination.city,
      province: destination.province,
      location: destination.location,
      region: destination.region,
      category: destination.category,
      description: destination.description,
      image: destination.image,
      price: destination.price,
      rating: destination.rating,
      duration: destination.duration,
      listeners: destination.listeners,
      isPopular: destination.isPopular,
    };
  }

  private toFestival(festival: Festival): CulturalFestival {
    return {
      id: festival.id,
      title: festival.title,
      province: festival.province,
      region: festival.region,
      city: festival.city,
      location: festival.location,
      startDate: festival.startDate,
      endDate: festival.endDate,
      date: festival.date,
      monthBadge: festival.monthBadge,
      dayBadge: festival.dayBadge,
      description: festival.description,
      image: festival.image,
      videoUrl: festival.videoUrl ?? undefined,
      type: festival.type,
      isSponsored: festival.isSponsored,
    };
  }
}
