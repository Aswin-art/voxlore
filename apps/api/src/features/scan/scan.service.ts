import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ScanQrDto } from './dto/scan-qr.dto';

@Injectable()
export class ScanService {
  constructor(private readonly prisma: PrismaService) {}

  private extractIdentifier(rawCode: string): string {
    const code = rawCode.trim();
    // Handle full URL like https://voxlore.id/culture/prambanan or ?spot=prambanan
    if (code.includes('/')) {
      const parts = code.split('/').filter(Boolean);
      const lastPart = parts[parts.length - 1];
      if (lastPart?.includes('?')) {
        const queryPart = lastPart.split('?')[1];
        const params = new URLSearchParams(queryPart);
        const spot = params.get('spot') || params.get('id');
        if (spot) return spot;
      }
      return lastPart?.split('?')[0] || code;
    }
    return code;
  }

  async processScan(dto: ScanQrDto) {
    const identifier = this.extractIdentifier(dto.code).toLowerCase();

    // 1. Try finding destination by exact ID
    let destination = await this.prisma.destination.findUnique({
      where: { id: identifier },
      include: {
        audioSpots: {
          orderBy: { spotNumber: 'asc' },
        },
      },
    });

    // 2. Fallback search by title (case-insensitive)
    if (!destination) {
      destination = await this.prisma.destination.findFirst({
        where: {
          title: {
            contains: identifier,
            mode: 'insensitive',
          },
        },
        include: {
          audioSpots: {
            orderBy: { spotNumber: 'asc' },
          },
        },
      });
    }

    // 3. Fallback: Return top popular destination if unknown code scanned
    if (!destination) {
      destination = await this.prisma.destination.findFirst({
        where: { isPopular: true },
        include: {
          audioSpots: {
            orderBy: { spotNumber: 'asc' },
          },
        },
      });
    }

    if (!destination) {
      throw new NotFoundException('Situs budaya atau Kode QR Voxlore tidak dikenali');
    }

    const freeSpot = destination.audioSpots.find((spot) => spot.isFree) || destination.audioSpots[0];

    return {
      success: true,
      scannedCode: dto.code,
      destination: {
        id: destination.id,
        title: destination.title,
        subtitle: destination.subtitle || `Panduan Audio ${destination.title}`,
        city: destination.city,
        province: destination.province,
        location: destination.location,
        image: destination.image,
        category: destination.category,
        rating: destination.rating,
        duration: destination.duration,
      },
      audioSpot: freeSpot
        ? {
            id: freeSpot.id,
            spotNumber: freeSpot.spotNumber,
            title: freeSpot.title,
            duration: freeSpot.duration,
            audioUrl: freeSpot.audioUrl,
            isFree: freeSpot.isFree,
          }
        : null,
      hasAccess: true,
    };
  }
}
