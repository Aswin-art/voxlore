import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService session response', () => {
  it('does not expose the session token in login response', async () => {
    const prisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'user-1',
          name: 'User',
          email: 'user@example.com',
          passwordHash: '$2b$12$invalid',
          role: 'MEMBER',
          phone: null,
          bio: null,
        }),
      },
      session: {
        create: jest.fn().mockResolvedValue({}),
      },
      userSubscription: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({}),
      },
      subscriptionPackage: {
        upsert: jest.fn().mockResolvedValue({}),
      },
    };
    const service = new AuthService(prisma as never);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    const result = await service.login({
      email: 'user@example.com',
      password: 'password',
    });

    expect(result.user).toEqual({
      id: 'user-1',
      name: 'User',
      email: 'user@example.com',
      role: 'MEMBER',
      phone: undefined,
      bio: undefined,
    });
    expect(result).not.toHaveProperty('accessToken');
    expect(result).not.toHaveProperty('sessionToken');
  });

  it('rejects expired sessions before exposing the user', async () => {
    const prisma = {
      session: { findFirst: jest.fn().mockResolvedValue(null) },
    };
    const service = new AuthService(prisma as never);

    await expect(service.getSession('expired-token')).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('deletes every matching session on logout', async () => {
    const prisma = {
      session: { deleteMany: jest.fn().mockResolvedValue({ count: 1 }) },
    };
    const service = new AuthService(prisma as never);

    await service.logout('session-token');

    expect(prisma.session.deleteMany).toHaveBeenCalledWith({
      where: { tokenHash: expect.any(String) },
    });
  });

  it('maps duplicate profile email to a conflict', async () => {
    const prisma = {
      user: {
        update: jest.fn().mockRejectedValue({ code: 'P2002' }),
      },
    };
    const service = new AuthService(prisma as never);

    await expect(
      service.updateProfile('user-1', { email: 'taken@example.com' }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
