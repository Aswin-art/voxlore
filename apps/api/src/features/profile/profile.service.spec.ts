import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { PrismaService } from '../../database/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('ProfileService', () => {
  let service: ProfileService;
  let prisma: PrismaService;

  const mockUser = {
    id: 'user-uuid-1',
    name: 'Aswin Pratama',
    email: 'aswin@voxlore.id',
    phone: '+6281234567890',
    bio: 'Pencinta Sejarah',
    role: 'MEMBER',
    createdAt: new Date(),
    updatedAt: new Date(),
    _count: {
      vacationItems: 3,
      travelPlans: 2,
      reviews: 4,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue(mockUser),
              update: jest.fn().mockResolvedValue({ ...mockUser, name: 'Aswin Updated' }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should return user profile with initials and stats', async () => {
    const profile = await service.getProfile('user-uuid-1');
    expect(profile.name).toBe('Aswin Pratama');
    expect(profile.initials).toBe('AP');
    expect(profile.destinationsVisited).toBe(7);
    expect(profile.plansCreated).toBe(2);
  });

  it('should throw NotFoundException if profile does not exist', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);
    await expect(service.getProfile('invalid-id')).rejects.toThrow(NotFoundException);
  });

  it('should update profile fields', async () => {
    const updated = await service.updateProfile('user-uuid-1', { name: 'Aswin Updated' });
    expect(updated).toBeDefined();
    expect(prisma.user.update).toHaveBeenCalled();
  });
});
