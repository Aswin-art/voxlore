import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import type { CreateReviewDto } from './dto/create-review.dto';
import { ReviewStatus } from '@prisma/client';
import type { AudioSpot, Destination, Festival, Review } from '@prisma/client';
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

type DestinationWithDetails = Destination & {
  audioSpots?: AudioSpot[];
  reviews?: Review[];
};

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
      include: {
        audioSpots: { orderBy: { spotNumber: 'asc' } },
        reviews: {
          where: { status: ReviewStatus.APPROVED },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!destination) {
      throw new NotFoundException(`Destination with id ${id} not found`);
    }
    return this.toDestination(destination);
  }

  async getAudioSpot(destinationId: string, spotNumber: number) {
    const spot = await this.prisma.audioSpot.findFirst({
      where: { destinationId, spotNumber },
    });
    if (!spot?.audioUrl) {
      throw new NotFoundException(`Playable audio spot not found`);
    }
    return spot;
  }

  async getDestinationReviews(destinationId: string) {
    const destination = await this.prisma.destination.findUnique({
      where: { id: destinationId },
      select: { title: true },
    });
    if (!destination) throw new NotFoundException(`Destination with id ${destinationId} not found`);

    const reviews = await this.prisma.review.findMany({
      where: { destinationId, status: ReviewStatus.APPROVED },
      orderBy: { createdAt: 'desc' },
    });
    return reviews.map((review) => this.toReview(review));
  }

  async createDestinationReview(destinationId: string, userId: string, dto: CreateReviewDto) {
    const [destination, user] = await Promise.all([
      this.prisma.destination.findUnique({ where: { id: destinationId }, select: { title: true } }),
      this.prisma.user.findUnique({ where: { id: userId }, select: { name: true } }),
    ]);
    if (!destination) throw new NotFoundException(`Destination with id ${destinationId} not found`);
    if (!user) throw new NotFoundException(`User with id ${userId} not found`);

    const review = await this.prisma.review.create({
      data: {
        userId,
        userName: user.name,
        destinationId,
        destination: destination.title,
        rating: dto.rating,
        comment: dto.comment.trim(),
        tags: dto.tags ?? [],
      },
    });
    return {
      id: review.id,
      userName: review.userName,
      destination: review.destination,
      destinationId: review.destinationId,
      rating: review.rating,
      comment: review.comment,
      verified: review.verified,
      helpfulCount: review.helpfulCount,
      tags: review.tags,
      createdAt: review.createdAt.toISOString(),
    };
  }

  async toggleHelpfulVote(reviewId: string, userId: string) {
    try {
      return await this.prisma.$transaction(async (tx) => {
      const review = await tx.review.findUnique({
        where: { id: reviewId },
        select: { id: true, status: true, helpfulCount: true },
      });
      if (!review || review.status !== ReviewStatus.APPROVED) {
        throw new NotFoundException(`Review with id ${reviewId} not found`);
      }

      const existingVote = await tx.reviewVote.findUnique({
        where: { reviewId_userId: { reviewId, userId } },
      });
      if (existingVote) {
        await tx.reviewVote.delete({ where: { id: existingVote.id } });
        if (review.helpfulCount === 0) {
          return { helpful: false, helpfulCount: 0 };
        }
        const updated = await tx.review.update({
          where: { id: reviewId },
          data: { helpfulCount: { decrement: 1 } },
          select: { helpfulCount: true },
        });
        return { helpful: false, helpfulCount: updated.helpfulCount };
      }

      await tx.reviewVote.create({ data: { reviewId, userId } });
      const updated = await tx.review.update({
        where: { id: reviewId },
        data: { helpfulCount: { increment: 1 } },
        select: { helpfulCount: true },
      });
      return { helpful: true, helpfulCount: updated.helpfulCount };
        });
    } catch (error) {
      if ((error as { code?: string }).code === 'P2002') {
        throw new ConflictException('Vote sedang diproses, coba lagi');
      }
      throw error;
    }
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

  private toDestination(destination: DestinationWithDetails): PublicDestination {
    const reviews = destination.reviews?.map((review) => this.toReview(review));
    const ratingBreakdown = reviews ? this.toRatingBreakdown(reviews) : undefined;

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
      ...(destination.subtitle !== null && { subtitle: destination.subtitle }),
      ...(destination.audioSpots && {
        audioSpots: destination.audioSpots.map((spot) => ({
          id: spot.id,
          spotNumber: spot.spotNumber,
          title: spot.title,
          duration: spot.duration,
          description: spot.description,
          audioUrl: spot.audioUrl ?? undefined,
          isFree: spot.isFree,
        })),
      }),
      ...(reviews && {
        reviews,
        reviewsCount: reviews.length,
        ratingBreakdown,
      }),
    };
  }

  private toReview(review: Review): NonNullable<PublicDestination['reviews']>[number] {
    return {
      id: review.id,
      userName: review.userName,
      userInitials: review.userName
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      destination: review.destination,
      destinationId: review.destinationId,
      rating: review.rating,
      comment: review.comment,
      status: 'APPROVED',
      verified: review.verified,
      helpfulCount: review.helpfulCount,
      tags: review.tags,
      createdAt: review.createdAt.toISOString(),
    };
  }

  private toRatingBreakdown(reviews: NonNullable<PublicDestination['reviews']>) {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    for (const review of reviews) counts[review.rating as keyof typeof counts]++;
    const total = reviews.length;
    return {
      5: total ? Math.round((counts[5] / total) * 100) : 0,
      4: total ? Math.round((counts[4] / total) * 100) : 0,
      3: total ? Math.round((counts[3] / total) * 100) : 0,
      2: total ? Math.round((counts[2] / total) * 100) : 0,
      1: total ? Math.round((counts[1] / total) * 100) : 0,
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
