import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { DownloadTrackDto } from './dto/download-track.dto';

export interface DownloadTrackItem {
  id: string;
  title: string;
  siteName: string;
  siteId: string;
  spotNumber: string;
  duration: string;
  size: string;
  image: string;
  audioUrl: string;
  isFree: boolean;
}

@Injectable()
export class DownloadsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAvailableDownloads(): Promise<DownloadTrackItem[]> {
    const audioSpots = await this.prisma.audioSpot.findMany({
      take: 20,
      include: {
        destination: true,
      },
    });

    return audioSpots.map((spot) => ({
      id: spot.id,
      title: spot.title,
      siteName: spot.destination.title,
      siteId: spot.destination.id,
      spotNumber: `Spot ${String(spot.spotNumber).padStart(2, '0')}`,
      duration: spot.duration,
      size: '8.5 MB',
      image: spot.destination.image,
      audioUrl: spot.audioUrl || '',
      isFree: spot.isFree,
    }));
  }

  async getTrackForOffline(dto: DownloadTrackDto): Promise<DownloadTrackItem & { downloadedAt: Date }> {
    let spot = await this.prisma.audioSpot.findUnique({
      where: { id: dto.spotId },
      include: { destination: true },
    });

    if (!spot) {
      const spots = await this.prisma.audioSpot.findMany({
        where: { destinationId: dto.spotId },
        include: { destination: true },
      });
      spot = spots[0] || null;
    }

    if (!spot) {
      throw new NotFoundException(`Trek audio dengan ID '${dto.spotId}' tidak ditemukan`);
    }

    return {
      id: spot.id,
      title: spot.title,
      siteName: spot.destination.title,
      siteId: spot.destination.id,
      spotNumber: `Spot ${String(spot.spotNumber).padStart(2, '0')}`,
      duration: spot.duration,
      size: '8.5 MB',
      image: spot.destination.image,
      audioUrl: spot.audioUrl || '',
      isFree: spot.isFree,
      downloadedAt: new Date(),
    };
  }
}
