import { NotFoundException } from '@nestjs/common';
import { PublicService } from './public.service';

describe('PublicService reviews', () => {
  it('returns a public review shape without internal identifiers or moderation status', async () => {
    const prisma = {
      destination: {
        findUnique: jest.fn().mockResolvedValue({ title: 'Borobudur' }),
      },
      user: {
        findUnique: jest.fn().mockResolvedValue({ name: 'User' }),
      },
      review: {
        create: jest.fn().mockResolvedValue({
          id: 'review-1',
          userId: 'user-1',
          userName: 'User',
          destinationId: 'destination-1',
          destination: 'Borobudur',
          rating: 5,
          comment: 'Great',
          status: 'PENDING',
          verified: false,
          helpfulCount: 0,
          tags: [],
          createdAt: new Date('2026-01-01'),
          updatedAt: new Date('2026-01-01'),
        }),
      },
    };
    const service = new PublicService(prisma as never);

    const result = await service.createDestinationReview('destination-1', 'user-1', {
      rating: 5,
      comment: 'Great',
      tags: [],
    });

    expect(result).not.toHaveProperty('userId');
    expect(result).not.toHaveProperty('status');
    expect(result).toMatchObject({ id: 'review-1', destination: 'Borobudur' });
    expect(result).toHaveProperty('createdAt', '2026-01-01T00:00:00.000Z');
  });
});

describe('PublicService review votes', () => {
  it('adds a unique helpful vote and increments the stored count in one transaction', async () => {
    const tx = {
      review: {
        findUnique: jest.fn().mockResolvedValue({ id: 'review-1', status: 'APPROVED', helpfulCount: 2 }),
        update: jest.fn().mockResolvedValue({ helpfulCount: 3 }),
      },
      reviewVote: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 'vote-1' }),
      },
    };
    const prisma = {
      $transaction: jest.fn((callback: (client: typeof tx) => unknown) => callback(tx)),
    };
    const service = new PublicService(prisma as never);

    await expect(service.toggleHelpfulVote('review-1', 'user-1')).resolves.toEqual({
      helpful: true,
      helpfulCount: 3,
    });
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);
    expect(tx.reviewVote.create).toHaveBeenCalledWith({
      data: { reviewId: 'review-1', userId: 'user-1' },
    });
    expect(tx.review.update).toHaveBeenCalledWith({
      where: { id: 'review-1' },
      data: { helpfulCount: { increment: 1 } },
      select: { helpfulCount: true },
    });
  });

  it('does not persist a negative helpful count when the stored count is zero', async () => {
    const tx = {
      review: {
        findUnique: jest.fn().mockResolvedValue({ id: 'review-1', status: 'APPROVED', helpfulCount: 0 }),
        update: jest.fn(),
      },
      reviewVote: {
        findUnique: jest.fn().mockResolvedValue({ id: 'vote-1' }),
        delete: jest.fn().mockResolvedValue({ id: 'vote-1' }),
      },
    };
    const prisma = {
      $transaction: jest.fn((callback: (client: typeof tx) => unknown) => callback(tx)),
    };
    const service = new PublicService(prisma as never);

    await expect(service.toggleHelpfulVote('review-1', 'user-1')).resolves.toEqual({
      helpful: false,
      helpfulCount: 0,
    });
    expect(tx.review.update).not.toHaveBeenCalled();
  });

  it('removes an existing helpful vote and decrements the stored count', async () => {
    const tx = {
      review: {
        findUnique: jest.fn().mockResolvedValue({ id: 'review-1', status: 'APPROVED', helpfulCount: 2 }),
        update: jest.fn().mockResolvedValue({ helpfulCount: 1 }),
      },
      reviewVote: {
        findUnique: jest.fn().mockResolvedValue({ id: 'vote-1' }),
        delete: jest.fn().mockResolvedValue({ id: 'vote-1' }),
      },
    };
    const prisma = {
      $transaction: jest.fn((callback: (client: typeof tx) => unknown) => callback(tx)),
    };
    const service = new PublicService(prisma as never);

    await expect(service.toggleHelpfulVote('review-1', 'user-1')).resolves.toEqual({
      helpful: false,
      helpfulCount: 1,
    });
    expect(tx.reviewVote.delete).toHaveBeenCalledWith({ where: { id: 'vote-1' } });
    expect(tx.review.update).toHaveBeenCalledWith({
      where: { id: 'review-1' },
      data: { helpfulCount: { decrement: 1 } },
      select: { helpfulCount: true },
    });
  });
});

describe('PublicService audio spots', () => {
  it('returns a playable persisted spot', async () => {
    const prisma = {
      audioSpot: {
        findFirst: jest.fn().mockResolvedValue({
          id: 'spot-1',
          destinationId: 'destination-1',
          spotNumber: 1,
          title: 'Entrance',
          audioUrl: 'https://cdn.example.test/entrance.mp3',
        }),
      },
    };
    const service = new PublicService(prisma as never);

    await expect(service.getAudioSpot('destination-1', 1)).resolves.toEqual(
      expect.objectContaining({
        id: 'spot-1',
        audioUrl: 'https://cdn.example.test/entrance.mp3',
      }),
    );
    expect(prisma.audioSpot.findFirst).toHaveBeenCalledWith({
      where: { destinationId: 'destination-1', spotNumber: 1 },
    });
  });

  it('rejects a missing or unplayable spot', async () => {
    const prisma = {
      audioSpot: {
        findFirst: jest.fn().mockResolvedValue(null),
      },
    };
    const service = new PublicService(prisma as never);

    await expect(service.getAudioSpot('destination-1', 1)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
