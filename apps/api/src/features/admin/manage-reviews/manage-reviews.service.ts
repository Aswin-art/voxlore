import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../database/prisma.service';
import { ReviewStatus } from '@prisma/client';
import { UpdateReviewStatusDto } from './manage-reviews.dto';

export interface Review {
  id: string;
  user: string;
  destination: string;
  rating: number;
  comment: string;
  time: string;
  status: string;
}

@Injectable()
export class ManageReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return reviews.map((review) => this.toReview(review));
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException(`Review with id ${id} not found`);
    return this.toReview(review);
  }

  async updateStatus(id: string, dto: UpdateReviewStatusDto): Promise<Review> {
    try {
      const review = await this.prisma.review.update({
        where: { id },
        data: { status: this.toPrismaStatus(dto.status) },
      });
      return this.toReview(review);
    } catch (error) {
      if ((error as { code?: string }).code === 'P2025') {
        throw new NotFoundException(`Review with id ${id} not found`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<{ success: boolean }> {
    try {
      await this.prisma.review.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      if ((error as { code?: string }).code === 'P2025') {
        throw new NotFoundException(`Review with id ${id} not found`);
      }
      throw error;
    }
  }

  private toReview(review: {
    id: string;
    userName: string;
    destination: string;
    rating: number;
    comment: string;
    createdAt: Date;
    status: ReviewStatus;
  }): Review {
    return {
      id: review.id,
      user: review.userName,
      destination: review.destination,
      rating: review.rating,
      comment: review.comment,
      time: review.createdAt.toISOString(),
      status: this.fromPrismaStatus(review.status),
    };
  }

  private toPrismaStatus(
    status: UpdateReviewStatusDto['status'],
  ): ReviewStatus {
    return {
      Setujui: ReviewStatus.APPROVED,
      Tolak: ReviewStatus.REJECTED,
      'Perlu Moderasi': ReviewStatus.PENDING,
    }[status];
  }

  private fromPrismaStatus(status: ReviewStatus): string {
    return {
      APPROVED: 'Setujui',
      REJECTED: 'Tolak',
      PENDING: 'Perlu Moderasi',
    }[status];
  }
}
