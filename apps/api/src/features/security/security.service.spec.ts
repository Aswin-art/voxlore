import { Test, TestingModule } from '@nestjs/testing';
import { SecurityService } from './security.service';
import { PrismaService } from '../../database/prisma.service';
import { BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

describe('SecurityService', () => {
  let service: SecurityService;
  let prisma: PrismaService;

  const mockUser = {
    id: 'user-uuid-1',
    email: 'user@voxlore.id',
    passwordHash: '',
  };

  beforeEach(async () => {
    mockUser.passwordHash = await bcrypt.hash('OldPassword123!', 10);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SecurityService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn().mockResolvedValue(mockUser),
              update: jest.fn().mockResolvedValue({ ...mockUser }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<SecurityService>(SecurityService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw NotFoundException if user is not found', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);
    await expect(
      service.changePassword('non-existent', {
        currentPassword: 'OldPassword123!',
        newPassword: 'NewPassword123!',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw UnauthorizedException if current password is wrong', async () => {
    await expect(
      service.changePassword('user-uuid-1', {
        currentPassword: 'WrongPassword!',
        newPassword: 'NewPassword123!',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw BadRequestException if new password equals current password', async () => {
    await expect(
      service.changePassword('user-uuid-1', {
        currentPassword: 'OldPassword123!',
        newPassword: 'OldPassword123!',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should successfully change password with valid input', async () => {
    const result = await service.changePassword('user-uuid-1', {
      currentPassword: 'OldPassword123!',
      newPassword: 'NewPassword123!',
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain('berhasil');
    expect(prisma.user.update).toHaveBeenCalled();
  });
});
