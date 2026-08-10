import { Test, TestingModule } from '@nestjs/testing';
import { ScanService } from './scan.service';
import { PrismaService } from '../../database/prisma.service';

describe('ScanService', () => {
  let service: ScanService;
  let prisma: PrismaService;

  const mockDestination = {
    id: 'prambanan',
    title: 'Candi Prambanan',
    subtitle: 'Legenda Roro Jonggrang',
    city: 'Sleman',
    province: 'DI Yogyakarta',
    location: 'Sleman, DIY',
    image: '/images/prambanan.jpg',
    category: 'Sejarah',
    rating: 4.9,
    duration: '25 min',
    audioSpots: [
      {
        id: 'spot-1',
        spotNumber: 1,
        title: 'Panduan Utama',
        duration: '25 min',
        audioUrl: 'https://example.com/audio1.mp3',
        isFree: true,
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScanService,
        {
          provide: PrismaService,
          useValue: {
            destination: {
              findUnique: jest.fn().mockResolvedValue(mockDestination),
              findFirst: jest.fn().mockResolvedValue(mockDestination),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ScanService>(ScanService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should process scan by exact ID or URL', async () => {
    const result = await service.processScan({ code: 'https://voxlore.id/culture/prambanan' });
    expect(result.success).toBe(true);
    expect(result.destination.id).toBe('prambanan');
    expect(result.audioSpot?.title).toBe('Panduan Utama');
  });
});
