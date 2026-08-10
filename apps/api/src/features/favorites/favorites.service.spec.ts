import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from './favorites.service';
import { PrismaService } from '../../database/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('FavoritesService', () => {
  let service: FavoritesService;
  let prisma: PrismaService;

  const mockDestination = {
    id: 'prambanan',
    title: 'Candi Prambanan',
    category: 'Candi & Situs',
    province: 'D.I. Yogyakarta',
    location: 'Sleman, Yogyakarta',
    rating: 4.9,
    duration: '45 min',
    listeners: '1.2k+',
    image: '/images/prambanan-hero.png',
    _count: { audioSpots: 4 },
  };

  const mockFavorite = {
    id: 'fav-uuid-1',
    userId: 'user-uuid-1',
    destinationId: 'prambanan',
    createdAt: new Date(),
    destination: mockDestination,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoritesService,
        {
          provide: PrismaService,
          useValue: {
            favorite: {
              findMany: jest.fn().mockResolvedValue([mockFavorite]),
              findUnique: jest.fn().mockResolvedValue(null),
              create: jest.fn().mockResolvedValue(mockFavorite),
              delete: jest.fn().mockResolvedValue(mockFavorite),
            },
            destination: {
              findUnique: jest.fn().mockResolvedValue(mockDestination),
            },
          },
        },
      ],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should get user favorites', async () => {
    const list = await service.getUserFavorites('user-uuid-1');
    expect(list.length).toBe(1);
    expect(list[0]?.id).toBe('prambanan');
  });

  it('should toggle favorite on (add)', async () => {
    const res = await service.toggleFavorite('user-uuid-1', { destinationId: 'prambanan' });
    expect(res.isFavorite).toBe(true);
    expect(prisma.favorite.create).toHaveBeenCalled();
  });

  it('should toggle favorite off (remove)', async () => {
    jest.spyOn(prisma.favorite, 'findUnique').mockResolvedValueOnce(mockFavorite as any);
    const res = await service.toggleFavorite('user-uuid-1', { destinationId: 'prambanan' });
    expect(res.isFavorite).toBe(false);
    expect(prisma.favorite.delete).toHaveBeenCalled();
  });

  it('should throw NotFoundException when toggling non-existent destination', async () => {
    jest.spyOn(prisma.destination, 'findUnique').mockResolvedValueOnce(null);
    await expect(
      service.toggleFavorite('user-uuid-1', { destinationId: 'invalid-id' }),
    ).rejects.toThrow(NotFoundException);
  });
});
