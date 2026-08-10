import { Test, TestingModule } from '@nestjs/testing';
import { DownloadsService } from './downloads.service';
import { PrismaService } from '../../database/prisma.service';

describe('DownloadsService', () => {
  let service: DownloadsService;
  let prisma: PrismaService;

  const mockAudioSpot = {
    id: 'spot-uuid-1',
    spotNumber: 1,
    title: 'Relief Karmawibhangga',
    duration: '8 min',
    audioUrl: 'https://example.com/spot-1.mp3',
    isFree: true,
    destination: {
      id: 'borobudur',
      title: 'Candi Borobudur',
      image: '/images/borobudur.jpg',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DownloadsService,
        {
          provide: PrismaService,
          useValue: {
            audioSpot: {
              findMany: jest.fn().mockResolvedValue([mockAudioSpot]),
              findUnique: jest.fn().mockResolvedValue(mockAudioSpot),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DownloadsService>(DownloadsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should list available downloads', async () => {
    const list = await service.getAvailableDownloads();
    expect(list.length).toBe(1);
    expect(list[0]?.siteName).toBe('Candi Borobudur');
  });

  it('should get track payload for offline preparation', async () => {
    const track = await service.getTrackForOffline({ spotId: 'spot-uuid-1' });
    expect(track.title).toBe('Relief Karmawibhangga');
    expect(track.siteId).toBe('borobudur');
  });
});
