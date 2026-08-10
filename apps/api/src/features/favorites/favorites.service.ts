import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ToggleFavoriteDto } from './dto/toggle-favorite.dto';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserFavorites(userId: string) {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        destination: {
          include: {
            _count: {
              select: { audioSpots: true },
            },
          },
        },
      },
    });

    return favorites.map((fav) => ({
      favoriteId: fav.id,
      id: fav.destination.id,
      title: fav.destination.title,
      category: fav.destination.category,
      province: fav.destination.province,
      location: fav.destination.location,
      rating: fav.destination.rating,
      duration: fav.destination.duration,
      listeners: fav.destination.listeners,
      image: fav.destination.image,
      audioSpotsCount: fav.destination._count.audioSpots,
      createdAt: fav.createdAt,
    }));
  }

  async toggleFavorite(userId: string, dto: ToggleFavoriteDto) {
    const existing = await this.prisma.favorite.findUnique({
      where: {
        userId_destinationId: {
          userId,
          destinationId: dto.destinationId,
        },
      },
    });

    if (existing) {
      await this.prisma.favorite.delete({
        where: { id: existing.id },
      });
      return {
        isFavorite: false,
        message: 'Destinasi berhasil dihapus dari favorit',
      };
    }

    const destination = await this.prisma.destination.findUnique({
      where: { id: dto.destinationId },
    });

    if (!destination) {
      throw new NotFoundException(`Destinasi dengan ID '${dto.destinationId}' tidak ditemukan`);
    }

    await this.prisma.favorite.create({
      data: {
        userId,
        destinationId: dto.destinationId,
      },
    });

    return {
      isFavorite: true,
      message: 'Destinasi berhasil ditambahkan ke favorit',
    };
  }
}
